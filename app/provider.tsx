"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingContext } from "@/context/SettingContext";
import { RefreshDataContext } from "@/context/RefreshDataContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [userDetail, setUserDetail] = useState();
  const [settingsDetail, setSettingsDetail] = useState();
  const [refreshData, setRefreshData] = useState()

  const CreateNewUser = async () => {
    const res = await axios.post("/api/user", {});

    setUserDetail(res?.data);
  };

  useEffect(() => {
    CreateNewUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SettingContext.Provider value={{ settingsDetail, setSettingsDetail }}>
        <RefreshDataContext.Provider value={{refreshData, setRefreshData}}>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
          >
            {children}
          </ThemeProvider>
        </RefreshDataContext.Provider>
      </SettingContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default Provider;
