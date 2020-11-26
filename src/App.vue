<template>
	<div id="app" :class="{ electron: $store.state.isElectron }">
		<transition name="fade" mode="out-in">
			<div id="layout">
				<header class="layout-header">
					<app-button to="/" class="title">
						<i data-icon="mdi-bell" class="iconify" />
						Interactive Kiosk
					</app-button>
				</header>
				<router-view id="main" />
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
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

	background: #FFF;

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

		color: #FFF;

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
	}
}
</style>
