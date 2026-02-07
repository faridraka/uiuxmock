"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

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
        <li className="hover:text-primary cursor-pointer transition-colors ease-in duration-75">
          Home
        </li>
        <li className="hover:text-primary cursor-pointer transition-colors ease-in duration-75">
          Pricing
        </li>
      </ul>
      {!user ? (
        <SignInButton mode="modal" >
          <Button>Get Started</Button>
        </SignInButton>
      ) : (
        <UserButton />
      )}
    </div>
  );
};

export default Header;
