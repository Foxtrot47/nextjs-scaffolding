export async function PATCH(request: Request) {
  const { productid, quantity } = await request.json();

  const updteRes = await fetch("https://dummyjson.com/carts/1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merge: true, // this will include existing products in the cart
      products: [
        {
          id: productid,
          quantity: quantity,
        },
      ],
    }),
  });
  if (updteRes.ok) {
    return new Response(JSON.stringify({ message: "Cart updated" }), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    throw new Error("Something went wrong");
  }
}
