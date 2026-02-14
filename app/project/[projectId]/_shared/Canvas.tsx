"use client";

import { ProjectType, ScreenConfigType } from "@/types/type";
import { useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import ScreenFrame from "./ScreenFrame";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type props = {
  projectDetail: ProjectType | undefined;
  screenConfig: ScreenConfigType[] | undefined;
  loading?: boolean;
};

const Canvas = ({ projectDetail, screenConfig, loading }: props) => {
  const [panningEnabled, setPanningEnabled] = useState(true);

  const isMobile = projectDetail?.device == "mobile";

  const SCREEN_WIDTH = isMobile ? 400 : 1200;
  const SCREEN_HEIGHT = isMobile ? 800 : 800;
  const GAP = 10;

  return (
    <div className="w-full h-[calc(100vh-72px)] bg-gray-200/20 dark:bg-gray-800/20 bg-[radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-size-[20px_20px]">
      <TransformWrapper
        initialScale={0.5}
        minScale={0.5}
        maxScale={3}
        initialPositionX={50}
        initialPositionY={50}
        limitToBounds={false}
        wheel={{ step: 0.8 }}
        doubleClick={{ disabled: false }}
        panning={{ disabled: !panningEnabled }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <Controls />
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
            >
              {screenConfig?.map((screen, index) => (
                <div key={index}>
                  {screen?.code && !loading ? (
                    <ScreenFrame
                      x={index * (SCREEN_WIDTH + GAP)}
                      y={0}
                      width={SCREEN_WIDTH}
                      height={SCREEN_HEIGHT}
                      setPanningEnabled={setPanningEnabled}
                      htmlCode={screen?.code}
                      projectDetail={projectDetail}
                    />
                  ) : (
                    <div
                      className="bg-gray-300/80 dark:bg-gray-800/80 gap-4 flex flex-col rounded-2xl p-5"
                      style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
                    >
                      <Skeleton className="w-full rounded-lg h-10" />
                      <Skeleton className="w-1/2 rounded-lg h-20" />
                      <Skeleton className="w-[70%] rounded-lg h-30" />
                      <Skeleton className="w-[30%] rounded-lg h-20" />
                      <Skeleton className="w-full rounded-lg h-10" />
                      <Skeleton className="w-1/2 rounded-lg h-20" />
                      <Skeleton className="w-[70%] rounded-lg h-30" />
                    </div>
                  )}
                </div>
              ))}
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Canvas;

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools absolute p-2 px-3 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-50 shadow flex gap-3 rounded-4xl bottom-8 left-1/2 border z-30">
      <Button variant={"ghost"} size={"sm"} onClick={() => zoomIn()}><Plus /></Button>
      <Button variant={"ghost"} size={"sm"} onClick={() => zoomOut()}><Minus/></Button>
      <Button variant={"ghost"} size={"sm"} onClick={() => resetTransform()}><RefreshCw/></Button>
    </div>
  );
};
