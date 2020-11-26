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
				</div>
			</div>
			<div class="product-preview">
				<button class="action-decrease round" @click="decreaseItemQuantity(item)">&minus;</button>
				<!-- <p>&times;{{ shoppingCart[item.name].quantity || 1 }}</p> -->
				<button class="action-increase round" @click="increaseItemQuantity(item)">&plus;</button>

				<button>장바구니에 추가</button>
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
.product-container {
	width: 100%;
	.product {
		border-left: 5px solid #00000000;

		&:hover {
			border-left: 5px solid $primary-color;
		}

		&:nth-child(odd) {
			background-color: $background-color;
		}
		&:nth-child(even) {
			background-color: $secondary-color;
		}

		.product-group {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;

			padding: 15px 20px;

			cursor: pointer;

			img {
				width: 60px;
				height: 60px;
				margin-right: 10px;
				border-radius: 50px;
			}
		}
		.product-innergroup {
			display: flex;
			flex-direction: column;
			font-weight: 500;

			span.name {
				font-size: 20px;
			}

			span.price {
				font-size: 22px;
			}
		}
	}

	.product-preview-container {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		top: auto;
		bottom: 0;

		width: 100%;
		max-width: 720px;

		.product-preview {
			display: flex;
			justify-content: space-around;
			align-items: center;

			max-width: 600px;

			border-radius: 20px;

			background-color: $content-color;
		}
	}
}

footer {
	display: flex;
	justify-content: space-between;
	align-items: center;

	position: absolute;
	top: auto;
	bottom: 0;

	width: 100%;
	max-width: 720px;

	padding: 20px;
}

.electron {
	header {
		margin-top: 30px;
		h1 {
			font-size: 50px;
		}
		button .iconify {
			font-size: 40px;
		}
	}
	img.cover {
		width: 300px;
	}

	.container {
		&.container-top {
			margin-top: 160px;
		}
	}

	.product-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;

		.product {
			width: 30%;

			margin: 10px;

			background-color: $background-color;

			border: none;
			border-radius: 20px;
			box-shadow: 3px 3px 20px rgba($color: #000000, $alpha: 0.1);

			.product-group {
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.product-innergroup {
					align-items: center;
				}
			}
		}
	}
}
</style>
