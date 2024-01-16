// Importing env files here to validate on build
import "./src/env.mjs";
import pwa from "next-pwa";

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    /** Enables hot reloading for local packages without a build step */
    transpilePackages: ["@fitness/api-legacy", "@fitness/types", "@fitness/api", "@fitness/db"],
    /** We already do linting and typechecking as separate tasks in CI */
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
};

const withPWA = pwa({
    dest: 'public',
    register: true,
});

export default withPWA({
    ...config,
});
