<template>
	<div class="order">
		<header class="path-list">
			<router-link to="/" class="path">
				<i class="iconify home" data-icon="mdi-home"></i>
			</router-link>
			<span class="path">주문하기</span>
		</header>
		<div class="product-list">
			<div
				v-for="(item, index) in stock"
				:key="index"
				tabindex="0"
				:class="{
					'product': true,
					'selected': selected === index
				}"
				@click="() => setSelectedProduct(index)"
			>
				<img
					:src="`/assets/products/${item.image}`"
					:alt="item.name"
				>
				<div class="info">
					<span class="name">{{ item.name }}</span>
					<span class="price">{{ numberFormat(item.price) }} 원</span>
				</div>
			</div>
		</div>
		<div
			v-if="selected != null"
			class="product-control"
		>
			<img
				:src="`/assets/products/${stock[selected].image}`"
				:alt="stock[selected].name"
			>
			<div class="control">
				<div class="count">
					<app-button
						class="button-count down"
						:disabled="!(count > 1)"
						@click="() => count > 1 && count--"
					>-</app-button>
					<span v-text="count" class="count-num" />
					<app-button
						class="button-count up"
						:disabled="!(count < stock[selected].quantity)"
						@click="() => count < stock[selected].quantity && count++"
					>+</app-button>
				</div>
				<app-button>장바구니에 추가</app-button>
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
	selected: null | number = null;
	count: number = 1;

	numberFormat(number: number) {
		return numberFormat(number);
	}
	setSelectedProduct(index: null | number) {
		this.selected = index;
		this.count = 1;
	}
}
</script>

<style lang="scss" scoped>
.product-list {
	display: grid;
	justify-content: center;
	gap: 16px;

	grid-template-columns: repeat(auto-fill, 200px);

	padding: 24px;

	.product {
		display: flex;
		flex-direction: column;

		width: 200px;

		border: 1px solid #eee;
		border-radius: 24px;

		overflow: hidden;

		img {
			width: 200px;
			height: 200px;

			border-radius: 0 0 24px 24px;

			object-fit: cover;
		}
		.info {
			display: flex;
			flex-direction: column;

			padding: 16px 24px;

			.name {
				font-size: 20px;
				font-weight: bold;
				line-height: 1em;
			}
			.price {
				color: rgba(#000, 0.6);
			}
		}
	}
}
.product-control {
	position: fixed;
	bottom: 0;
	left: 50%;

	display: flex;

	border: 1px solid #eee;
	border-bottom: 0;
	border-radius: 16px 16px 0 0;

	overflow: hidden;

	transform: translateX(-50%);

	img {
		width: 128px;
		height: 128px;

		border-radius: 0 16px 0 0;

		object-fit: cover;
	}

	.control {
		display: flex;
		flex-direction: column;
		justify-content: center;

		padding: 16px;

		.count {
			display: flex;
			align-items: center;

			margin-bottom: 8px;

			font-size: 20px;

			.app-button {
				width: 48px;
				height: 48px;

				border-radius: 24px;

				font-size: 32px;

				transition: opacity 0.1s;

				&__disabled {
					opacity: 0.5;
				}
			}
			.count-num {
				width: 32px;
				margin: 0 8px;

				text-align: center;
			}
		}
	}
}
</style>
