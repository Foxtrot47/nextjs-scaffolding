import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Cart - Store",
};

async function getData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DUMMY_JSON_URL}/carts/user/5`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const result: CartSelectResult = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return result;
}

export default async function Page() {
  const result: CartSelectResult = await getData();
  return (
    <div className="mx-20 mt-6">
      <p className="text-4xl font-semibold my-10">Cart</p>
      <div className="flex flex-col border border-black">
        {result.carts[0].products.map((product: CartProduct) => (
          <div
            className="border-b border-t border-collapse border-black grid grid-cols-4 justify-between"
            key={product.id}
          >
            <div className="flex flex-row gap-x-10 col-span-2">
              <img
                className="w-auto h-32"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
              />
              <p className="text-4xl py-4">{product.title}</p>
            </div>

            <p>x {product.quantity}</p>
            <p className="text-2xl font-semibold">$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CartSelectResult {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: 3;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}
