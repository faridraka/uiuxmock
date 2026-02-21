import { currentUser } from "@clerk/nextjs/server";
import Header from "./_shared/Header";
import Hero from "./_shared/Hero";
import ProjectList from "./_shared/ProjectList";

export default async function Home() {
  const user = await currentUser()

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />
      <Hero />
      {user && <ProjectList />}

      {/* Background particle */}
      <div className="pointer-events-none -z-10 absolute -top-40 -left-40 w-125 h-125 bg-purple-400/20 blur-[120px] rounded-full" />
      <div className="pointer-events-none -z-10 absolute top-20 -right-50 w-125 h-125 bg-pink-400/20 blur-[120px] rounded-full" />
      <div className="pointer-events-none -z-10 absolute -bottom-50 left-1/3 w-125 h-125 bg-blue-400/20 blur-[120px] rounded-full" />
      <div className="pointer-events-none -z-10 absolute top-50 left-1/2 w-125 h-125 bg-sky-400/20 blur-[120px] rounded-full" />
    </div>
  );
}
