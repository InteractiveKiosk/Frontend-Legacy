<template>
	<div class="order">
		<header>
			<h1 class="title">주문하기</h1>
			<button class="round small" @click="$router.replace('/')">
				<i class="iconify" data-icon="mdi-home"></i>
			</button>
		</header>
		<div class="container">
			<div class="product-container">
				<div v-for="i in 10" class="product">
					<img src="/assets/products/apple.jpg" alt="Apple" />
					<div class="product-innergroup">
						<span class="name">Apple</span>
						<span class="price">10,000원</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $tore from "@/store";
import { StockItem } from "@/schema";

@Component({})
export default class Order extends Vue {
	stock: StockItem[] = $tore.state.stock;

	get isElectron() {
		return $tore.state.isElectron;
	}
}
</script>

<style lang="scss" scoped>
.order {
}
</style>
