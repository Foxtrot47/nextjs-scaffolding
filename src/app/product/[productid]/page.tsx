// We are splitting up the page into two components to demonstrate
// how to use Server and Client Components

// This page itself is a server component
// The code in this page is always run on the server
// But the code in the ProductInfo component is run on the client

import ProductInfo from "./ProductInfo";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Product - Store",
};

async function getData(id: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DUMMY_JSON_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}

export default async function Page({
  params,
}: {
  params: { productid: number };
}) {
  const data = await getData(params.productid);

  return <ProductInfo product={data} />;
}
