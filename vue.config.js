const storage = `https://firebasestorage.googleapis.com/v0/b/interactive-kiosk.appspot.com/o/`;
module.exports = {
	// publicPath: process.env.IS_ELECTRON ? "app://." : process.env.BASE_URL,
	// publicPath: process.env.NODE_ENV === "production" ? "/Frontend/" : "/",
	// outputDir: "docs",
	// devServer: {
	// 	https: true,
	// 	hotOnly: false,
	// },
	pwa: {
		name: "Interactive Kiosk",
		themeColor: "#F6CB4C",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "public/service-worker.js",
		},
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "@/variables.scss";`,
			},
		},
	},
	pluginOptions: {
		electronBuilder: {
			chainWebpackRendererProcess(config) {
				config.plugins.delete("workbox");
				config.plugins.delete("pwa");
			},
		},
	},
	chainWebpack: config => {
		config.plugin("html").tap(args => {
			args[0].title = "Interactive Kiosk";
			args[0].favicon_ico = `${storage}favicon.png?alt=media&token=8617c75f-85e9-43e2-b4d0-0e1f403644ba`;
			args[0].icon_36 = `${storage}36x36.png?alt=media&token=98a2c9b8-e53f-4d00-a987-ce6829db3711`;
			args[0].icon_48 = `${storage}48x48.png?alt=media&token=15e19fb0-4ff5-4af4-8d53-460c1207380b`;
			args[0].icon_72 = `${storage}72x72.png?alt=media&token=62821afd-2864-464f-ba29-1326ea0d8611`;
			args[0].icon_96 = `${storage}96x96.png?alt=media&token=7d9251ca-872c-4ace-b5b7-866c029679c3`;
			args[0].icon_144 = `${storage}144x144.png?alt=media&token=bd56d52e-170f-4237-9580-a994de8a1227`;
			args[0].icon_192 = `${storage}192x192.png?alt=media&token=b0738356-7da7-453d-a040-15f15f03625c`;
			return args;
		});
	},
};
