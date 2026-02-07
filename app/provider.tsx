"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ThemeProvider } from "@/components/theme-provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [userDetail, setUserDetail] = useState();

  const CreateNewUser = async () => {
    const res = await axios.post("/api/user", {});

    setUserDetail(res?.data);
  };

  useEffect(() => {
    CreateNewUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="ui-theme"
      >
        <div>{children}</div>
      </ThemeProvider>
    </UserDetailContext.Provider>
  );
};

export default Provider;
