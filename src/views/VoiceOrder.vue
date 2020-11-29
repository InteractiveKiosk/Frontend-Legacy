<template>
	<div class="voiceorder">
		<header>
			<h1 class="title">음성으로 주문하기</h1>
			<button class="round medium" @click="$router.replace('/')">
				<i class="iconify" data-icon="mdi-home"></i>
			</button>
		</header>
		<div class="container">
			<img class="cover" src="/assets/images/shopping_app.svg" alt="Shopping Image" draggable="false" />

			<!-- <audio :src="url" controls></audio> -->
			shoppingCart: {{ shoppingCart }}<br />
			isKeyPressed(PTT 활성화) : {{ isKeyPressed }}<br />
			isSpeakable(말할 수 있음) : {{ isSpeakable }}
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $tore from "@/store";
import { ShoppingCart, StockItem } from "@/schema";

const koreanNumber = require("@/lib/koreanNumber.json");
let koreanNumber_list: string[] = [];
for (const [key, value] of Object.entries(koreanNumber)) koreanNumber_list.push(key);

@Component({})
export default class VoiceOrder extends Vue {
	isKeyPressed: boolean = false;
	isOrderCycle: boolean = true;
	isSpeakable: boolean = false;
	// url: string = "";
	blob: Blob | null = null;
	mediaRecorder!: MediaRecorder;

	shoppingCart: StockItem[] = []; // 장바구니
	payload: StockItem[] = [];

	text: string = "";

	callback: Function = (text: string) => {};

	async created() {
		let stream = await navigator.mediaDevices.getUserMedia({ audio: true });

		this.mediaRecorder = new MediaRecorder(stream);
		this.mediaRecorder.addEventListener("dataavailable", async (ev: any) => {
			this.blob = new Blob([ev.data], { type: "application/octet-stream" });
			// this.url = URL.createObjectURL(this.blob);
			try {
				// 변환
				let text = await $tore.dispatch("STT", this.blob);
				console.info(`변환 완료 : ${text}`);

				this.text = text;
				await this.callback(text);
			} catch (err) {
				console.error(err);
			}
		});
	}

	mounted() {
		window.addEventListener("keydown", this.activatePTT);
		window.addEventListener("keyup", this.deactivatePTT);

		setTimeout(async () => {
			this.isSpeakable = true; // FIXME: 디버그
			this.callback = async (text: string) => {
				if (text.indexOf("완료") != -1) this.isOrderCycle = false;
				else {
					try {
						await this.parseText(text);
					} catch (err) {}
				}
				// 반복
				this.orderProcess();
			};

			await $tore.dispatch("PLAYAUDIO", "voiceorder/earphone_connected");
			await $tore.dispatch("PLAYITEMS");
			this.orderProcess();
		}, 1000);
	}

	activatePTT(event: KeyboardEvent) {
		if (event.code !== "Space" || this.isKeyPressed || !this.isSpeakable) return;
		this.isKeyPressed = true;
		this.isSpeakable = false;
		$tore.commit("playAudio", "voiceorder/ptt_activate");
		// 녹음 시작
		this.mediaRecorder.start();
	}

	deactivatePTT(event: KeyboardEvent) {
		if (event.code !== "Space" || !this.isKeyPressed) return;
		this.isKeyPressed = false;
		$tore.commit("playAudio", "voiceorder/ptt_deactivate");
		// 녹음 종료
		setTimeout(() => this.mediaRecorder.stop(), 300);
	}

	async orderProcess() {
		if (this.isOrderCycle === true) {
			// 장바구니 개수 0개이면 초기 음성 출력
			if (!this.shoppingCart.length) await $tore.dispatch("PLAYAUDIO", "voiceorder/ask");
			else await $tore.dispatch("PLAYAUDIO", "voiceorder/ask_another");
			// 말하기 허용
			this.isSpeakable = true;
		} else {
			// todo : 다음 단계로 넘어감 checkout_complete
			console.log("완료");
			await $tore.dispatch("PLAYAUDIO", "voiceorder/checkout_complete");
			return;
		}
		// todo : 주문 단계

		// 	this.step++;
		// 	switch (this.step) {
		// 		case 0:
		// 			this.isOrderCycle();
		// 			break;
		// 		case 1:
		// 			this.isOrderCycle();
		// 			break;
		// 		case 2:
		// 			break;
		// 		case 3:
		// 			break;
		// 		default:
		// 	}
	}

	async parseText(text: string) {
		let tmpShoppingCart: StockItem[] = []; // 현 주문 상품
		let unavailableItems: string[] = []; // 주문 불가한 제품

		try {
			// todo

			// 모든 상품 리스트 확인
			// 모든 별명 확인
			// 수량만 묶어 가져옴
			let reg = new RegExp(
				`(${$tore.state.stock
					.map((item) => item.alias)
					.flat()
					.join("|")}).*?(?:([1-9]+[0-9]*)|(열|스물|서른|마흔|쉰|예순|일흔|여든|아흔)(하나|둘|셋|다섯|여섯|일곱|여덟|아홉)?|(스무)|(한|하나|두|둘|세|셋|네|넷|다섯|여섯|일곱|여덟|아홉))`
			);
			// FIXME: 여러개 상품 지워
			let match = text
				.trim()
				.match(reg)
				?.filter(i => i);
			console.log("TEXT", text, match);

			if (!match?.length) throw "그런메뉴 없습니다.";
			let menuAlias = String(match![1]);

			console.log("menuAlias:", menuAlias);

			// 인덱스 가져오기
			let index = $tore.state.stock.findIndex((item) => item.alias.indexOf(menuAlias) != -1);
			if (index == -1) throw "그런메뉴 없습니다.";
			let item = $tore.state.stock[index];

			console.log("item:", item);

			// 갯수 가져오기
			let quantity = 0;
			let matchCount = String(match[2]);
			if (matchCount in koreanNumber) quantity = koreanNumber[matchCount];
			else quantity = Number(matchCount || 0);

			console.log("quantity: " + quantity);

			// 수량에 에러가있거나, 갯수가 부족할 시
			if (item.quantity - quantity < 0 || !quantity) unavailableItems.push(item.name);
			else {
				let prevItem = tmpShoppingCart.find((i) => i.name == item.name);
				if (!prevItem) tmpShoppingCart.push({ ...item, quantity });
				else {
					prevItem.quantity += quantity;
				}
			}

			this.shoppingCart = this.shoppingCart.concat(tmpShoppingCart);

			let clearStr = `장바구니에 추가된 메뉴는 ${tmpShoppingCart.map((item) => item.name).join(",") || "없"}${
				unavailableItems.length ? `이며, 주문이 불가능한 메뉴는 ${unavailableItems.join(",")}입니다.` : "입니다."
			}`;
			console.log(clearStr);
			await $tore.dispatch("TTS", clearStr);
		} catch (err) {
			await $tore.dispatch("PLAYAUDIO", "voiceorder/error");
			console.error(err);
		}
	}

	updateStock() {
		// 주문 처리 및 재고 업데이트
		this.payload = [];
		// this.shoppingCart.forEach((item) => {
		// 	$tore.commit("updateStock", {
		// 		index: item.index,
		// 		quantity: -item.quantity,
		// 		callback: (error: null | string) => {
		// 			if (error) {
		// 				console.log("수량 부족");
		// 			} else {
		// 				this.payload.push(item);
		// 			}
		// 		},
		// 	});
		// });
	}
}
</script>

<style lang="scss" scoped>
img {
	display: block;

	width: calc(50% - 32px);
	max-height: 370px;
	margin-right: 32px;
}
</style>
