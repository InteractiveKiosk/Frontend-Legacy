import Vue from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";

import "@iconify/iconify";

import AppButton from "@/components/AppButton.vue";

Vue.config.productionTip = false;

Vue.component("AppButton", AppButton);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
