<template>
	<div id="app" :class="{ electron: $store.state.isElectron }">
		<transition name="fade" mode="out-in">
			<div id="layout">
				<header class="layout-header">
					<app-button to="/" class="title">
						<i data-icon="mdi-account-voice" class="iconify" />
						Interactive Kiosk
					</app-button>
				</header>
				<router-view id="main" />
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import $tore from "@/store";

@Component({})
export default class App extends Vue {
	@Watch("$route", { immediate: true, deep: true })
	onRouteChange(newVal: any) {
		$tore.commit("stopAudio");
	}
}
</script>

<style lang="scss">
@import "/assets/styles/variables";
@import "/assets/styles/font";

.fade-enter-active,
.fade-leave-active {
	transition-duration: 0.2s;
	transition-property: opacity;
	transition-timing-function: ease-in-out;
}
.fade-enter,
.fade-leave-active {
	opacity: 0;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Noto Sans KR", sans-serif;

	user-select: none;

	color: inherit;
	text-decoration: none;
}
::-webkit-scrollbar {
	display: none;
}

html {
	height: 100%;

	background: #fff;

	color: rgba(#000, 0.85);
	font-family: "Noto Sans KR", sans-serif;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	body {
		height: 100%;
	}
}
#app {
	height: 100%;

	#layout {
		height: 100%;

		#main {
			height: 100%;
		}
	}
}

#layout {
	display: flex;
	flex-direction: column;

	.layout-header {
		display: flex;
		justify-content: center;
		align-items: center;

		flex: 0 0 64px;

		background-color: #1c1b29;

		color: #fff;

		.iconify {
			margin-right: 8px;
		}
		.title {
			flex: 1 1;
			background-color: transparent;

			font-size: 32px;
			font-weight: bold;
			text-align: center;
		}
	}
	#main {
		flex: 1 1;

		overflow: hidden auto;

		.path-list {
			display: flex;
			align-items: center;

			padding: 4px 24px;

			background-color: rgba(#1c1b29, 0.8) !important;

			color: rgba(#fff, 0.65);
			font-size: 16px;

			.path {
				display: flex;
				align-items: center;

				&:not(:first-child)::before {
					content: "＞";

					margin: 0 8px;

					color: rgba(#fff, 0.65);
					font-size: 12px;
				}

				&:hover {
					color: #fff;
				}
			}
		}
	}
}
</style>
