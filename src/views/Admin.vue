<template>
	<div class="page-admin">
		<header class="path-list">
			<router-link to="/" class="path">
				<i class="iconify home" data-icon="mdi-home"></i>
			</router-link>
			<span class="path">관리자</span>
		</header>
		<div
			v-for="(item, index) in stock"
			:key="index"
		>
			{{ item }}
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $tore from "@/store";
import { StockItem } from "../schema";

@Component({})
export default class Admin extends Vue {
	stock: StockItem[] = $tore.state.stock;
}
</script>

<style lang="scss" scoped>
.path-list {
	display: flex;
	align-items: center;

	padding: 4px 24px;

	background-color: rgba(#1c1b29, 0.8) !important;

	color: rgba(#fff, 0.65);
	font-size: 16px;

	.path {
		display: flex;
		align-items: center;

		&:not(:first-child)::before {
			content: "＞";

			margin: 0 8px;

			color: rgba(#fff, 0.65);
			font-size: 12px;
		}

		&:hover {
			color: #fff;
		}
	}
}
</style>
