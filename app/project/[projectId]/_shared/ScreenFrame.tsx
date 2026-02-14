"use client";

import { ThemeKey, THEMES, themeToCssVars } from "@/constants/themes";
import { SettingContext } from "@/context/SettingContext";
import { ProjectType } from "@/types/type";
import { GripVertical } from "lucide-react";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

type props = {
  x: number;
  y: number;
  width: number;
  height: number;
  setPanningEnabled: (enabled: boolean) => void;
  htmlCode: string | undefined;
  projectDetail: ProjectType | undefined;
};
const ScreenFrame = ({
  x,
  y,
  width,
  height,
  setPanningEnabled,
  htmlCode,
  projectDetail,
}: props) => {
  const { settingsDetail } = useContext(SettingContext)
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const theme = THEMES[(settingsDetail?.theme ?? projectDetail?.theme) as ThemeKey];

  const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Google Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Iconify -->
  <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>

  <style>
    ${themeToCssVars(theme)}
  </style>
</head>

<body class="bg-background text-foreground w-full">
  ${htmlCode ?? ""}
</body>
</html>
`;

  const [size, setSize] = useState({ width, height });

  const measureIframeHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const headerHeight = 40; // tinggi drag bar
      const htmlEl = doc.documentElement;
      const body = doc.body;

      // ambil tinggi terbesar yang masuk akal
      const contentHeight = Math.max(
        htmlEl?.scrollHeight ?? 0,
        body?.scrollHeight ?? 0,
        htmlEl?.offsetHeight ?? 0,
        body?.offsetHeight ?? 0,
      );

      // clamp tinggi supaya tidak terlalu kecil/besar
      const nextHeight = Math.min(
        Math.max(contentHeight + headerHeight, 160),
        2000,
      );

      setSize((s) =>
        Math.abs(s.height - nextHeight) > 2 ? { ...s, height: nextHeight } : s,
      );
    } catch {
      // jika sandbox / cross-origin memblok akses
      // kita tidak bisa mengukur tinggi
    }
  }, []);

  useEffect(() => {
    setSize({width, height})
  }, [])

  useEffect(() => {
  const iframe = iframeRef.current;
  if (!iframe) return;

  const onLoad = () => {
    measureIframeHeight();

    const doc = iframe.contentDocument;
    if (!doc) return;

    // observe perubahan DOM dalam iframe
    const observer = new MutationObserver(() => measureIframeHeight());

    observer.observe(doc.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    // re-check untuk layout async (font, tailwind CDN, gambar)
    const t1 = window.setTimeout(measureIframeHeight, 50);
    const t2 = window.setTimeout(measureIframeHeight, 200);
    const t3 = window.setTimeout(measureIframeHeight, 600);

    return () => {
      observer.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  };

  iframe.addEventListener("load", onLoad);
  window.addEventListener("resize", measureIframeHeight);

  return () => {
    iframe.removeEventListener("load", onLoad);
    window.removeEventListener("resize", measureIframeHeight);
  };
}, [measureIframeHeight, htmlCode]);

  return (
    <Rnd
      default={{
        x,
        y,
        width: width,
        height: height,
      }}
      size={size}
      dragHandleClassName="drag-handle"
      enableResizing={{
        bottomRight: true,
        bottomLeft: true,
      }}
      onDragStart={() => setPanningEnabled(false)}
      onDragStop={() => setPanningEnabled(true)}
      onResizeStart={() => setPanningEnabled(false)}
      onResizeStop={() => setPanningEnabled(true)}
    >
      <div className="drag-handle flex flex-row items-center gap-2 cursor-move p-2">
        {" "}
        <GripVertical className="text-gray-500 h-4 w-4" /> Drag Here
      </div>
      <iframe
        ref={iframeRef}
        className="w-full h-[calc(100%-40px)] bg-background rounded-2xl mt-5"
        sandbox="allow-same-origin allow-scripts"
        srcDoc={html}
      />
    </Rnd>
  );
};

export default ScreenFrame;

