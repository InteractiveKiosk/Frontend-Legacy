<template>
	<div class="order">
		<h1>주문하기</h1>
		<button class="btn-round" @click="$router.replace('/')">
			<svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
				<path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
			</svg>
		</button>
		<img src="https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/undraw_shopping_app_flsj.svg?alt=media&token=c42c6b8c-293e-4b78-bc63-256e072cc012" alt="Order Image" />

		<audio :src="url" controls></audio>
		<span>전체 가격: {{ itemCollection }}</span>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $tore from "@/store";

const HANGUL_NUMBER = {
	한: 1,
	둘: 2,
	두: 2,
	셋: 3,
	세: 3,
	넷: 4,
	네: 4,
	다섯: 5,
	여섯: 6,
	일곱: 7,
	여덟: 8,
	아홉: 9,
};
const HANGUL_NUMBER_LIST = ["한", "둘", "두", "셋", "세", "넷", "네", "다섯", "여섯", "일곱", "여덟", "아홉"];

@Component({})
export default class Home extends Vue {
	isKeyPressed: boolean = false;
	url: string = "";
	blob: Blob | null = null;
	mediaRecorder!: MediaRecorder;

	itemCollection: {
		name: string;
		index: number;
		price: number;
		amount: number;
	}[] = [];

	async created() {
		let stream = await navigator.mediaDevices.getUserMedia({ audio: true });

		this.mediaRecorder = new MediaRecorder(stream);
		this.mediaRecorder.addEventListener("dataavailable", async (ev: any) => {
			this.blob = new Blob([ev.data], { type: "application/octet-stream" });
			this.url = URL.createObjectURL(this.blob);
			try {
				await this.execute();
			} catch (err) {
				console.error(err);
			}
		});
	}

	mounted() {
		window.addEventListener("keydown", this.keyDown);
		window.addEventListener("keyup", this.keyUp);
	}

	keyDown(event: KeyboardEvent) {
		if (event.code !== "Space" || this.isKeyPressed) return;
		console.log(true);
		this.isKeyPressed = true;
		let activate = new Audio("https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/ptt_activate.mp3?alt=media&token=281d146e-ccee-4917-b4f4-ac9afa15cf7c");
		activate.play();
		// 녹음 시작
		this.mediaRecorder.start();
	}

	keyUp(event: KeyboardEvent) {
		if (event.code !== "Space" || !this.isKeyPressed) return;
		console.log(false);
		this.isKeyPressed = false;
		let deactivate = new Audio("https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/ptt_deactivate.mp3?alt=media&token=a82a892e-208a-45ab-b04d-72cb3fbb1cc9");
		deactivate.play();
		// 녹음 종료
		setTimeout(() => this.mediaRecorder.stop(), 300);
	}

	async execute() {
		try {
			let text = await $tore.dispatch("STT", this.blob);
			console.info(`변환 완료 : ${text}`);

			let order: {
				name: string;
				index: number;
				price: number;
				amount: number;
			}[] = []; // 주문 모으기

			// 모든 상품 리스트 확인
			$tore.state.stock.forEach((item, index) => {
				// 모든 별명 확인
				for (let i = 0; i < item.alias.length; i++) {
					// 수량만 묶어 가져옴
					let match = text.match(new RegExp(`${item.alias[i]}.*?([\\d${HANGUL_NUMBER_LIST.join("")}])`));

					// 수량이 감지될 경우 주문으로 넣음
					if (match && match.length > 1) {
						let count = 0;
						console.log(match);
						let matchCount = String(match[1]);
						if (
							matchCount === "한" ||
							matchCount === "둘" ||
							matchCount === "두" ||
							matchCount === "셋" ||
							matchCount === "세" ||
							matchCount === "넷" ||
							matchCount === "네" ||
							matchCount === "다섯" ||
							matchCount === "여섯" ||
							matchCount === "일곱" ||
							matchCount === "여덟" ||
							matchCount === "아홉"
						) {
							count = HANGUL_NUMBER[matchCount];
						} else count = Number(matchCount);
						order.push({
							name: item.name,
							index: index,
							price: item.price,
							amount: count,
						});
						break;
					}
				}
			}); // 모든 주문 반영

			this.itemCollection = [];
			order.forEach(pay => {
				$tore.commit("updateStockQuantity", {
					index: pay.index,
					amount: -pay.amount,
					callback: (error: null | string) => {
						if (error) {
							console.log("수량 부족");
						} else {
							this.itemCollection.push(pay);
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
.order {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-self: center;

	max-width: 720px;

	img {
		width: 300px;
	}
}
</style>
