<template>
	<div class="order">
		<header>
			<h1 class="title">주문하기</h1>
			<button class="round small" @click="$router.replace('/')">
				<i class="iconify" data-icon="mdi-home"></i>
			</button>
		</header>
		<div class="container container-top">
			<div class="product-container">
				<div v-for="(item, idx) in stock">
					<div class="product" @click="toggleVisibility">
						<img :src="`/assets/products/${item.image}`" :alt="item.name" />
						<div class="product-innergroup">
							<span class="name">{{ item.name }}</span>
							<span class="price">{{ numberFormat(item.price) }}원</span>
						</div>
					</div>
					<div class="product-option exposed">
						<button class="action-decrease round" @click="decreaseItemQuantity(item)">&minus;</button>
						<!-- <p>&times;{{ shoppingCart[item.name].quantity || 1 }}</p> -->
						<button class="action-increase round" @click="increaseItemQuantity(item)">&plus;</button>

						<button>장바구니에 추가</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $tore from "@/store";
import { StockItem, ShoppingCart } from "@/schema";
import numberFormat from "@/utils/numberFormat";

@Component({})
export default class Order extends Vue {
	stock: StockItem[] = $tore.state.stock;
	shoppingCart: ShoppingCart[] = [];

	numberFormat(number: number) {
		return numberFormat(number);
	}
	toggleVisibility() {}
}
</script>

<style lang="scss" scoped>
.order {
}
</style>
