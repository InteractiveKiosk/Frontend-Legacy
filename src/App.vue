<template>
	<div id="app" :class="{ electron: $store.state.isElectron }">
		<transition name="fade" mode="out-in">
			<router-view class="router" />
		</transition>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $tore from "@/store";

@Component({})
export default class App extends Vue {
	mounted() {
		// window.addEventListener("mousedown", this.mouseDown);
		// window.addEventListener("mouseup", this.mouseUp);

		// todo
		$tore.commit("setTmpStock");
	}

	// mouseDown(event: MouseEvent) {}
	// mouseUp() {}
}
</script>

<style lang="scss">
@import "variables.scss";
@font-face {
	font-family: "Noto Sans KR";
	src: url("/assets/fonts/NotoSansKR-Thin.otf") format("opentype");
	font-weight: 100;
	font-display: swap;
}
@font-face {
	font-family: "Noto Sans KR";
	src: url("/assets/fonts/NotoSansKR-Light.otf") format("opentype");
	font-weight: 300;
	font-display: swap;
}
@font-face {
	font-family: "Noto Sans KR";
	src: url("/assets/fonts/NotoSansKR-Regular.otf") format("opentype");
	font-weight: 400;
	font-display: swap;
}
@font-face {
	font-family: "Noto Sans KR";
	src: url("/assets/fonts/NotoSansKR-Medium.otf") format("opentype");
	font-weight: 500;
	font-display: swap;
}
@font-face {
	font-family: "Noto Sans KR";
	src: url("/assets/fonts/NotoSansKR-Bold.otf") format("opentype");
	font-weight: 700;
	font-display: swap;
}
@font-face {
	font-family: "Noto Sans KR";
	src: url("/assets/fonts/NotoSansKR-Black.otf") format("opentype");
	font-weight: 900;
	font-display: swap;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Noto Sans KR", sans-serif;
}
*::selection {
	background-color: $select-color;
}
*:link,
*:visited {
	text-decoration: none;
	color: $text-color;
}
::-webkit-scrollbar {
	width: 5px;
	height: 5px;
	display: none;
}
html {
	background-color: $background-color;
	color: $text-color;
	// position: fixed;
	// left: 0;
	// right: 0;
	// top: 0;
	// bottom: 0;

	word-break: keep-all;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	overflow: hidden;
}
// body {
// 	width: 100%;
// 	height: 100%;
// 	overflow-x: hidden;
// 	overflow-y: auto;
// }
#app {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
}
.router {
	width: 100%;
	height: 100%;

	max-width: 720px;

	overflow: hidden;
}

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

button {
	cursor: pointer;
	-webkit-tap-highlight-color: rgba(128, 128, 128, 0.1);

	background-color: $primary-color;
	color: $text-color;

	border-radius: 12px;
	border: none;
	outline: none;

	font-size: 24px;

	padding: 10px 20px;

	box-shadow: 3px 3px 5px rgba($color: #000000, $alpha: 0.4);

	&.secondary {
		background-color: $secondary-color;
	}

	&.small {
		padding: 2px 5px;
	}

	&.large {
		padding: 20px;
	}

	&.block {
		padding: 8px 100px;
	}

	&.round {
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-self: center;
		padding: 15px;

		&.small {
			padding: 10px;
		}

		&.large {
			padding: 20px;
		}
	}
	&:hover {
		filter: brightness(1.1);
	}
	&:active {
		filter: brightness(0.9);
	}
	&:disabled {
		background-color: $disabled-color;
		cursor: not-allowed;
		&:hover {
			filter: brightness(1);
		}
	}
}

ul {
	list-style: none;
}
input[type="text"] {
	padding: 5px;
	width: 100%;

	background: none;
	border: none;
	border-radius: 0;
	outline: none;

	border-bottom: 1px solid $text-color;
	color: $text-color;

	&:disabled {
		background-color: $content-color;
		cursor: not-allowed;
	}
}

header {
	display: flex;
	justify-content: space-between;

	padding: 20px;

	h1 {
		font-size: 40px;
	}

	button .iconify {
		font-size: 30px;
	}
}

i.iconify {
	font-size: 30px;
}

.container {
	display: flex;
	flex-direction: column;
	align-items: center;

	img.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 250px;
		margin: 0 auto 80px auto;
	}
}

.vgroup {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	margin: 60px 0;
}

.hgroup {
	display: flex;

	div,
	button {
		margin: 0 10px;
	}
}

.product-container {
	width: 100%;

	.product {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		padding: 15px 20px;

		border-left: 5px solid #00000000;

		cursor: pointer;

		&:nth-child(odd) {
			background-color: $background-color;
		}
		&:nth-child(even) {
			background-color: $secondary-color;
		}

		&:hover {
			border-left: 5px solid $primary-color;
		}

		img {
			width: 50px;
			margin-right: 10px;
			border-radius: 50px;
		}

		.product-innergroup {
			display: flex;
			flex-direction: column;
			font-weight: 500;

			span.name {
				font-size: 20px;
			}

			span.price {
				font-size: 22px;
			}
		}
	}
}

.electron {
	header {
		margin-top: 30px;
		h1 {
			font-size: 50px;
		}
		button .iconify {
			font-size: 40px;
		}
	}
	img.cover {
		width: 300px;
	}
	.container {
		margin-top: 40px;

		.product-container {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;

			.product {
				flex-direction: column;
				justify-content: center;
				align-items: center;

				margin: 10px;
				width: 30%;

				background-color: $background-color;

				border: none;
				border-radius: 20px;
				box-shadow: 3px 3px 20px rgba($color: #000000, $alpha: 0.1);

				.product-innergroup {
					align-items: center;
				}
			}
		}
	}
}
</style>
