"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { suggestions } from "@/constants/suggestions";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ChevronRight, Loader, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Hero = () => {
  const [userInput, setUserInput] = useState("")
  const [device, setDevice] = useState<string>("website")
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const router = useRouter();

  const onCreateProject = async() => {
    if(!user){
      router.push("/sign-in")
      return
    }

    // Create a new project 
    if(!userInput){
      return 
    }

    setLoading(true)
    const projectId = crypto.randomUUID();
    const result = await axios.post("/api/project",{
      projectId,
      userInput,
      device
    })

    console.log(result.data)
    setLoading(false)
  }

  return (
    <div className="p-10 md:px-24 lg:px-48 xl:px-60 mt-8">
      <div className="flex justify-center items-center w-full mb-5">
        <div className="group relative max-w-sm mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
          <span
            className={cn(
              "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-linear-to-r from-[#ffaa40]/50 via-primary/50 to-[#ffaa40]/50 bg-size-[300%_100%] p-px",
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">
            Introducing Magic UI
          </AnimatedGradientText>
          <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </div>
      </div>
      <h2 className="text-5xl font-bold text-center">
        Design High Quality{" "}
        <span className="text-primary">Website and Mobile App</span> Designs
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-3">
        From website to mobile apps, we turn ideas into intuitive, high-impact
        digital experiences. ✨
      </p>
      <div className="flex mt-5 w-full gap-6 justify-center items-center">
        <InputGroup className="max-w-xl bg-white dark:bg-gray-900 z-10 rounded-2xl">
          <InputGroupTextarea
            data-slot="input-group-control"
            className="flex field-sizing-content min-h-24 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
            placeholder="Enter what design you want to create..."
            value={userInput}
            onChange={(event) => setUserInput(event.target?.value)}
          />
          <InputGroupAddon align="block-end">
            <Select defaultValue="website" onValueChange={(value) => setDevice(value)}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <InputGroupButton className="ml-auto" size="sm" variant="default" onClick={onCreateProject} disabled={loading} >
              {loading ? <Loader className="animate-spin" /> : <Send />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex gap-3 mt-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="p-2 border rounded-2xl flex flex-col items-center bg-white dark:bg-gray-900 z-10 cursor-pointer" onClick={() => setUserInput(suggestion?.prompt)}>
            <h2 className="text-lg">{suggestion?.icon}</h2>
            <h2 className="text-center line-clamp-2 text-sm">{suggestion?.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
