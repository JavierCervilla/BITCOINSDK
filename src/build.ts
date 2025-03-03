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
            { name: ".", path: "./src/mod.ts" }, // Exporta el módulo principal
            { name: "./core", path: "./src/core/index.ts" }, // Exporta el módulo core
            { name: "./ui", path: "./src/ui/index.ts" } // Exporta el módulo UI
        ],
        outDir: "./npm",
        shims: { deno: false },
        package: {
            name: "bitcoinsdk",
            version: "0.2.23",
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
                "tailwindcss-animate": "^1.0.7"
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
        postBuild: () => {
            Deno.copyFileSync("LICENSE", "npm/LICENSE");
            Deno.copyFileSync("README.md", "npm/README.md");
        }
    });

    console.log("✅ Build completado. Ahora puedes publicar en NPM.");
}

main();
