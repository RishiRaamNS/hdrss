import { Inter, Koulen } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const inter = Inter({ subsets: ["latin"] });

const koulen = Koulen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-koulen",
  display: "swap",
});

export const metadata = {
  title: "HDRSS",
  description: "HDRSS Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${koulen.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <main className="h-full">{children}</main>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
      </body>
    </html>
  );
}

RootLayout.getInitialProps = async ({ children }) => {
  return { children };
};
