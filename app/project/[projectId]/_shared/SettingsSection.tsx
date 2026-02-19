"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { THEME_NAME_LIST, THEMES } from "@/constants/themes";
import { RefreshDataContext } from "@/context/RefreshDataContext";
import { SettingContext } from "@/context/SettingContext";
import { ProjectType } from "@/types/type";
import axios from "axios";
import { Camera, Loader2Icon, Share, Sparkles } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  projectDetail: ProjectType | undefined;
  screenDescription: string;
};

const SettingsSection = ({ projectDetail, screenDescription }: Props) => {
  const [selectedTheme, setSelectedTheme] = useState("AURORA_INK");
  const [projectName, setProjectName] = useState(
    projectDetail?.projectName || "",
  );
  const [userNewScreenInput, setUserNewScreenInput] = useState("");
  const { setSettingsDetail } = useContext(SettingContext);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading");
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);

  const onThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    setSettingsDetail((prev: any) => ({
      ...prev,
      theme: theme,
    }));
  };

  const GenerateNewScreen = async () => {
    setLoading(true);

    const result = await axios.post("/api/generate-config", {
      projectId: projectDetail?.projectId,
      userInput: userNewScreenInput,
      deviceType: projectDetail?.device,
      theme: projectDetail?.theme,
      oldScreenDescription: screenDescription,
    });

    console.log(result.data);
    setRefreshData({ method: "screenConfig", date: Date.now() });
    setLoading(false);
  };

  useEffect(() => {
    setProjectName(projectDetail?.projectName || "");
    setSelectedTheme(projectDetail?.theme as string);
  }, [projectDetail]);

  return (
    <div className="w-75 h-[calc(100vh-72px)] p-5 border-r">
      <h2 className="font-medium text-lg">Settings</h2>

      {loading && (
        <div className="p-3 absolute bg-blue-300/20 border-blue-400 border rounded-xl left-1/2 top-20 z-10">
          <h2 className="flex flex-row gap-2 items-center">
            {" "}
            <Loader2Icon className="animate-spin" /> {loadingMsg}{" "}
          </h2>
        </div>
      )}

      <div className="mt-3">
        <h2 className="text-sm mb-1">Project Name</h2>
        <Input
          placeholder="Project Name"
          value={projectName}
          onChange={(event) => {
            setProjectName(event?.target?.value);
            setSettingsDetail((prev: any) => ({
              ...prev,
              projectName: projectName,
            }));
          }}
        />
      </div>

      <div className="mt-5">
        <h2 className="text-sm mb-1">Generate New Screen</h2>
        <Textarea
          placeholder="Enter Prompt to generate screen using AI"
          value={userNewScreenInput}
          onChange={(event) => setUserNewScreenInput(event.target.value)}
        />
        <Button
          size={"sm"}
          className="mt-2 w-full"
          onClick={GenerateNewScreen}
          disabled={loading}
        >
          {" "}
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <Sparkles />
          )}{" "}
          Generate with AI{" "}
        </Button>
      </div>

      <div className="mt-5">
        <h2 className="text-sm mb-1">Themes</h2>
        <div className="h-50 overflow-auto">
          <div>
            {THEME_NAME_LIST.map((theme, index) => (
              <div
                key={index}
                className={`p-3 border rounded-xl mb-2 ${selectedTheme === theme && "border-primary bg-primary/20"}`}
                onClick={() => onThemeSelect(theme)}
              >
                <h2>{theme}</h2>
                <div className="flex gap-2">
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ background: THEMES[theme]?.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ background: THEMES[theme]?.secondary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ background: THEMES[theme]?.accent }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ background: THEMES[theme]?.background }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ background: THEMES[theme]?.muted }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{
                      background: `linear-gradient(135deg, ${THEMES[theme].background}, ${THEMES[theme].primary}, ${THEMES[theme].accent})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-sm mb-1">Extras</h2>
        <div className="flex gap-3">
          <Button size={"sm"} variant={"outline"} className="mt-2">
            <Camera /> Screenshot
          </Button>
          <Button size={"sm"} variant={"outline"} className="mt-2">
            <Share /> Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
