<template>
	<div class="order" @keyup.space="keyUp()" @keydown.space="keyDown()">
		<h1>주문하기</h1>
		<button class="btn-round" @click="$router.replace('/')">
			<svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
				<path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
			</svg>
		</button>
		<img src="https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/undraw_shopping_app_flsj.svg?alt=media&token=c42c6b8c-293e-4b78-bc63-256e072cc012" alt="Order Image" />
		이 기능은 현재 개발중입니다.
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
	created() {}

	keyDown() {
		let activate = new Audio("https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/ptt_activate.mp3?alt=media&token=281d146e-ccee-4917-b4f4-ac9afa15cf7c");
		activate.play();
	}

	keyUp() {
		let deactivate = new Audio("https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/ptt_deactivate.mp3?alt=media&token=a82a892e-208a-45ab-b04d-72cb3fbb1cc9");
		deactivate.play();
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
