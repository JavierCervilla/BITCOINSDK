//TODO: Extract from this omponent the images url
import type React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";

import { openbook } from "@/core/openbook/api.ts";

import { Loader } from "@/ui/components/Loader/Loader.component.tsx";
import { PlaceholderSVG } from "@/ui/components/Asset/Placeholder.component.tsx";
import { Stamp } from "@/ui/components/Stamp/Stamp.component.tsx";

import type { Cip25JsonOutput, Media as IMedia } from "@/core/types/cip25.d.ts";

interface AssetImageProps {
  asset: {
    asset: string;
    description?: string;
  };
  className?: string;
  showStampIcon?: boolean;
}

const STAMPS_ENDPOINT = "https://stamps.0.srcpad.pro/s";
const XCP_ENDPOINT = "https://counterparty.s3.us-east-1.amazonaws.com";

export const Media: React.FC<AssetImageProps> = ({ asset, className = "", showStampIcon = true }: Readonly<AssetImageProps>) => {
  const { asset: assetName, description } = asset;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [cip25JSON, setCip25JSON] = useState<Cip25JsonOutput | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [renderAsIframe, setRenderAsIframe] = useState(false);

  const xcpEndpoint = `${XCP_ENDPOINT}/${assetName}.webp`;
  const stampsEndpoint = `${STAMPS_ENDPOINT}/${assetName}`;

  const getUrl = (desc: string | undefined) => {
    if (!desc?.includes(".json")) return null;
    return desc.startsWith("http") ? desc : `https://${desc}`;
  };

  const cip25Url = getUrl(description);
  const isStamps = useMemo(() => description?.toLowerCase().includes("stamp:"), [description]);


  const preLoadImage = useCallback((src: string) => {
    return new Promise<void>((resolve, reject) => {
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

  const fetchCip25Data = useCallback(async (url: string) => {
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
    } catch {
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
      } catch {
        if (cip25Url) {
          try {
            await fetchCip25Data(cip25Url);
          } catch {
            try {
              await preLoadImage(stampsEndpoint);
            } catch {
              setCurrentSrc(stampsEndpoint);
              setRenderAsIframe(true);
              setIsLoading(false);
            }
          }
        } else {
          try {
            await preLoadImage(stampsEndpoint);
          } catch {
            setCurrentSrc(stampsEndpoint);
            setRenderAsIframe(true);
            setIsLoading(false);
          }
        }
      }
    })();
  }, [cip25Url, xcpEndpoint, stampsEndpoint, preLoadImage, fetchCip25Data]);

  const cip25ImageUrl = useMemo(() => {
    if (!cip25JSON) return null;
    return cip25JSON.images?.find((img: IMedia) => img.type === "large")?.data || cip25JSON.image_large || cip25JSON.image;
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

  const renderIframeWithErrorHandling = () => (
    <div className="relative w-full h-full">
      {/* Precarga del iframe en segundo plano */}
      <iframe
        title={`${assetName}-preload`}
        sandbox="allow-scripts allow-same-origin"
        src={currentSrc}
        className="hidden"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
      {/* Mostramos el iframe solo cuando esté cargado */}
      {iframeLoaded && (
        <iframe
          title={assetName}
          sandbox="allow-scripts allow-same-origin"
          src={currentSrc}
          className="w-full h-full border-0 aspect-square transition-opacity duration-500 opacity-100"
        />
      )}
    </div>
  );

  const renderContent = () => {
    if (hasError || iframeError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <PlaceholderSVG bgColor="var(--light)" strokeColor="var(--dark)" />
        </div>
      );
    }
    if (cip25ImageUrl) {
      return <img src={cip25ImageUrl} alt={assetName} className="w-full h-full object-contain pixelated" />;
    }
    if (renderAsIframe && currentSrc) {
      return renderIframeWithErrorHandling();
    }
    return <img src={currentSrc || undefined} alt={assetName} className="w-full h-full object-contain pixelated" />;
  };

  return (
    <div className={`relative w-15 h-15 bg-black border-2 text-green-500 border-green-500 overflow-hidden  ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-light">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      )}

      {isStamps && showStampIcon && (
        <div className="absolute bottom-2 left-2 w-10 h-10 rounded-full border-4 border-black shadow bg-secondary p-1">
          <Stamp primaryColor="text-light" secondaryColor="text-dark"  />
        </div>
      )}

      {renderContent()}
    </div>
  );
};
