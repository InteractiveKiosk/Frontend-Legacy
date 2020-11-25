<template>
	<div class="home">
		<h1>환영합니다</h1>
		<img src="https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/undraw_Payments_re_77x0.svg?alt=media&token=9c846d06-e185-4383-a40c-9f19511cd747" alt="Payments Image" />
		<STT></STT>
		<TTS></TTS>
		<button>시작하기</button>
		<small>이어폰을 꽂으면 목소리로 주문할 수 있습니다.</small>
	</div>
</template>

<script lang="ts">
import STT from "@/components/STT.vue";
import TTS from "@/components/TTS.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
	components: { STT, TTS },
})
export default class Home extends Vue {}
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
