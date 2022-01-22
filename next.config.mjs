/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        disableStaticImages: true
    },
    i18n: {
        locales: ["en-US", "zh-CN"],
        defaultLocale: "en-US",
        localeDetection: false
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpe?g|gif|webp|avif|mp4)$/i,
            issuer: /\.(jsx?|tsx?|mdx)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        publicPath: "/_next",
                        name: "static/media/[name].[hash].[ext]",
                    },
                },
            ],
        })

        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {loader: "@svgr/webpack", options: {svgoConfig: {plugins: {removeViewBox: false}}}},
                {
                    loader: "file-loader",
                    options: {
                        publicPath: "/_next",
                        name: "static/media/[name].[hash].[ext]",
                    },
                },
            ],
        })

        return config
    },
}

// export default withPWA({
//     pwa: {
//         dest: "public",
//         register: true,
//         skipWaiting: true,
//         disable: process.env.NODE_ENV === "development"
//     },
//     ...nextConfig
// })

export default nextConfig