import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import ProvidersWrapper from "./components/ProvidersWrapper";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Code Snippets",
  description: "An application to help developers store and retrieve code snippets.",
  icons: {
    icon: "logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${space_grotesk.className} scrollbar min-h-screen flex flex-col overflow-scroll`}
      >
        <ProvidersWrapper>
          <Navbar />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
