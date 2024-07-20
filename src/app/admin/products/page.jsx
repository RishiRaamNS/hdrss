"use client";
import React from "react";
import { useState, useEffect } from "react";
import EditSno from "@/components/Admin/Services/EditSno";
import EditServicePopup from "@/components/Admin/Services/EditServicePopup";
import DeleteServicePopup from "@/components/Admin/Services/DeleteServicePopup";
import Ads from "@/components/Admin/Advertisements/Ads";
import AddServicePopup from "@/components/Admin/Services/AddServicePopup";
import EditYt from "@/components/Admin/Services/EditYt";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import ServiceCard from "@/components/ui/ServiceCard";
import { getServiceAds } from "@/firebase/firestore/advertisements";

function page() {
  const [products, setProducts] = useState();
  const [snoOpen, setSnoOpen] = useState();
  const [addOpen, setAddOpen] = useState();
  const [editProductsOpen, setEditProductsOpen] = useState();
  const [deleteProductsOpen, setDeleteProductsOpen] = useState();
  const [ads, setAds] = useState();
  const [ytOpen, setYtOpen] = useState();
  const [updateAdsOpen, setUpdateAdsOpen] = useState();
  useEffect(() => {
    const fetchAds = async () => {
      const data = await getServiceAds("products", null, null, null, null);
      setAds(data);
    };
    const unsubscribe = subscribeToServicesAndProducts(
      setProducts,
      null,
      null,
      "products"
    );
    fetchAds();
    return () => unsubscribe();
  }, [updateAdsOpen]);
  return (
    <div className="my-8 mt-14 md:mt-32">
      <div className="flex justify-between items-center mb-14">
        <h1 className="font-bold text-2xl md:text-4xl">Products</h1>
        <div className=" flex gap-x-10">
          <EditSno open={snoOpen} setOpen={setSnoOpen} type="products" />
          <EditServicePopup
            open={editProductsOpen}
            setOpen={setEditProductsOpen}
            data={products}
            rootprevious={null}
            beforeprevious={null}
            previous={null}
            type="products"
          />
          <DeleteServicePopup
            open={deleteProductsOpen}
            setOpen={setDeleteProductsOpen}
            data={products}
            rootprevious={null}
            beforeprevious={null}
            previous={null}
            type="products"
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Advertisement</h2>
          <Ads
            open={updateAdsOpen}
            setOpen={setUpdateAdsOpen}
            data={ads}
            type="products"
          />
        </div>
        <div className="flex justify-between my-4 items-center">
          <h2 className="text-xl font-medium">Youtube Link</h2>
          <EditYt open={ytOpen} setOpen={setYtOpen} type="products" />
        </div>
      </div>
      <div className="grid grid-cols-3 place-items-center md:grid-cols-4 mt-10 gap-y-10 gap-x-10">
        {products &&
          products.map((item) => (
            <ServiceCard
              name={item.name}
              url={item.iconUrl}
              slug={`/admin/products/level2?previous=${item.id}&type=products`}
            />
          ))}
        <AddServicePopup
          open={addOpen}
          setOpen={setAddOpen}
          beforeprevious={null}
          previous={null}
          type="products"
        />
      </div>
    </div>
  );
}

export default page;
