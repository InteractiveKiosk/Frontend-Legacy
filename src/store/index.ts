import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";
import CryptoJS from "crypto-js";

import { StockItem } from "@/schema";

let audio: HTMLAudioElement;
const playAudio = async (isLocal: boolean, data: string) => {
	if (audio) audio.pause();

	let url: string = isLocal ? `/assets/sound/${data}.mp3` : data;
	audio = new Audio(url);

	audio.play();

	return new Promise<void>(resolve => {
		audio.addEventListener("ended", () => {
			URL.revokeObjectURL(url);
			setTimeout(() => resolve(), 400);
		});
	});
};
const stopAudio = () => {
	if (audio) audio.pause();
	stopHelloLoop();
};

let helloLoop: number;
const startHelloLoop = () => (helloLoop = window.setInterval(() => playAudio(true, "home/hello"), 21000));
const stopHelloLoop = () => clearInterval(helloLoop);

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		stock: [
			//todo : category
			{
				name: "사과",
				alias: ["사과", "사가"],
				price: 1000,
				quantity: 10,
				image: "apple.jpg",
			},
			{
				name: "라면",
				alias: ["라면", "라멘", "나면"],
				price: 500,
				quantity: 10,
				image: "ramen.jpg",
			},
			{
				name: "파스타",
				alias: ["파스타", "스파게티", "스파게리", "수파게티", "파수타"],
				price: 10000,
				quantity: 10,
				image: "pasta.jpg",
			},
			{
				name: "복숭아",
				alias: ["복숭아", "봉숭아", "보숭아", "보숭이", "복숭", "보숭"],
				price: 2000,
				quantity: 10,
				image: "peach.jpg",
			},
			{
				name: "우유",
				alias: ["우유", "우우", "유유", "으유"],
				price: 3500,
				quantity: 10,
				image: "milk.jpg",
			},
		] as StockItem[],
		earphoneDetection: false,
		isElectron: process.env.IS_ELECTRON ? true : false,
	},
	mutations: {
		activateEarphoneDetection(state) {
			state.earphoneDetection = true;
			playAudio(true, "home/detection_activated");
			startHelloLoop();
		},
		startHelloLoop() {
			playAudio(true, "home/hello");
			setTimeout(() => startHelloLoop(), 6000);
		},
		playAudio(state, name) {
			playAudio(true, name);
		},
		stopAudio() {
			stopAudio();
		},
		checkStock(state, payload: { index: number; amount: number; callback: (error: null | { type: boolean }) => boolean }) {
			// 남은 수량 확인
			if (state.stock[payload.index].quantity < payload.amount) {
				if (payload.callback) payload.callback({ type: false });
				return true;
			}
		},
		updateStock(
			state,
			payload: {
				index: number; // 상품 인덱스
				amount: number; // 필요 개수
				callback?: (
					error: null | {
						// 오류 상태 콜백
						type: string;
					}
				) => void;
			}
		) {
			// 남은 수량 확인
			if (state.stock[payload.index].quantity < payload.amount) {
				if (payload.callback) payload.callback({ type: "OVER_ORDER" });
				return;
			}
			// 수량 업데이트
			state.stock[payload.index].quantity += payload.amount;
			if (payload.callback) payload.callback(null);
		},
	},
	actions: {
		// async TEST({ commit, dispatch, state }, data): Promise<T> { }
		async PLAYAUDIO({}, name): Promise<any> {
			return await playAudio(true, name);
		},
		async PLAYITEMS({ commit, dispatch, state }, data): Promise<any> {
			console.log(state.stock);

			let stockList: string = "";
			state.stock.forEach(element => {
				stockList += `${element.name}, `;
			});

			// 재고 상태 출력
			await playAudio(true, "voiceorder/item_list");

			await dispatch("TTS", stockList);
		},
		async STT({}, data): Promise<string> {
			return (
				await axios.post("https://naveropenapi.apigw.ntruss.com/recog/v1/stt", data, {
					params: {
						lang: "Kor",
					},
					headers: {
						"Content-Type": "application/octet-stream",
						"X-NCP-APIGW-API-KEY-ID": process.env.VUE_APP_KEYID,
						"X-NCP-APIGW-API-KEY": process.env.VUE_APP_KEY,
					},
					withCredentials: true,
				})
			).data.text;
		},
		async TTS({}, text: string): Promise<any> {
			try {
				let checksum = CryptoJS.MD5(`3134${text}${process.env.VUE_APP_TTSACCOUNT}${process.env.VUE_APP_TTSID}${process.env.VUE_APP_TTSSECRET}`).toString();

				let result: Blob = (
					await axios.get(`http://www.vocalware.com/tts/gen.php?EID=3&LID=13&VID=4&TXT=${text}&ACC=${process.env.VUE_APP_TTSACCOUNT}&API=${process.env.VUE_APP_TTSID}&CS=${checksum}`, {
						responseType: "blob",
						headers: {
							"Content-Type": "audio/mp3",
						},
					})
				).data;

				let blobUrl = URL.createObjectURL(result);
				return await playAudio(false, blobUrl);
			} catch (err) {
				console.error(err);
			}
		},
		async CLOVA_TTS({}, text: string): Promise<any> {
			try {
				let result: Blob = (
					await axios.post(
						"https://naveropenapi.apigw.ntruss.com/voice-premium/v1/tts",
						qs.stringify({
							speaker: "nara",
							text: text,
							volume: "0",
							speed: "0",
							pitch: "0",
							emotion: "0",
						}),
						{
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
								"X-NCP-APIGW-API-KEY-ID": process.env.VUE_APP_KEYID,
								"X-NCP-APIGW-API-KEY": process.env.VUE_APP_KEY,
							},
							responseType: "blob",
							timeout: 30000,
							withCredentials: true,
						}
					)
				).data;

				let blobUrl = URL.createObjectURL(result);
				return await playAudio(false, blobUrl);
			} catch (err) {
				console.error(err);
			}
		},
	},
	modules: {},
});
