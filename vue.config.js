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
			args[0].favicon_ico = `/assets/image/favicon.png`;
			args[0].icon_36 = `/assets/image/36x36.png`;
			args[0].icon_48 = `/assets/image/48x48.png`;
			args[0].icon_72 = `/assets/image/72x72.png`;
			args[0].icon_96 = `/assets/image/96x96.png`;
			args[0].icon_144 = `/assets/image/144x144.png`;
			args[0].icon_192 = `/assets/image/192x192.png`;
			return args;
		});
	},
};
