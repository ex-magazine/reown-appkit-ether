
import { Metadata } from "next"
import { siteConfig } from "@/config/oktaycolakoglu"

import { GeistSans } from "geist/font/sans"
import HolyLoader from "holy-loader"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ether/oktaycolakoglu/ui/toaster"
import { GridBg } from "@/components/ether/oktaycolakoglu/grid-bg"
import { ScrollTop } from "@/components/ether/oktaycolakoglu/scroll-top"
import { SiteFooter } from "@/components/ether/oktaycolakoglu/site-footer"
import { SiteHeader } from "@/components/ether/oktaycolakoglu/site-header"
import { TailwindIndicator } from "@/components/ether/oktaycolakoglu/tailwind-indicator"
import { ThemeProvider } from "@/components/ether/oktaycolakoglu/theme-provider"

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
// }


export const metadata: Metadata = {
  title: 'Movie Application oktaycolakoglu',
  description: 'A movie application built with Next.js',
};

const DashboardLayoutOktaycolakoglu = ({ children }: { children: React.ReactNode }) => {
  return (
  
      <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable
        )}
      >
        <HolyLoader color="#ccc" />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div
            className="relative flex min-h-screen flex-col bg-background"
            vaul-drawer-wrapper=""
          >
            <GridBg />
            <SiteHeader />
            <div className="relative flex-1 py-4">{children}</div>
            <SiteFooter />
          </div>
          <TailwindIndicator />
          <ScrollTop />
        </ThemeProvider>
       
        <Toaster />
      </div>
  )
}




export default DashboardLayoutOktaycolakoglu;

