// Importing env files here to validate on build
import "./src/env.mjs";
import pwa from "next-pwa";
import path from 'node:path'

const isDev = process.env.NODE_ENV !== "production";

const generateAppDirEntry = (entry) => {
    // const packageDirectory = path.dirname("node_modules/next-pwa/");
    // const registerJs = path.join(packageDirectory, "register.js");
    const registerJs = "node_modules/next-pwa/register.js"

    return entry().then((entries) => {
        // Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427
        if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
            if (Array.isArray(entries["main-app"])) {
                entries["main-app"].unshift(registerJs);
            } else if (typeof entries["main-app"] === "string") {
                entries["main-app"] = [registerJs, entries["main-app"]];
            }
        }

        return entries;
    });

};

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    /** Enables hot reloading for local packages without a build step */
    transpilePackages: ["@fitness/api-legacy", "@fitness/types"],
    /** We already do linting and typechecking as separate tasks in CI */
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },

    webpack(config) {
        if( !isDev ){
            const entry = generateAppDirEntry(config.entry);
            config.entry = () => entry;
        }
        return config;
    },
};

const withPWA = pwa({
    dest: 'public',
    register: true,
    disable: isDev,
});

export default withPWA({
    ...config,
});
