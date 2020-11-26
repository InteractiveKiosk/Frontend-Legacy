import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

import { StockItem } from "../schema";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		stock: [] as StockItem[],
	},
	mutations: {
		setTmpStock(state, payload) {
			state.stock = [
				{
					name: "사과",
					price: 1000,
					alias: ["사과", "사가"],
					quantity: 10,
				},
				{
					name: "라면",
					price: 500,
					alias: ["라면", "라멘", "나면"],
					quantity: 10,
				},
				{
					name: "파스타",
					price: 10000,
					alias: ["파스타", "스파게티", "스파게리", "수파게티", "파수타"],
					quantity: 10,
				},
				{
					name: "복숭아",
					price: 2000,
					alias: ["복숭아", "봉숭아", "보숭아", "보숭이", "복숭", "보숭"],
					quantity: 10,
				},
				{
					name: "우유",
					price: 3500,
					alias: ["우유", "우우", "유유", "으유"],
					quantity: 10,
				},
			];
		},
		// 재고 업데이트
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
		async STT({ commit, state }, data): Promise<string> {
			let result = (
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

			return result;
		},
		async TTS({ commit, state }, data): Promise<void> {
			try {
				let result: Blob = (
					await axios.post(
						"https://naveropenapi.apigw.ntruss.com/voice-premium/v1/tts",
						qs.stringify({
							speaker: "nara",
							text: data.text,
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

				let speech = new Audio(blobUrl);
				speech.play();

				speech.addEventListener("ended", () => {
					URL.revokeObjectURL(blobUrl);
				});
			} catch (err) {
				console.error(err);
			}
		},
	},
	modules: {},
});
