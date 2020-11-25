import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {
		async TTS({ commit, state }, data): Promise<any> {
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
		},
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
	},
	modules: {},
});
