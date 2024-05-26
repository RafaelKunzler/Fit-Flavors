import "./globals.css";

import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";




export const metadata = {
  title: "Fit Flavours",
  description: "Sua jornada Fitness começa na cozinha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-foreground">
        <Provider>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
