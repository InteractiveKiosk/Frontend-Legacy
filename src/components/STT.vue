<template>
	<div class="stt">
		<audio :src="url" controls></audio>
		<button @click="start">start</button>
		<button @click="stop">stop</button>
		<button @click="trans1">trans1</button>
		<button @click="trans2">trans2</button>
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

	async trans1() {
		console.log("변환 시작");
		try {
			let result = await axios.post("https://naveropenapi.apigw.ntruss.com/recog/v1/stt", this.blob, {
				params: {
					lang: "Kor",
				},
				headers: {
					"Content-Type": "application/octet-stream",
					"X-NCP-APIGW-API-KEY-ID": "",
					"X-NCP-APIGW-API-KEY": "",
				},
				withCredentials: true,
			});
			console.log("변환 종료");
			console.log(result);
		} catch (err) {
			console.log(err);
		}
	}
	async trans2() {
		console.log("변환 시작");
		let blobToFile = (theBlob: Blob, fileName: string): File => {
			var b: any = theBlob;
			//A Blob() is almost a File() - it's just missing the two properties below which we will add
			b.lastModifiedDate = new Date();
			b.name = fileName;

			//Cast to a File() type
			return <File>theBlob;
		};
		try {
			let result = await axios.post("https://naveropenapi.apigw.ntruss.com/recog/v1/stt", blobToFile(this.blob!, "test"), {
				params: {
					lang: "Kor",
				},
				headers: {
					"Content-Type": "application/octet-stream",
					"X-NCP-APIGW-API-KEY-ID": "",
					"X-NCP-APIGW-API-KEY": "",
				},
				withCredentials: true,
			});
			console.log("변환 종료");
			console.log(result);
		} catch (err) {
			console.log(err);
		}
	}
}
</script>
