<template>
	<button class="button" v-on="$listeners">
		<h2 class="button__title">제목</h2>
		<p class="button__content">본문</p>
	</button>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
.button {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: $primary-color;

	.button__title {
		font-size: $normal-size;
		font-weight: bold;
		word-break: keep-all;
	}
	.button__content {
		font-size: $small-up-size;
		word-break: keep-all;
	}
}
</style>
