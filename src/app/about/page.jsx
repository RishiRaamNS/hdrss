"use client";
import Header from "@/components/ui/Header";
import Navbar from "@/components/Navbar";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import Footer from "@/components/ui/Footer";
import { useEffect, useState } from "react";
import { getHDRSS } from "@/firebase/firestore/hdrss";

export default function Page() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getHDRSS();
      setData(data);
    };
    fetch();
  });
  return (
    <div>
      <div className="fixed w-full top-0 z-[50]">
        <Header />
      </div>
      <main>
        <div className="lg:grid grid-cols-5 relative z-[0]">
          <Navbar />
          <div className="col-span-4 pt-[60px]">
            <img src="/membermd.png" alt="" className="w-full" />
            <div className="flex justify-center w-full mt-[-100px] ">
              <div className="p-3 rounded-full shadow-2xl bg-white">
                <img
                  src="/orangelogo.png"
                  alt=""
                  className="w-[160px] md:w-[200px]"
                />
              </div>
            </div>
            <div className="lg:px-20 px-10">
              <div className="font-semibold text-xl text-center pt-5 grid gap-1">
                <h1>இந்து தர்ம ரக்‌ஷ சேனா</h1>
                <h1>Hindhu Dharma Raksha Sena</h1>
              </div>
              <div className="flex justify-center gap-5 text-3xl text-kaavi py-5 items-center">
                <IoLogoWhatsapp />
                <FaFacebook />
                <FaPhoneAlt />
              </div>
              <div className="">
                <h1 className="font-koulen text-4xl text-grey ">ABOUT US</h1>
                <h5 className="pt-5 text-justify">{data && data.about}</h5>
              </div>
            </div>
            <div className="py-5">
              <h1 className="font-koulen text-4xl text-grey px-10 lg:px-20">
                GALLERY
              </h1>
              <div className="py-5">
                <section className=" overflow-hidden w-full text-center">
                  <Marquee pauseOnClick pauseOnHover>
                    {data &&
                      data.gallery.map((photo, index) => (
                        <img
                          src={photo}
                          alt="gallery"
                          key={index}
                          className="h-[200px] mx-2"
                        />
                      ))}
                  </Marquee>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
