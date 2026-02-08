"uce client"

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import Image from "next/image";

const ProjectHeader = () => {
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
        <Button>
          {" "}
          <Save /> Save
        </Button>
      </div>
    </div>
  );
};

export default ProjectHeader;
