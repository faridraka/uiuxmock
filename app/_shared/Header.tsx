"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex flex-row gap-2 items-center ">
        <Image src={"/logo.png"} height={40} width={40} alt="Logo" />
        <h2 className="text-xl font-semibold ">
          <span className="text-primary">UIUX</span> Mock
        </h2>
      </div>
      <ul className="flex flex-row gap-10 items-center text-lg">
        <Link href={"/"}><li className="hover:text-primary cursor-pointer transition-colors ease-in duration-75">
          Home
        </li>
        </Link>
        <Link href={"/pricing"}><li className="hover:text-primary cursor-pointer transition-colors ease-in duration-75">
          Pricing
        </li>
        </Link>
      </ul>
      <div className="flex flex-row items-center justify-between gap-4">
        <ModeToggle />
        {!user ? (
        <SignInButton mode="modal" >
          <Button>Get Started</Button>
        </SignInButton>
      ) : (
        <UserButton />
      )}
      </div>
    </div>
  );
};

export default Header;
