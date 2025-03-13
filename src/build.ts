import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";


async function main() {
    await emptyDir("./npm");

    const tailwindProcess = new Deno.Command(Deno.execPath(), {
        args: [
            "run",
            "-A",
            "npm:@tailwindcss/cli@latest",
            "-i", "src/ui/styles/tailwind.css",
            "-o", "npm/styles.css",
            "--config", "tailwind.config.js",
            "--minify",
        ],
    });
    await tailwindProcess.output();


    await build({
        entryPoints: [
            { name: ".", path: "./src/mod.ts" },
            { name: "./core", path: "./src/core/index.ts" },
        ],
        outDir: "./npm",
        shims: { deno: false },
        package: {
            name: "bitcoinsdk",
            version: "0.2.53",
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
            },
            exports: {
                ".": {
                    "import": "./esm/mod.js",
                    "require": "./cjs/mod.js"
                },
                "./core": {
                    "import": "./esm/core/index.js",
                    "require": "./cjs/core/index.js"
                }
            },
            dependencies: {
                "@leather-wallet/types": "^0.2.1",
                "@leather.io/rpc": "^2.5.13",
                "bitcoinjs-lib": "^7.0.0-rc.0",
            }

        },
        typeCheck: false,
        declaration: 'inline',
        test: false,
        postBuild: () => {
            Deno.copyFileSync("LICENSE", "npm/LICENSE");
            Deno.copyFileSync("README.md", "npm/README.md");
        }
    });

    console.log("✅ Build completado. Ahora puedes publicar en NPM.");
}

main();
