<template>
	<div class="stt">
		<audio :src="url" controls></audio>
		<button @click="start">start</button>
		<button @click="stop">stop</button>
		<button @click="trans">trans</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

// import "@types/dom-mediacapture-record";

declare class MediaRecorder {
	constructor(stream: any);
	start(): void;
	stop(): void;
	addEventListener(str: string, callback: any): void;
}

@Component
export default class STT extends Vue {
	url: string = "";
	blob: Blob | null = null;
	mediaRecorder!: MediaRecorder;

	async created() {
		let stream = await navigator.mediaDevices.getUserMedia({ audio: true });

		this.mediaRecorder = new MediaRecorder(stream);
		this.mediaRecorder.addEventListener("dataavailable", (ev: any) => {
			this.blob = new Blob([ev.data], { type: "audio/mp3" });
			this.url = URL.createObjectURL(this.blob);
		});
	}

	start() {
		this.mediaRecorder.start();
	}

	stop() {
		this.mediaRecorder.stop();
	}

	trans() {
		// axios.post("https://naveropenapi.apigw.ntruss.com/recog/v1/stt",)
	}
}
</script>
