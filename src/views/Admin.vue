<template>
	<div class="admin">
		<header>
			<h1>관리자</h1>
			<button class="round small" @click="$router.replace('/')">
				<i class="iconify home" data-icon="mdi-home"></i>
			</button>
		</header>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Store from "@/store";

@Component({})
export default class Admin extends Vue {}
</script>

<style lang="scss" scoped>
.admin {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-self: center;

	max-width: 720px;

	.home {
		font-size: 30px;
	}
}
</style>
