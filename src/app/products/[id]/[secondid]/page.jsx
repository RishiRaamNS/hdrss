import React from "react";
import {
  getServiceAndProductDocs,
  getServicesAndProductsList,
} from "@/firebase/firestore/servicesProducts";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import ServiceCard from "@/components/ui/ServiceCard";
import BackButton from "@/components/ui/BackButton";
import Navbar from "@/components/Navbar";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "products");
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesAndProductsList(
        null,
        null,
        item,
        "products"
      );
      return list2.map((subitem) => ({
        id: item,
        secondid: subitem,
      }));
    })
  );
  // Flatten the array of arrays into a single array of objects
  return paths.flat();
}

async function ProductLevel2Page({ params }) {
  const { id, secondid } = params;
  const data = await getServiceAndProductDocs(
    null,
    id,
    secondid,
    null,
    "products"
  );
  const capitalized = secondid.charAt(0).toUpperCase() + secondid.slice(1);
  return (
    <div>
      {/* <Header />
      <BackButton />
      <YoutubeEmbed embedId="#" />
      <div className="p-6 py-20">
        <h1 className="font-bold text-3xl text-center pb-20">{capitalized}</h1>
        <div className="grid grid-cols-3 gap-y-10 gap-x-4 items-center justify-center">
          {data.map((doc) => (
            <ServiceCard
              name={doc.data.name}
              url={doc.data.iconUrl}
              slug={`/products/${id}/${secondid}/${doc.id}`}
            />
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId="#" />
      <Footer /> */}
      <div>
        <div className="fixed w-full top-0 z-[50]">
          <Header />
        </div>
        <div className="grid lg:grid-cols-4">
          <Navbar />
          <div className="col-span-3 pt-[70px]">
            <BackButton />
            <YoutubeEmbed embedId="#" />

            <div className="p-6 py-20">
              <h1 className="text-center font-bold text-2xl pb-10">
                {capitalized}
              </h1>
              <div className="grid grid-cols-3 gap-y-10 gap-x-4 items-center justify-center">
                {data.map((doc) => (
                  <ServiceCard
                    name={doc.data.name}
                    url={doc.data.iconUrl}
                    slug={`/products/${id}/${secondid}/${doc.id}`}
                  />
                ))}
              </div>
            </div>
            <YoutubeEmbed embedId="#" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ProductLevel2Page;
