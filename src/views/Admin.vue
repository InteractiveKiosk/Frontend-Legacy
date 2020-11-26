<template>
	<div class="admin">
		<header>
			<h1>관리자</h1>
			<button class="round small" @click="$router.replace('/')">
				<i class="iconify home" data-icon="mdi-home"></i>
			</button>
		</header>
		<div class="container container-top">
			재고 목록
			{{ stock }}
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
.admin {
	.home {
		font-size: 30px;
	}
}
</style>
