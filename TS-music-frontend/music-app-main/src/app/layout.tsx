import "./globals.css";
import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import { Layout, FixedPlugin } from "@/components";
import { StoreProvider } from "@/redux/StoreProvider";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { LocalStorageProvider } from "@/context/LocalStorageContext";

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700", "900"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Staging Music App",
  description: "Staging Music App Made by Rivals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocalStorageProvider>
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <StoreProvider>
          <html lang="en">
            <head>
              <script
                defer
                data-site="YOUR_DOMAIN_HERE"
                src="https://api.nepcha.com/js/nepcha-analytics.js"
              ></script>
              <link
                rel="shortcut icon"
                href="/developer.png"
                type="image/png"
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
              ></meta>
              {/* <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js"></script> */}
            </head>
            <body className={"font-notoRegular"}>
              <Layout>{children}</Layout>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
                integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              {/* <link
          href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
          rel="stylesheet"
        /> */}
            </body>
          </html>
        </StoreProvider>
      </PrimeReactProvider>
    </LocalStorageProvider>
  );
}
