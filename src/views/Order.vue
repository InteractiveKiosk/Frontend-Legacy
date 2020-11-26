<template>
	<div class="order">
		<header>
			<h1 class="title">주문하기</h1>
			<button class="round medium" @click="$router.replace('/')">
				<i class="iconify" data-icon="mdi-home"></i>
			</button>
		</header>
		<div class="container"></div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Order extends Vue {
	itemCollection: {
		name: string;
		index: number;
		price: number;
		quantity: number;
	}[] = [];
}
</script>

<style lang="scss" scoped>
.order {
	display: flex;
	flex-direction: column;
	// justify-content: center;
	// align-self: center;

	max-width: 720px;
}
</style>
