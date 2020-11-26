<template>
	<div class="tts">
		<button @click="test">tts</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class STT extends Vue {
	async test() {
		try {
			let result = await this.$store.dispatch("TTS", { text: "안녕하세요. 시각장애인이시면 이어폰을 꼽고, 음성 안내에 따라주세요." });
		} catch (err) {
			console.log(err);
		}
	}
}
</script>
