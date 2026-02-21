"use client"

import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/axios'
import { ProjectType } from '@/types/type'
import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'

const ProjectList = () => {

  const [projectList, setProjectList] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState(false)

  const GetProjects = async() => {
    setLoading(true)
    const result = await api.get("/api/project")
    setProjectList(result.data)
    setLoading(false)
  }

  useEffect(() => {
    GetProjects()
  },[])

  return (
    <div className='px-10 md:px-24 lg:px-44 xl:px-56'>
      <h2 className='font-bold text-xl'>My Projects</h2>

      {!loading && projectList?.length == 0 && (
        <div className='p-6 border border-dashed rounded-3xl'>
          <h2 className='text-center'>No Project Available</h2>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {!loading ? projectList?.map((project, index) => (
          <ProjectCard project={project} key={index} />
        )) : [1,2,3].map((_,index) => (
          <div key={index} className='p-4'>
            <Skeleton className='h-50 w-full rounded-2xl' />
            <Skeleton className='mt-3 w-full h-6' />
            <Skeleton className='mt-1 w-30 h-3' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectList
