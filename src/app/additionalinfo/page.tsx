"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  address: z.string().min(1, "Address is required").max(10000),
  phone: z.string().min(1, "Phone is required").max(100),
  email: z.string().min(1, "Email is required").email({
    message: "Must be a valid email",
  }),
  quantity: z.number().min(1, "Quantity is required").max(9999),
  date: z.date().min(new Date(), "Date is required"),
});

type Schema = z.infer<typeof schema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      quantity: 0,
      date: new Date(),
    },
  });

  const onSubmit = async (data: Schema) => console.log(data);

  return (
    <div className="mx-20 z-">
      <p className="text-4xl font-semibold my-10">Additional Info</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-x-2 gap-y-2">
          <p>Name:</p>
          <div className="col-span-3">
            <input
              type="text"
              className="px-4 py-2 border-gray-400 border rounded"
              required={true}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-2">
                {errors.name?.message}
              </p>
            )}
          </div>

          <p>Address:</p>
          <div className="col-span-3">
            <input
              type="text"
              className="px-4 py-2 border-gray-400 border rounded"
              required={true}
              {...register("address")}
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-2">
                {errors.address?.message}
              </p>
            )}
          </div>
          <p>Phone:</p>
          <div className="col-span-3">
            <input
              type="text"
              className="px-4 py-2 border-gray-400 border rounded"
              required={true}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-2">
                {errors.phone?.message}
              </p>
            )}
          </div>
          <p>Email:</p>
          <div className="col-span-3">
            <input
              type="email"
              className="px-4 py-2 border-gray-400 border rounded"
              required={true}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-2">
                {errors.email?.message}
              </p>
            )}
          </div>
          <p>Quantity</p>
          <div className="col-span-3">
            <input
              type="number"
              className="px-4 py-2 border-gray-400 border rounded"
              required={true}
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity && (
              <p className="text-xs text-red-500 mt-2">
                {errors.quantity?.message}
              </p>
            )}
          </div>
          <p>Order Date</p>
          <div className="col-span-3">
            <input
              type="date"
              className="px-4 py-2 border-gray-400 border rounded"
              required={true}
              {...register("date", { valueAsDate: true })}
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-2">
                {errors.date?.message}
              </p>
            )}
          </div>
        </div>
        <button className="px-6 py-2 bg-red-500 rounded-xl text-white text-xl">
          Submit
        </button>
      </form>
    </div>
  );
}
