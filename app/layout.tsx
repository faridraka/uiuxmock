import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes"
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const appFont = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UIUX Mockup Generator App",
  description: "Generated High quality Free UIUX Mobile and Web Mockup Design",
  icons: "/logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      theme: shadcn
    }}>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={`${appFont.className} antialiased`}>
          <Provider>
            {children}
          </Provider>
          <Toaster position="top-center" richColors/>
        </body>
      </html>
    </ClerkProvider>
  );
}
