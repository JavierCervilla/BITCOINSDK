//TODO: Extract from this omponent the images url
import React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { openbook } from "../../../core/openbook/api_2.js";
import { Loader } from "../Loader/Loader.component.js";
import { PlaceholderSVG } from "./Placeholder.component.js";
import { Stamp } from "../Stamp/Stamp.component.js";
const STAMPS_ENDPOINT = "https://stamps.0.srcpad.pro/s";
const XCP_ENDPOINT = "https://counterparty.s3.us-east-1.amazonaws.com";
export const Media = ({ asset, className = "", showStampIcon = true }) => {
    const { asset: assetName, description } = asset;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [iframeError, setIframeError] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [cip25JSON, setCip25JSON] = useState(null);
    const [currentSrc, setCurrentSrc] = useState(null);
    const [renderAsIframe, setRenderAsIframe] = useState(false);
    const xcpEndpoint = `${XCP_ENDPOINT}/${assetName}.webp`;
    const stampsEndpoint = `${STAMPS_ENDPOINT}/${assetName}`;
    const getUrl = (desc) => {
        if (!desc?.includes(".json"))
            return null;
        return desc.startsWith("http") ? desc : `https://${desc}`;
    };
    const cip25Url = getUrl(description);
    const isStamps = useMemo(() => description?.toLowerCase().includes("stamp:"), [description]);
    const preLoadImage = useCallback((src) => {
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
    const fetchCip25Data = useCallback(async (url) => {
        try {
            const json = await openbook.utils.getCIP25JSON({ cip25Url: url });
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
    useEffect(() => {
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
    const cip25ImageUrl = useMemo(() => {
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
    const renderIframeWithErrorHandling = () => (React.createElement("div", { className: "relative w-full h-full" },
        React.createElement("iframe", { title: `${assetName}-preload`, sandbox: "allow-scripts allow-same-origin", src: currentSrc, className: "hidden", onLoad: handleIframeLoad, onError: handleIframeError }),
        iframeLoaded && (React.createElement("iframe", { title: assetName, sandbox: "allow-scripts allow-same-origin", src: currentSrc, className: "w-full h-full border-0 aspect-square transition-opacity duration-500 opacity-100" }))));
    const renderContent = () => {
        if (hasError || iframeError) {
            return (React.createElement("div", { className: "w-full h-full flex items-center justify-center" },
                React.createElement(PlaceholderSVG, { bgColor: "var(--light)", strokeColor: "var(--dark)" })));
        }
        if (cip25ImageUrl) {
            return React.createElement("img", { src: cip25ImageUrl, alt: assetName, className: "w-full h-full object-contain pixelated" });
        }
        if (renderAsIframe && currentSrc) {
            return renderIframeWithErrorHandling();
        }
        return React.createElement("img", { src: currentSrc || undefined, alt: assetName, className: "w-full h-full object-contain pixelated" });
    };
    return (React.createElement("div", { className: `relative w-15 h-15 bg-black border-2 text-green-500 border-green-500 overflow-hidden  ${className}` },
        isLoading && (React.createElement("div", { className: "absolute inset-0 flex items-center justify-center bg-light" },
            React.createElement(Loader, { className: "w-8 h-8 animate-spin" }))),
        isStamps && showStampIcon && (React.createElement("div", { className: "absolute bottom-2 left-2 w-10 h-10 rounded-full border-4 border-black shadow bg-secondary p-1" },
            React.createElement(Stamp, { primaryColor: "text-light", secondaryColor: "text-dark" }))),
        renderContent()));
};
