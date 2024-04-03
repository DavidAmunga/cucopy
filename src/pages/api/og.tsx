import { ImageResponse } from "@vercel/og";

const font = fetch(
  new URL("../../assets/RobotoMono-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export const config = {
  runtime: "edge",
};

export default async function () {
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <h1 tw="font-bold text-9xl font-sans text-gray-800">
          CUCOPY <br />
        </h1>
        <h2 tw="font-bold text-4xl font-sans text-gray-800">
          {"-"}
          Copy CU Invoice No from Tax Invoices
        </h2>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "RobotoMono",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
