<template>
	<div class="order">
		<header>
			<h1 class="title">주문하기</h1>
			<button class="round medium" @click="$router.replace('/')">
				<i class="iconify" data-icon="mdi-home"></i>
			</button>
		</header>
		<div class="container">
			<div class="product-container">
				<div class="product">
					<img src="/assets/products/apple.jpg" alt="Apple" />
					<span>Apple</span>
					<button>선택</button>
				</div>
				<div class="product">
					<img src="/assets/products/apple.jpg" alt="Apple" />
					<span>Apple</span>
					<button>선택</button>
				</div>
				<div class="product">
					<img src="/assets/products/apple.jpg" alt="Apple" />
					<span>Apple</span>
					<button>선택</button>
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
}
</script>

<style lang="scss" scoped>
.order {
}
</style>
