import Link from "next/link";
import type { Metadata } from "next";
import { Product } from "../product/[productid]/ProductInfo";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const metadata: Metadata = {
  title: "Home - Store",
};

async function getData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DUMMY_JSON_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="mx-20 mt-6">
      <p className="text-4xl font-semibold my-10">Products</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 ">
        {data.products.map((item: Product) => (
          <Link
            key={item.id}
            href={`/product/${item.id}`}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
          >
            <img
              className="object-cover w-14 lg:w-36 rounded-t-lg h-auto"
              src={item.images[0]}
              alt=""
            />
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {item.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {item.description}
              </p>
              <p className="text-black">$ {item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
