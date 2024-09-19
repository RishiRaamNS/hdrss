"use client";
import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import CharityCard from "../../components/ui/CharityCard";
import { getCharities } from "@/firebase/firestore/charity";
export default function Page() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getCharities();
      setData(res);
    };
    fetch();
  });
  return (
    <div>
      <Header />
      <BackButton />
      <div className="p-6 lg:px-20 px-8">
        <h1 className="font-koulen text-grey text-4xl">Charities</h1>
        <div className="py-5 grid lg:grid-cols-2 gap-5 ">
          {data &&
            data.map((doc) => (
              <CharityCard
                image={doc.data.profile}
                name={doc.data.name}
                description={doc.data.description}
                id={doc.id}
              />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
