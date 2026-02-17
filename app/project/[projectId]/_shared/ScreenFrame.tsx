"use client";

import { ThemeKey, THEMES, themeToCssVars } from "@/constants/themes";
import { SettingContext } from "@/context/SettingContext";
import { ProjectType, ScreenConfigType } from "@/types/type";
import { GripVertical } from "lucide-react";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import ScreenHandler from "./ScreenHandler";
import { HtmlWrapper } from "@/constants/htmlWrapper";

type props = {
  x: number;
  y: number;
  width: number;
  height: number;
  setPanningEnabled: (enabled: boolean) => void;
  htmlCode: string | undefined;
  projectDetail: ProjectType | undefined;
  screen: ScreenConfigType | undefined
};
const ScreenFrame = ({
  x,
  y,
  width,
  height,
  setPanningEnabled,
  htmlCode,
  projectDetail,
  screen
}: props) => {
  const { settingsDetail } = useContext(SettingContext)
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const theme = THEMES[(settingsDetail?.theme ?? projectDetail?.theme) as ThemeKey];

  const html = HtmlWrapper(theme, htmlCode as string)

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
      <div className="drag-handle flex flex-row items-center gap-2 bg-gray-300/70 dark:bg-gray-700/70 cursor-move px-2 py-4 rounded-2xl">
        {" "}
        <ScreenHandler screen={screen} theme={theme} iframeRef={iframeRef} projectId={projectDetail?.projectId as string} />
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

