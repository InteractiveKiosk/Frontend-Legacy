<template>
	<div class="home">
		<h1>환영합니다</h1>
		<img src="https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/undraw_Payments_re_77x0.svg?alt=media&token=9c846d06-e185-4383-a40c-9f19511cd747" alt="Payments Image" />
		<STT @trans="onTransSTT" />
		<TTS />
		<button>시작하기</button>
		<small>이어폰을 꽂으면 목소리로 주문할 수 있습니다.</small>
		<div class="result">
			<span>전체 가격: {{ total }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Store from "@/store";
import STT from "@/components/STT.vue";
import TTS from "@/components/TTS.vue";
import { TouchBarButton } from 'electron';

const HANGUL_NUMBER = {
	"한": 1,
	"둘": 2,
	"두": 2,
	"셋": 3,
	"세": 3,
	"넷": 4,
	"네": 4,
	"다섯": 5,
	"여섯": 6,
	"일곱": 7,
	"여덟": 8,
	"아홉": 9
};
const HANGUL_NUMBER_LIST = [
	"한", "둘", "두", "셋", "세", "넷", "네", "다섯", "여섯", "일곱", "여덟", "아홉"
];

@Component({
	components: { STT, TTS },
})
export default class Home extends Vue {
	total: {
		name: string,
		index: number;
		price: number;
		amount: number;
	}[] = [];

	onTransSTT(result: string) {
		let order: {
			name: string,
			index: number;
			price: number;
			amount: number;
		}[] = []; // 주문 모으기

		// 모든 상품 리스트 확인
		Store.state.stock.forEach((item, index) => {
			// 모든 별명 확인
			for (let i = 0; i < item.alias.length; i++) {
				// 수량만 묶어 가져옴
				let match = result.match(
					new RegExp(
						`${item.alias[i]}.*?([\\d${HANGUL_NUMBER_LIST.join("")}])`
					)
				);

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
						amount: count
					});
					break;
				}
			}
		});

		// 모든 주문 반영
		this.total = [];
		order.forEach(pay => {
			Store.commit("updateStockQuantity", {
				index: pay.index,
				amount: pay.amount,
				callback: (error: null | string) => {
					if (error) {
						console.log("수량 부족");
					} else {
						this.total.push(pay);
					}
				}
			});
		});
	}
}
</script>

<style lang="scss" scoped>
.home {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-self: center;

	max-width: 720px;

	color: $disabled-color;

	img {
		width: 300px;
	}
}
</style>
