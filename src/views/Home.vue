<template>
	<div class="home">
		<STT></STT>
	</div>
</template>

<script lang="ts">
import STT from "@/components/STT.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
	components: { STT },
})
export default class Home extends Vue {}
</script>
