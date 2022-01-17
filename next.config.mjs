/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en-US", "zh-CN"],
        defaultLocale: "en-US",
        localeDetection: false
    }
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