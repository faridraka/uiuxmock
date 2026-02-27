"use client";

import { RefreshDataContext } from "@/context/RefreshDataContext";
import { SettingContext } from "@/context/SettingContext";
import api from "@/lib/axios";
import { ProjectType, ScreenConfigType } from "@/types/type";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import Canvas from "./_shared/Canvas";
import ProjectHeader from "./_shared/ProjectHeader";
import SettingsSection from "./_shared/SettingsSection";

const ProjectCanvasPlaygrond = () => {
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<ProjectType>();
  const [screenConfigOriginal, setScreenConfigOriginal] =
    useState<ScreenConfigType[]>();
  const [screenConfig, setScreenConfig] = useState<ScreenConfigType[]>();
  const { setSettingsDetail } = useContext(SettingContext);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading");
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);
  const [takeScreenshot, setTakeScreenshot] = useState<any>();
  const hasGeneratedConfig = useRef(false);

  const GetProjectDetail = async () => {
    setLoading(true);
    setLoadingMsg("Loading...");
    const result = await api.get("/api/project?projectId=" + projectId);
    console.log(result.data);
    setProjectDetail(result?.data?.projectDetail);
    setScreenConfigOriginal(result?.data?.screenConfig);
    setScreenConfig(result?.data?.screenConfig);
    setSettingsDetail(result?.data?.projectDetail);

    // if(result?.data?.screenConfig.length == 0){
    //   generateScreenConfig();
    // }
    setLoading(false);
  };

  const generateScreenConfig = async () => {
    setLoading(true);
    setLoadingMsg("Generating Screen Config...");

    const result = await api.post("/api/generate-config", {
      userInput: projectDetail?.userInput,
      deviceType: projectDetail?.device,
      projectId,
    });

    console.log("Generated Screen Config: ", result.data);
    GetProjectDetail();

    setLoading(false);
  };

  const GenerateScreenUIUX = async () => {
    setLoading(true);

    for (let index = 0; index < (screenConfig?.length ?? 0); index++) {
      const screen = screenConfig![index];

      if (screen.code) continue;
      setLoadingMsg("Generating Screen " + (index + 1));

      const result = await api.post("/api/generate-screen-ui", {
        projectId,
        screenId: screen?.screenId,
        screenName: screen?.screenName,
        purpose: screen?.purpose,
        screenDescription: screen?.screenDescription,
        projectVisualDescription: projectDetail?.projectVisualDescription,
      });
      setScreenConfig((prev) =>
        prev?.map((item, i): any => (i === index ? result.data : item)),
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    projectId && GetProjectDetail();
  }, [projectId]);

  useEffect(() => {
    if (refreshData?.method === "screenConfig") {
      GetProjectDetail();
    }
  }, [refreshData]);

  useEffect(() => {
    if (!projectDetail || !screenConfigOriginal) return;

    if (screenConfigOriginal.length === 0 && !hasGeneratedConfig.current) {
      hasGeneratedConfig.current = true;
      generateScreenConfig();
    } else if (screenConfigOriginal.length > 0) {
      GenerateScreenUIUX();
    }
  }, [projectDetail, screenConfigOriginal]);

  return (
    <div>
      <ProjectHeader />

      <div className="flex">
        {loading && (
          <div className="p-3 absolute bg-blue-300/20 border-blue-400 border rounded-xl left-1/2 top-20 z-10">
            <h2 className="flex flex-row gap-2 items-center">
              {" "}
              <Loader2Icon className="animate-spin" /> {loadingMsg}{" "}
            </h2>
          </div>
        )}
        {/* Settings Canvas */}
        <SettingsSection
          projectDetail={projectDetail}
          screenDescription={screenConfig?.[0]?.screenDescription ?? ""}
          takeScreenshot={() => setTakeScreenshot(Date.now())}
        />
        <Canvas
          projectDetail={projectDetail}
          screenConfig={screenConfig}
          takeScreenshot={takeScreenshot}
        />
      </div>
    </div>
  );
};

export default ProjectCanvasPlaygrond;
