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
			let result = await this.$store.dispatch("TTS", { text: "안녕하세요. 음성합성 테스트입니다." });
		} catch (err) {
			console.log(err);
		}
	}
}
</script>
