"uce client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SettingContext } from "@/context/SettingContext";
import axios from "axios";
import { Loader2, Save } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "sonner";

const ProjectHeader = () => {
  const { settingsDetail } = useContext(SettingContext);
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    try {
      setLoading(true);
      const result = await axios.put("/api/project", {
        theme: settingsDetail?.theme,
        projectName: settingsDetail?.projectName,
        projectId: settingsDetail?.projectId,
      });

      setLoading(false);
      toast.success("Setting Saved!");
    } catch (err) {
      setLoading(false);
      toast.error("Error: ", err as any);
    }
  };
  return (
    <div className="flex flex-row justify-between items-center p-4 shadow">
      <div className="flex flex-row gap-2 items-center ">
        <Image src={"/logo.png"} height={40} width={40} alt="Logo" />
        <h2 className="text-xl font-semibold ">
          <span className="text-primary">UIUX</span> Mock
        </h2>
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <ModeToggle />
        <Button onClick={onSave} disabled={loading}>
          {" "}
          {loading ? <Loader2 className="animate-spin" /> : <Save />} Save
        </Button>
      </div>
    </div>
  );
};

export default ProjectHeader;
