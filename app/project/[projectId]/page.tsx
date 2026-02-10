"use client";

import React, { useEffect, useState } from "react";
import ProjectHeader from "./_shared/ProjectHeader";
import SettingsSection from "./_shared/SettingsSection";
import axios from "axios";
import { useParams } from "next/navigation";
import { ProjectType, ScreenConfigType } from "@/types/type";
import { Loader } from "lucide-react";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/constants/prompt";

const ProjectCanvasPlaygrond = () => {
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<ProjectType>();
  const [screenConfig, setScreenConfig] = useState<ScreenConfigType[]>();
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading");

  const GetProjectDetail = async () => {
    setLoading(true);
    setLoadingMsg("Loading...");
    const result = await axios.get("/api/project?projectId=" + projectId);
    console.log(result.data);
    setProjectDetail(result?.data?.projectDetail);
    setScreenConfig(result?.data?.screenConfig);

    // if(result?.data?.screenConfig.length == 0){
    //   generateScreenConfig();
    // }
    setLoading(false);
  };

  const generateScreenConfig = async () => {
    setLoading(true);
    setLoadingMsg("Generating Screen Config...");

    const result = await axios.post("/api/generate-config", {
      userInput: projectDetail?.userInput,
      deviceType: projectDetail?.device,
      projectId
    });

    console.log("Generated Screen Config: ", result.data);
    GetProjectDetail()

    setLoading(false);
  };

  useEffect(() => {
    projectId && GetProjectDetail();
  }, [projectId]);

  useEffect(() => {
    if (projectDetail && screenConfig && screenConfig.length == 0) {
      generateScreenConfig();
    }
  }, [projectDetail && screenConfig]);

  return (
    <div>
      <ProjectHeader />

      <div>
        {loading && (
          <div className="p-3 absolute bg-blue-300/20 border-blue-400 border rounded-xl left-1/2 top-20">
            <h2 className="flex flex-row gap-2 items-center">
              {" "}
              <Loader className="animate-spin" /> {loadingMsg}{" "}
            </h2>
          </div>
        )}
        {/* Settings Canvas */}
        <SettingsSection projectDetail={projectDetail} />
      </div>
    </div>
  );
};

export default ProjectCanvasPlaygrond;
