import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { HtmlWrapper } from "@/constants/htmlWrapper";
import { Theme } from "@/constants/themes";
import { RefreshDataContext } from "@/context/RefreshDataContext";
import api from "@/lib/axios";
import { ScreenConfigType } from "@/types/type";
import { useAuth } from "@clerk/nextjs";
import html2canvas from "html2canvas";
import {
  Code2Icon,
  Copy,
  Download,
  GripVertical,
  Loader2Icon,
  Lock,
  MoreVertical,
  Sparkle,
  SparkleIcon,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "sonner";

type props = {
  screen: ScreenConfigType | undefined;
  theme: Theme;
  iframeRef: any;
  projectId: string;
};

const ScreenHandler = ({ screen, theme, iframeRef, projectId }: props) => {
  const htmlCode = HtmlWrapper(theme, screen?.code as string);
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);
  const [editUserInput, setEditUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { has } = useAuth();
  const hasPremiumAccess = has && has({ plan: "unlimited" });

  const takeIframeScreenshot = async () => {
    const iframe = iframeRef?.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const body = doc.body;
      if (!body) return;

      // Wait one frame to ensure layout & fonts are fully rendered
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );

      const canvas = await html2canvas(body, {
        backgroundColor: null,
        useCORS: true,
        scale: window.devicePixelRatio || 1,
      });

      const image = canvas.toDataURL("image/png");

      // Auto-download
      const link = document.createElement("a");
      link.href = image;
      link.download = `${screen?.screenName || "screen"}.png`;
      link.click();
    } catch (error) {
      console.error("Screenshot failed:", error);
    }
  };

  const onDelete = async () => {
    const result = await api.delete(
      "/api/generate-config?projectId=" +
        projectId +
        "&screenId=" +
        screen?.screenId,
    );
    toast.success("Screen Deleted");
    setRefreshData({ method: "screenConfig", date: Date.now() });
  };

  const editScreen = async () => {
    setLoading(true);
    toast.info("Regenerating New Screen, Please wait...");
    const result = await api.post("/api/edit-screen", {
      projectId,
      screenId: screen?.screenId,
      userInput: editUserInput,
      oldCode: screen?.code,
    });

    console.log(result.data);

    toast.success("Screen Edited Succesfully");
    setRefreshData({ method: "screenConfig", date: Date.now() });
    setLoading(false);
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <GripVertical className="text-gray-500 h-4 w-4" />
        <h2>{screen?.screenName}</h2>
      </div>
      <div>
        <Dialog>
          <DialogTrigger>
            <Button variant={"ghost"}>
              <Code2Icon />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl w-full h-[70vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>HTML + Tailwindcss Code</DialogTitle>
              <DialogDescription>
                <div className="flex-1 overflow-y-auto rounded-md border bg-muted p-4 relative">
                  {/* @ts-ignore */}
                  <SyntaxHighlighter
                    language="html"
                    style={docco}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      overflowX: "hidden",
                      height: "50vh",
                    }}
                    codeTagProps={{
                      style: {
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      },
                    }}
                    className={`${!hasPremiumAccess && "blur-xs select-none"}`}
                  >
                    {htmlCode}
                  </SyntaxHighlighter>

                  {!hasPremiumAccess && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-medium">
                      <h3 className="text-xl font-semibold text-gray-800">
                        This feature is available for Unlimited users only.
                      </h3>
                      <p className="text-sm text-gray-700 font-medium mb-4">
                        Upgrade your plan to copy and use the generated UI/UX
                        HTML code.
                      </p>
                      <Link href={"/pricing"}>
                        <Button>
                          <Lock /> Unlock Premium Feature
                        </Button>
                      </Link>
                    </div>
                  )}

                  <Button
                    className="mt-3"
                    onClick={() => {
                      navigator.clipboard.writeText(htmlCode as string);
                      toast.success("Code Copied!");
                    }}
                    disabled={!hasPremiumAccess}
                  >
                    {" "}
                    <Copy /> Copy
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button variant={"ghost"} onClick={takeIframeScreenshot}>
          <Download />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"}>
              <SparkleIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <Textarea
                placeholder="What changesyou want to make?"
                onChange={(event) =>
                  setEditUserInput(event.target.value as string)
                }
              />
              <Button
                size={"sm"}
                className="mt-2"
                onClick={() => editScreen()}
                disabled={loading}
              >
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <Sparkle />
                )}{" "}
                Regenerate
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem variant="destructive" onClick={() => onDelete()}>
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ScreenHandler;
