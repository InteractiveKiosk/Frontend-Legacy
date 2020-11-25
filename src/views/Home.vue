<template>
	<div class="home">
		<header>
			<h1>환영합니다</h1>
		</header>
		<div class="container">
			<img
				class="cover"
				src="https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/undraw_Payments_re_77x0.svg?alt=media&token=9c846d06-e185-4383-a40c-9f19511cd747"
				alt="Payments Image"
			/>

			<i class="iconify headphones" data-icon="mdi-headphones"></i>
			<h2>이어폰을 꽂으면 목소리로 주문할 수 있습니다.</h2>

			<div class="group">
				<button class="small">
					<i class="iconify bell" data-icon="mdi-bell"></i>
					도움 요청
				</button>
				<button class="block" @click="$router.replace('/order')">시작하기</button>
			</div>
		</div>
		<footer>
			<button class="secondary round small" @click="$router.replace('/admin')">
				<i class="iconify key" data-icon="mdi-key"></i>
			</button>
		</footer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
	mounted() {
		navigator.mediaDevices.addEventListener("devicechange", event => {
			try {
				this.$router.replace("/order");
			} catch (err) {
				console.error(err);
			}
		});
	}
}
</script>

<style lang="scss" scoped>
.home {
	display: flex;
	flex-direction: column;
	// justify-content: center;
	// align-self: center;

	max-width: 720px;

	.bell {
		font-size: 30px;
	}
	.headphones {
		font-size: 70px;
	}
}
</style>
