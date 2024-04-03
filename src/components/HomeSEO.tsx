import React from "react";
import { NextSeo } from "next-seo";

const HomeSEO = () => {
  const title = "CUCOPY";
  const description = "Scan and Copy CU Invoice No from Tax Invoices";
  const url = `https://cucopy.vercel.app`;
  const image = `https://cucopy.vercel.app/api/og`;
  const keywords = `tax,kenya,cu invoice,cu invoice no`;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        images: [
          {
            url: `${image}`,
            width: 1200,
            height: 630,
            alt: "CUCOPY",
          },
        ],

        site_name: "CUCOPY",
      }}
      additionalMetaTags={[
        {
          name: "keywords",
          content: keywords,
        },
      ]}
      twitter={{
        handle: "@davidamunga_", // Replace with your Twitter handle
        site: "@davidamunga_", // Replace with your Twitter username
        cardType: "summary_large_image",
      }}
    />
  );
};

export default HomeSEO;
