"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { THEME_NAME_LIST, THEMES } from "@/constants/themes";
import { SettingContext } from "@/context/SettingContext";
import { ProjectType } from "@/types/type";
import { Camera, Share, Sparkles } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  projectDetail: ProjectType | undefined;
};

const SettingsSection = ({ projectDetail }: Props) => {
  const [selectedTheme, setSelectedTheme] = useState("AURORA_INK");
  const [projectName, setProjectName] = useState(
    projectDetail?.projectName || "",
  );
  const [userNewScreenInput, setUserNewScreenInput] = useState("");
  const { setSettingsDetail } = useContext(SettingContext);

  const onThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    setSettingsDetail((prev: any) => ({
      ...prev,
      theme: theme,
    }));
  };

  useEffect(() => {
    setProjectName(projectDetail?.projectName || "");
    setSelectedTheme(projectDetail?.theme as string);
  }, [projectDetail]);

  return (
    <div className="w-75 h-[calc(100vh-72px)] p-5 border-r">
      <h2 className="font-medium text-lg">Settings</h2>

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
        <Button size={"sm"} className="mt-2 w-full">
          {" "}
          <Sparkles /> Generate with AI{" "}
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
