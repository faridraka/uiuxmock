import { ProjectType } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  project: ProjectType;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <Link href={'/project/' + project.projectId} className="rounded-2xl p-4 cursor-pointer">
      <Image
        src={project.screenshot || "https://placehold.co/300x300.png"}
        alt={project.projectName as string}
        width={300}
        height={300}
        className="rounded-xl object-contain h-50 w-full bg-gray-200 dark:bg-gray-900"
      />
      <div className="p-2">
        <h2>{project.projectName}</h2>
        <p className="text-sm text-gray-500">{project.createdOn}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
