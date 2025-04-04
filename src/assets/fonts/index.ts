import localFont from "next/font/local";

const lufga = localFont({
  src: [
    {
      path: "./Lufga/LufgaThin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "./Lufga/LufgaExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "./Lufga/LufgaLight.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Lufga/LufgaRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Lufga/LufgaMedium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Lufga/LufgaSemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Lufga/LufgaBold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Lufga/LufgaExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Lufga/LufgaBlack.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-lufga",
  display: "swap",
});

export { lufga };
