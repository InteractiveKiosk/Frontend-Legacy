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
			let result = (
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
							"X-NCP-APIGW-API-KEY-ID": process.env.KEYID,
							"X-NCP-APIGW-API-KEY": process.env.KEY,
						},
						responseType: "blob",
						timeout: 30000,
						withCredentials: true,
					}
				)
			).data;

			let speech = new Audio();
			speech.play();
		},
	},
	modules: {},
});
