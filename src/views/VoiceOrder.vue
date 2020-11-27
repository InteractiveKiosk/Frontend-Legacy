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
			<span>{{ payload }}</span>
			{{ isKeyPressed }}
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $tore from "@/store";
import { ShoppingCart } from "@/schema";

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

	shoppingCart: ShoppingCart[] = []; // 장바구니
	payload: ShoppingCart[] = [];

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

				await this.parseText(text);
			} catch (err) {
				console.error(err);
			}
		});
	}

	mounted() {
		window.addEventListener("keydown", this.activatePTT);
		window.addEventListener("keyup", this.deactivatePTT);

		setTimeout(async () => {
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

			// parseText 끝날때까지 대기

			// 반복
			// this.orderProcess();
		} else {
			// 다음 단계로 넘어감
			return;
		}
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
		let unavailableItems: string[] = []; // 주문 불가한 제품

		try {
			// 모든 상품 리스트 확인
			$tore.state.stock.forEach((item, index) => {
				// 모든 별명 확인
				for (let i = 0; i < item.alias.length; i++) {
					// 수량만 묶어 가져옴
					let match = text.match(new RegExp(`${item.alias[i]}.*?([\\d${koreanNumber_list.join("")}])`));
					// 수량이 감지될 경우 주문으로 넣음
					if (match && match.length > 1) {
						let quantity = 0;
						let matchCount = String(match[1]);

						if (matchCount in koreanNumber) quantity = koreanNumber[matchCount];
						else quantity = Number(matchCount);

						// 수량 확인
						$tore.commit("checkStock", {
							index: index,
							quantity: item.quantity,
							callback: (error: null | string) => {
								if (error) {
									// 재고 부족하여 주문 불가능 목록에 추가
									unavailableItems.push(item.name);
								} else {
									this.shoppingCart.push({
										name: item.name,
										index: index,
										price: item.price,
										quantity: quantity,
									});
								}
							},
						});
						break;
					}
				}
			});

			let shoppingCartItems: string = "";
			this.shoppingCart.forEach(item => {
				shoppingCartItems += `${item.name} ${item.quantity}, `;
			});

			let unavailableNames: string = "";
			if (!unavailableItems.length) unavailableNames = unavailableItems.join(", ");

			await $tore.dispatch("TTS", `장바구니에 추가된 메뉴는 ${shoppingCartItems}${unavailableItems.length ? `이며, 주문이 불가능한 메뉴는 ${unavailableNames}입니다.` : "입니다."}`);
		} catch (err) {
			console.error(err);
		}
	}

	updateStock() {
		// 주문 처리 및 재고 업데이트
		this.payload = [];
		this.shoppingCart.forEach(item => {
			$tore.commit("updateStock", {
				index: item.index,
				quantity: -item.quantity,
				callback: (error: null | string) => {
					if (error) {
						console.log("수량 부족");
					} else {
						this.payload.push(item);
					}
				},
			});
		});
	}
}
</script>

<style lang="scss" scoped>
.voiceorder {
}
</style>
