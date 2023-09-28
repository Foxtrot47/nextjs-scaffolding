"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, MouseEventHandler } from "react";

export default function Page(props: { product: Product }) {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    // Clamp the new quantity between 1 and 1000
    const clampedQuantity = Math.min(Math.max(newQuantity, 1), 1000);

    setQuantity(clampedQuantity);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    if (quantity > product.stock) {
      alert("Not enough stock!");
      return;
    }
    const updatedCart = await fetch("/api/cart", {
      method: "PATCH",
      body: JSON.stringify({
        productId: product.id,
        quantity,
      }),
    });
    if (updatedCart.ok) {
      alert("Added to cart!");
      router.push("/cart");
    } else {
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="flex flex-row gap-x-10 mt-10 mx-20">
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-56 w-auto"
      />
      <div className="flex flex-col gap-y-5">
        <p className="text-3xl">{product.title}</p>
        <p className="text-xl w-3/4">{product.description}</p>
        <p className="text-2xl font-semibold">${product.price}</p>

        <div className="flex flex-row gap-x-10">
          <input
            type="number"
            className="w-44 border border-gray-300 rounded px-4"
            max={1000}
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button className="bg-orange-500 rounded px-8 py-4 text-xl" onClick={handleSubmit}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
