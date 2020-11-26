<template>
	<div class="home">
		<header>
			<h1>환영합니다</h1>
		</header>
		<div class="container container-center">
			<img class="cover" src="/assets/images/payments.svg" alt="Payments Image" draggable="false" />

			<div v-if="isElectron" class="vgroup">
				<i class="iconify headphones" data-icon="mdi-headphones"></i>
				<button v-if="!getEarphoneDetection" @click="activateEarphoneDetection">이어폰 감지 활성화</button>
				<h2 v-else>이어폰을 꽂으면 목소리로 주문할 수 있습니다.</h2>
			</div>

			<div class="hgroup">
				<button class="small">
					<i class="iconify bell" data-icon="mdi-bell"></i>
					도움 요청
				</button>
				<button class="block" @click="$router.replace('/order')">시작하기</button>
			</div>
		</div>
		<footer>
			<p>Interactive Kiosk</p>
			<button class="secondary round small" @click="$router.replace('/admin')">
				<i class="iconify key" data-icon="mdi-key"></i>
			</button>
		</footer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $tore from "@/store";

@Component({})
export default class Home extends Vue {
	mounted() {
		navigator.mediaDevices.addEventListener("devicechange", event => {
			if (this.getEarphoneDetection)
				try {
					this.$router.replace("/voiceorder");
				} catch (err) {
					console.error(err);
				}
		});
	}

	get isElectron() {
		return $tore.state.isElectron;
	}
	get getEarphoneDetection() {
		return $tore.state.earphoneDetection;
	}
	activateEarphoneDetection() {
		$tore.commit("activateEarphoneDetection");
	}
}
</script>

<style lang="scss" scoped>
.home {
	.bell {
		font-size: 30px;
	}
	.headphones {
		font-size: 70px;
	}
}
</style>
