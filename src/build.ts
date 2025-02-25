import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";


async function main() {
    await emptyDir("./npm");

    await build({
        entryPoints: ["./src/mod.ts"],
        outDir: "./npm",
        shims: { deno: true }, // Agrega compatibilidad con Deno en Node.js
        package: {
            name: "bitcoinsdk",
            version: "0.1.6",
            description: "Bitcoin SDK to integrate Bitcoin wallets to your app and get access to The OpenBook Protocol in your project",
            license: "MIT",
            repository: {
                type: "git",
                url: "https://github.com/JavierCervilla/BITCOINSDK.git"
            },
            main: "./esm/mod.js",
            module: "./esm/mod.js",
            types: "./esm/mod.d.ts",
            scripts: {
                build: "deno run -A build.ts"
            },
            publishConfig: {
                access: "public"
            }
        },
        typeCheck: false,
        declaration: true,
        test: false,
    });

    console.log("✅ Build completado. Ahora puedes publicar en NPM.");
}

main()