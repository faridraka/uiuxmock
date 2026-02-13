import { ThemeKey, THEMES, themeToCssVars } from "@/constants/themes";
import { ProjectType } from "@/types/type";
import { GripVertical } from "lucide-react";
import React from "react";
import { Rnd } from "react-rnd";

type props = {
  x: number;
  y: number;
  width: number;
  height: number;
  setPanningEnabled: (enabled: boolean) => void;
  htmlCode: string | undefined;
  projectDetail: ProjectType | undefined
};
const ScreenFrame = ({
  x,
  y,
  width,
  height,
  setPanningEnabled,
  htmlCode,
  projectDetail
}: props) => {
  const selectedTheme = projectDetail?.theme as ThemeKey
  const theme = THEMES[selectedTheme]

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

  return (
    <Rnd
      default={{
        x,
        y,
        width: width,
        height: height,
      }}
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
        className="w-full h-[calc(100%-40px)] bg-background rounded-2xl mt-5"
        sandbox="allow-same-origin allow-scripts"
        srcDoc={html}
      />
    </Rnd>
  );
};

export default ScreenFrame;
