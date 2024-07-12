"use client";
import React from "react";
import { Carousel } from "@material-tailwind/react";

function Advertisement({ ads }) {
  return (
    <Carousel>
      {ads && ads.map((ad, index) => (
        <div
          key={index}
          className="max-h-[300px] md:max-h-[500px] w-[100vw] md:w-[70vw] mx-auto overflow-hidden"
        >
          <img
            src={ad}
            alt="advertisement"
            className="w-full object-contain aspect-video"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default Advertisement;
