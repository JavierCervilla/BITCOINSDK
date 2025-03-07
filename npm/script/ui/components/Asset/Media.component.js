"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
//TODO: Extract from this omponent the images url
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const api_2_js_1 = require("../../../core/openbook/api_2.js");
const Loader_component_js_1 = require("../Loader/Loader.component.js");
const Placeholder_component_js_1 = require("./Placeholder.component.js");
const Stamp_component_js_1 = require("../Stamp/Stamp.component.js");
const STAMPS_ENDPOINT = "https://stamps.0.srcpad.pro/s";
const XCP_ENDPOINT = "https://counterparty.s3.us-east-1.amazonaws.com";
const Media = ({ asset, className = "", showStampIcon = true }) => {
    const { asset: assetName, description } = asset;
    const [isLoading, setIsLoading] = (0, react_2.useState)(true);
    const [hasError, setHasError] = (0, react_2.useState)(false);
    const [iframeError, setIframeError] = (0, react_2.useState)(false);
    const [iframeLoaded, setIframeLoaded] = (0, react_2.useState)(false);
    const [cip25JSON, setCip25JSON] = (0, react_2.useState)(null);
    const [currentSrc, setCurrentSrc] = (0, react_2.useState)(null);
    const [renderAsIframe, setRenderAsIframe] = (0, react_2.useState)(false);
    const xcpEndpoint = `${XCP_ENDPOINT}/${assetName}.webp`;
    const stampsEndpoint = `${STAMPS_ENDPOINT}/${assetName}`;
    const getUrl = (desc) => {
        if (!desc?.includes(".json"))
            return null;
        return desc.startsWith("http") ? desc : `https://${desc}`;
    };
    const cip25Url = getUrl(description);
    const isStamps = (0, react_2.useMemo)(() => description?.toLowerCase().includes("stamp:"), [description]);
    const preLoadImage = (0, react_2.useCallback)((src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setCurrentSrc(src);
                setIsLoading(false);
                setHasError(false);
                resolve();
            };
            img.onerror = () => {
                reject(new Error(`Error al cargar la imagen ${src}`));
            };
        });
    }, []);
    const fetchCip25Data = (0, react_2.useCallback)(async (url) => {
        try {
            const json = await api_2_js_1.openbook.utils.getCIP25JSON({ cip25Url: url });
            if (!json || (!json.image && (!json.images || json.images.length === 0))) {
                throw new Error("CIP-25 JSON inválido o sin imágenes");
            }
            if (json.image || (json.images && json.images.length > 0)) {
                setCip25JSON(json);
                setIsLoading(false);
                setHasError(false);
                return;
            }
            if (json.assetUrl) {
                setCurrentSrc(json.assetUrl);
                setRenderAsIframe(true);
                setIsLoading(false);
                setHasError(false);
                return;
            }
            throw new Error("CIP-25 JSON no contiene imágenes ni URLs válidas");
        }
        catch {
            setHasError(true);
            setIsLoading(false);
        }
    }, []);
    (0, react_2.useEffect)(() => {
        setIsLoading(true);
        setHasError(false);
        setRenderAsIframe(false);
        setIframeError(false);
        setIframeLoaded(false);
        (async () => {
            try {
                await preLoadImage(xcpEndpoint);
            }
            catch {
                if (cip25Url) {
                    try {
                        await fetchCip25Data(cip25Url);
                    }
                    catch {
                        try {
                            await preLoadImage(stampsEndpoint);
                        }
                        catch {
                            setCurrentSrc(stampsEndpoint);
                            setRenderAsIframe(true);
                            setIsLoading(false);
                        }
                    }
                }
                else {
                    try {
                        await preLoadImage(stampsEndpoint);
                    }
                    catch {
                        setCurrentSrc(stampsEndpoint);
                        setRenderAsIframe(true);
                        setIsLoading(false);
                    }
                }
            }
        })();
    }, [cip25Url, xcpEndpoint, stampsEndpoint, preLoadImage, fetchCip25Data]);
    const cip25ImageUrl = (0, react_2.useMemo)(() => {
        if (!cip25JSON)
            return null;
        return cip25JSON.images?.find((img) => img.type === "large")?.data || cip25JSON.image_large || cip25JSON.image;
    }, [cip25JSON]);
    const handleIframeLoad = () => {
        setIframeError(false);
        setIframeLoaded(true);
    };
    const handleIframeError = () => {
        setIframeError(true);
        setRenderAsIframe(false);
        setHasError(true);
    };
    const renderIframeWithErrorHandling = () => (react_1.default.createElement("div", { className: "relative w-full h-full" },
        react_1.default.createElement("iframe", { title: `${assetName}-preload`, sandbox: "allow-scripts allow-same-origin", src: currentSrc, className: "hidden", onLoad: handleIframeLoad, onError: handleIframeError }),
        iframeLoaded && (react_1.default.createElement("iframe", { title: assetName, sandbox: "allow-scripts allow-same-origin", src: currentSrc, className: "w-full h-full border-0 aspect-square transition-opacity duration-500 opacity-100" }))));
    const renderContent = () => {
        if (hasError || iframeError) {
            return (react_1.default.createElement("div", { className: "w-full h-full flex items-center justify-center" },
                react_1.default.createElement(Placeholder_component_js_1.PlaceholderSVG, { bgColor: "var(--light)", strokeColor: "var(--dark)" })));
        }
        if (cip25ImageUrl) {
            return react_1.default.createElement("img", { src: cip25ImageUrl, alt: assetName, className: "w-full h-full object-contain pixelated" });
        }
        if (renderAsIframe && currentSrc) {
            return renderIframeWithErrorHandling();
        }
        return react_1.default.createElement("img", { src: currentSrc || undefined, alt: assetName, className: "w-full h-full object-contain pixelated" });
    };
    return (react_1.default.createElement("div", { className: `relative w-15 h-15 bg-black border-2 text-green-500 border-green-500 overflow-hidden  ${className}` },
        isLoading && (react_1.default.createElement("div", { className: "absolute inset-0 flex items-center justify-center bg-light" },
            react_1.default.createElement(Loader_component_js_1.Loader, { className: "w-8 h-8 animate-spin" }))),
        isStamps && showStampIcon && (react_1.default.createElement("div", { className: "absolute bottom-2 left-2 w-10 h-10 rounded-full border-4 border-black shadow bg-secondary p-1" },
            react_1.default.createElement(Stamp_component_js_1.Stamp, { primaryColor: "text-light", secondaryColor: "text-dark" }))),
        renderContent()));
};
exports.Media = Media;
