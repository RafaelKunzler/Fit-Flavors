import "./globals.css";

import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";




export const metadata = {
  title: "Fit Flavours",
  description: "Sua jornada Fitness começa na cozinha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}        
      </body>
    </html>
  );
}
