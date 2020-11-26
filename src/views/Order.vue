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
				<div v-for="(item, idx) in stock">
					<div class="product" @click="toggleFold">
						<img :src="`/assets/products/${item.image}`" :alt="item.name" />
						<div class="product-innergroup">
							<span class="name">{{ item.name }}</span>
							<span class="price">{{ numberFormat(item.price) }}원</span>
						</div>
					</div>
					<div class="product-option exposed">
						<button class="action-decrease" @click="minousItemCount(item)">-</button>
						<p>×{{ shoppingCart[item.name].quantity || 1 }}</p>
						<button class="action-increase" @click="plusItemCount(item)">+</button>

						<button></button>
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

	toggleFold() {}
}
</script>

<style lang="scss" scoped>
.order {
}
</style>
