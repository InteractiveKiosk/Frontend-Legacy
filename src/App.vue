<template>
	<div id="app">
		<router-view class="router" />
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

	padding: 10px 20px;

	&.btn-small {
		padding: 10px;
	}

	&:disabled {
		background-color: $disabled-color;
		cursor: not-allowed;
	}

	&.btn-large {
		padding: 10px 20%;
	}

	&.btn-round {
		border-radius: 50%;
		padding: 10px 20px;
	}

	&:hover {
		filter: brightness(1.1);
	}
	&:active {
		filter: brightness(0.9);
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

	&.firebaseui-id-name {
		color: black !important;
	}

	&:disabled {
		background-color: $content-color;
		cursor: not-allowed;
	}
}
</style>
