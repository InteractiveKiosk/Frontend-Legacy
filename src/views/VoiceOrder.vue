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

	shoppingCart: ShoppingCart[] = []; // 주문 모으기
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
			await $tore.dispatch("PLAYAUDIO", { isLocal: true, data: "voiceorder/earphone_connected" });
			this.orderProcess();
		}, 2000);

		// todo
		// this.parseText("사과 한개 복숭아 네개");
	}

	activatePTT(event: KeyboardEvent) {
		if (event.code !== "Space" || this.isKeyPressed || !this.isSpeakable) return;
		this.isKeyPressed = true;
		this.isSpeakable = false;
		$tore.commit("playSound", "ptt_activate");
		// 녹음 시작
		// this.mediaRecorder.start();
	}

	deactivatePTT(event: KeyboardEvent) {
		if (event.code !== "Space" || !this.isKeyPressed) return;
		this.isKeyPressed = false;
		$tore.commit("playSound", "ptt_deactivate");
		// 녹음 종료
		// setTimeout(() => this.mediaRecorder.stop(), 300);
	}

	async orderProcess() {
		if (this.isOrderCycle === true) {
			// 장바구니 개수 0개이면 초기 음성 출력
			if (!this.shoppingCart.length) await $tore.dispatch("PLAYAUDIO", { isLocal: true, data: "voiceorder/ask" });
			else await $tore.dispatch("PLAYAUDIO", { isLocal: true, data: "voiceorder/ask_another" });

			// 말하기 허용
			this.isSpeakable = true;

			// 반복
			this.orderProcess();
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

						$tore.dispatch("TTS", `${item.name} ${quantity}개를 추가했습니다.`);

						this.shoppingCart.push({
							name: item.name,
							index: index,
							price: item.price,
							quantity: quantity,
						});
						break;
					}
				}
			});

			// 주문 처리
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
		} catch (err) {
			console.error(err);
		}
	}
}
</script>

<style lang="scss" scoped>
.voiceorder {
}
</style>
