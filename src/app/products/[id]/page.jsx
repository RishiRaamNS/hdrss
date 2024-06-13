import { getProductsDocs, getProductsList } from "@/firebase/firestore/getData";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import ServiceCard from "@/components/ServiceCard";
import BackButton from "@/components/BackButton";

export async function generateStaticParams() {
  const list = await getProductsList();
  return list.map((item) => ({
    id: item,
  }));
}

export default async function ProductPages({ params }) {
  const { id } = params;
  const data = await getProductsDocs(null, null, id);
  const capitalized = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div>
      <Header />
      <BackButton route={`/products`} />
      <YoutubeEmbed embedId="#" />
      <div className="p-6 py-20">
        <h1 className="text-center font-bold text-2xl pb-10">{capitalized}</h1>
        <div className="grid grid-cols-3 gap-y-10 gap-x-4 items-center justify-center">
          {data.map((doc) => (
            <ServiceCard
              name={doc.data.name}
              url={doc.data.iconUrl}
              slug={`/products/${id}/${doc.id}`}
            />
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId="#" />
      <Footer />
    </div>
  );
}
