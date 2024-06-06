"use client";

import { Inter } from "next/font/google";
import "./globals.css"
import  { AppWrapper }  from "./context/index.jsx";
// import { useRouter } from 'next/router';
import {useUser} from "../../lib/auth"
import Link from "next/link";
import { LOGIN_ROUTE } from "../../lib/routes";
import { usePathname } from "next/navigation";
import Login from "./pages/login/page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const user = useUser()
  const pathname = usePathname();
  // const router = useRouter();

  if (!user){
    
    return <html lang="en">
    <AppWrapper>
      <body className={inter.className}><Login/></body>
    </AppWrapper>
  </html>
  }

  return (
    <html lang="en">
      <AppWrapper>
        <body className={inter.className}>{children}</body>
      </AppWrapper>
    </html>
  );
}