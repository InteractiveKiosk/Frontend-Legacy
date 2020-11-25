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
</style>
