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
            { name: "./ui", path: "./src/ui/index.ts" }
        ],
        outDir: "./npm",
        shims: { deno: false },
        package: {
            name: "bitcoinsdk",
            version: "0.2.47",
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
                },
                "./ui": {
                    "import": "./esm/ui/index.js",
                    "require": "./cjs/ui/index.js"
                },
                "./styles.css": "./styles.css"
            },
            dependencies: {
                "@leather-wallet/types": "^0.2.1",
                "@leather.io/rpc": "^2.5.13",
                "@radix-ui/react-dropdown-menu": "^2.1.6",
                "@radix-ui/react-select": "^2.1.6",
                "@radix-ui/react-slot": "^1.1.1",
                "@radix-ui/react-tabs": "^1.1.3",
                "@tailwindcss/postcss": "^4.0.4",
                "@tailwindcss/vite": "^4.0.0",
                "autoprefixer": "^10.4.20",
                "bitcoinjs-lib": "^7.0.0-rc.0",
                "class-variance-authority": "^0.7.1",
                "clsx": "^2.1.1",
                "lucide-react": "^0.474.0",
                "react-hot-toast": "^2.5.1",
                "react-router-dom": "^7.1.3",
                "react-window": "^1.8.11",
                "tailwind-merge": "^2.6.0",
                "tailwindcss": "^4.0.0",
                "tailwindcss-animate": "^1.0.7",
                "zustand": "^5.0.3"
            },
            peerDependencies: {
                "react": "^19.0.0",
                "react-dom": "^19.0.0"
            },
            style: "./styles.css"

        },
        typeCheck: false,
        declaration: 'inline',
        test: false,
        postBuild: async () => {
            Deno.copyFileSync("LICENSE", "npm/LICENSE");
            Deno.copyFileSync("README.md", "npm/README.md");
            await Deno.writeTextFile("npm/package.json", JSON.stringify({
                ...JSON.parse(await Deno.readTextFile("npm/package.json")),
                "scripts": {
                    "postinstall": "node patch-wallet.js"
                }
            }, null, 2));
        }
    });

    Deno.writeTextFileSync(
        "npm/patch-wallet.js",
        `
            console.log("🔍 Ejecutando postinstall para inyectar WalletManager en globalThis...");
    
            if (!globalThis.__WALLET_MANAGER_INSTANCE__) {
                const { useWallet } = require("./cjs/ui/context/walletContext.js");
                globalThis.__WALLET_MANAGER_INSTANCE__ = useWallet();
                console.log("🟢 WalletManager inyectado en globalThis después de build");
            }
        `
    );
    

    console.log("✅ Build completado. Ahora puedes publicar en NPM.");
}

main();
