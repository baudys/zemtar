"use client";

import Image from "next/image";
import { useState, type CSSProperties, type ImgHTMLAttributes } from "react";
import { MISSING_PHOTO_TEMPLATE } from "@/lib/placeholders";

type Props = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  asBackground?: boolean;
  width?: number;
  height?: number;
  /** Předáno Next Image → správný srcset (jinak plain <img>). */
  sizes?: string;
  fill?: boolean;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
};

export function AssetOrPlaceholder({
  src,
  alt,
  className = "",
  style,
  asBackground,
  width,
  height,
  sizes,
  fill = false,
  loading = "lazy",
}: Props) {
  const [missing, setMissing] = useState(false);
  const resolvedSrc =
    missing && src !== MISSING_PHOTO_TEMPLATE
      ? MISSING_PHOTO_TEMPLATE
      : src;
  const usingTemplate = resolvedSrc === MISSING_PHOTO_TEMPLATE;
  const resolvedAlt = usingTemplate
    ? alt
      ? `${alt} (fotografie připravujeme)`
      : "Fotografie připravujeme"
    : alt;

  if (asBackground) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolvedSrc}
        alt=""
        aria-hidden
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${className}`}
        style={style}
        onError={() => {
          if (!usingTemplate) setMissing(true);
        }}
      />
    );
  }

  if (sizes && (fill || (width != null && height != null))) {
    if (fill) {
      return (
        <Image
          key={resolvedSrc}
          src={resolvedSrc}
          alt={resolvedAlt}
          fill
          sizes={sizes}
          className={className}
          style={style}
          loading={loading}
          onError={() => {
            if (!usingTemplate) setMissing(true);
          }}
        />
      );
    }
    return (
      <Image
        key={resolvedSrc}
        src={resolvedSrc}
        alt={resolvedAlt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        style={style}
        loading={loading}
        onError={() => {
          if (!usingTemplate) setMissing(true);
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt={resolvedAlt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={className}
      style={style}
      onError={() => {
        if (!usingTemplate) setMissing(true);
      }}
    />
  );
}
