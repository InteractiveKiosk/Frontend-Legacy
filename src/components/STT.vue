<template>
	<div class="stt">
		<audio :src="url" controls></audio>
		<button @click="start">녹음 시작</button>
		<button @click="stop">녹음 종료</button>
		<button @click="trans">텍스트로 변환</button>
		<div>결과 : {{ text }}</div>
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

	text: string = "";

	async created() {
		let stream = await navigator.mediaDevices.getUserMedia({ audio: true });

		this.mediaRecorder = new MediaRecorder(stream);
		this.mediaRecorder.addEventListener("dataavailable", (ev: any) => {
			this.blob = new Blob([ev.data], { type: "application/octet-stream" });
			this.url = URL.createObjectURL(this.blob);
		});
	}

	start() {
		this.mediaRecorder.start();
	}

	stop() {
		this.mediaRecorder.stop();
	}

	async trans() {
		console.log("변환 시작");
		try {
			let result = (
				await axios.post("https://naveropenapi.apigw.ntruss.com/recog/v1/stt", this.blob, {
					params: {
						lang: "Kor",
					},
					headers: {
						"Content-Type": "application/octet-stream",
						"X-NCP-APIGW-API-KEY-ID": "",
						"X-NCP-APIGW-API-KEY": "",
					},
					withCredentials: true,
				})
			).data.text;
			console.log("변환 종료");
			this.text = result;
		} catch (err) {
			console.log(err);
		}
	}
}
</script>
