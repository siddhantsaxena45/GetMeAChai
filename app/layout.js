
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Get me a chai",
  description: "Fund raiser for the creators",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white">
        <SessionWrapper>
          <Navbar />

          <div className="min-h-[85.5vh] ">{children}</div>
          <Footer />
        </SessionWrapper>

      </body>
    </html>
  );
}
