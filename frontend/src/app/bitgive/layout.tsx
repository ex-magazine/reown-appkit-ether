import type React from "react"
import { ThemeProvider } from "@/components/bitgive/theme-provider"
import type { Metadata } from "next"
import { ThirdwebProvider } from "thirdweb/react"
import { Toaster } from "@/components/bitgive/ui/sonner"

export const metadata: Metadata = {
  title: "BitGive - Donate Bitcoin, Change the World",
  description: "A blockchain-powered donation platform built on Rootstock",
    generator: 'v0.dev'
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <ThirdwebProvider>
        {children}
        <Toaster/>
      </ThirdwebProvider>
    </ThemeProvider>
 
  );
};

export default DashboardLayout;
