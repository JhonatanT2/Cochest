
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./ui/sidemenu/sidemenu";
import { AuthProvider } from "./ui/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Test Coche',
  description: 'Designed by Jhonatan Torres'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/drive.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>      
        <AuthProvider>
          <div className="flex h-auto flex-col md:flex-row md:overflow-hidden bg-gray-200">
            <div className="sticky -top-24 w-auto flex-none z-50 md:w-64 md:h-screen">
              <Sidebar/>
            </div>
            <div className="sticky top-0 flex-grow  md:overflow-y-auto md:px-0 md:py-0">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
