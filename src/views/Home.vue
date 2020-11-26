<template>
	<div class="page-home">
		<div class="banner">
			<img src="/assets/images/payments.svg" alt="Payments Image" draggable="false" />
			<div class="text">
				<h2 class="title">다양한 사용자를 위한 KIOSK 개선 프로젝트</h2>
				<span class="version">프로토타입</span>
				<span class="subtitle">구현 계획</span>
				<ul>
					<li>주문 안내 음성 및 음성 주문 기능</li>
					<li>UI/UX 개선</li>
					<li>터치 조작 개선</li>
				</ul>
			</div>
		</div>

		<div class="main">
			<template>
				<app-button v-if="!getEarphoneDetection" @click="activateEarphoneDetection" class="sound-active">
					<i data-icon="mdi-headphones" class="iconify" />
					이어폰 감지 활성화
				</app-button>
				<app-button v-else disabled class="sound-activeted">
					<i data-icon="mdi-headphones" class="iconify" />
					이어폰 감지 활성화됨
				</app-button>
			</template>
			<div class="group">
				<app-button>
					<i data-icon="mdi-bell" class="iconify" />
					도움 요청
				</app-button>
				<app-button to="/admin">
					<i data-icon="mdi-key" class="iconify" />
					관리하기
				</app-button>
			</div>
			<app-button to="/order">
				시작하기
			</app-button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $tore from "@/store";

let loop;

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

		setTimeout(() => {
			if (this.getEarphoneDetection) $tore.commit("startHelloLoop");
		}, 1000);
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
.banner {
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	padding: 32px;

	background-color: #f6f6f6;

	img {
		display: block;

		width: calc(50% - 32px);
		max-height: 370px;
		margin-right: 32px;
	}
	.text {
		flex: 0 0 fit-content;

		word-break: keep-all;

		.title {
			font-size: 28px;
			line-height: 1.1em;
		}
		.version {
			display: block;

			margin-bottom: 16px;

			color: rgba(#000, 0.65);
			font-size: 20px;
			line-height: 1.1em;
		}
		.subtitle {
			font-size: 18px;
			font-weight: bold;

			&::before {
				content: "# ";
			}
		}
		ul {
			padding-left: 1em;

			list-style: none;

			li {
				display: flex;
				align-items: center;

				&::before {
					content: "";

					display: block;
					box-sizing: border-box;

					width: 8px;
					height: 8px;
					margin-right: 8px;

					border: 2px solid rgba(#000, 0.65);
					border-radius: 50%;
				}
			}
		}
	}
}
.main {
	display: flex;
	flex-direction: column;
	align-items: stretch;

	width: 480px;
	margin: 0 auto;
	padding: 32px 0;

	> * {
		margin-bottom: 8px;

		&:last-child {
			margin-bottom: 0;
		}
	}
	.app-button {
		font-size: 24px;

		.iconify {
			margin-right: 8px;
		}
	}
	.group {
		display: flex;

		.app-button {
			flex: 0 1 50%;
			margin-right: 8px;
			margin-bottom: 0;

			&:last-child {
				margin-right: 0;
			}
		}
	}
}
</style>
