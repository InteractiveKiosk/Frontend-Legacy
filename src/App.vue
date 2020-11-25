<template>
	<div id="app">
		<router-view class="router" />
		<img src="https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/undraw_Payments_re_77x0.svg?alt=media&token=9c846d06-e185-4383-a40c-9f19511cd747" alt="Payments Image" />
		<img src="https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/undraw_shopping_app_flsj.svg?alt=media&token=c42c6b8c-293e-4b78-bc63-256e072cc012" alt="Order Image" />
	</div>
</template>

<style lang="scss">
@import "variables.scss";
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Spoqa Han Sans";
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
// html {
// 	background-color: $background-color;
// 	color: $text-color;
// 	position: fixed;
// 	left: 0;
// 	right: 0;
// 	top: 0;
// 	bottom: 0;

// 	font-size: 24px;
// 	word-break: keep-all;
// 	-webkit-font-smoothing: antialiased;
// 	-moz-osx-font-smoothing: grayscale;
// 	overflow: hidden;
// }
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

	> img {
		display: none;
	}
}
.router {
	height: 100%;
	width: 100%;
	overflow: hidden;
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
		display: block;
		width: ;
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

	margin-top: 30px;
	padding: 10px;

	h1 {
		font-size: 60px;
	}

	button .iconify {
		font-size: 40px;
	}
}

i.iconify {
	font-size: 30px;
}

.container {
	margin-top: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;

	img.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 500px;
		margin: auto;
	}
}

.group {
	display: flex;

	div,
	button {
		margin: 0 10px;
	}
}
</style>
