<template>
	<div class="home">
		<h1>환영합니다</h1>
		<img src="https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/undraw_Payments_re_77x0.svg?alt=media&token=9c846d06-e185-4383-a40c-9f19511cd747" alt="Payments Image" />
		<STT @trans="onTransSTT" />
		<TTS />
		<button @click="$router.replace('/order')">시작하기</button>
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
// import { TouchBarButton } from "electron";

@Component({
	components: { STT, TTS },
})
export default class Home extends Vue {
	total: {
		name: string;
		index: number;
		price: number;
		amount: number;
	}[] = [];

	mounted() {
		navigator.mediaDevices.addEventListener("devicechange", event => {
			this.$router.replace("/order");
		});
	}

	onTransSTT(result: string) {}
}
</script>

<style lang="scss" scoped>
.home {
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
