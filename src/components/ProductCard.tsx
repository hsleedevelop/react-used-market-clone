"use client";

import { Product, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import HeartButton from "./HeartButton";
import { fromNow } from "@/helpers/datetime";

interface IProductCardProps {
  product: Product;
  currentUser?: User | null;
}

const ProductCard = ({ currentUser, product }: IProductCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col w-full gap-2">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          <Image
            fill
            sizes="auto"
            className="object-cover w-full h-full transition group-hover:scale-110"
            src={product.imageSrc}
            alt={product.title}
          />
          <div className="absolute top-3 right-3">
            <HeartButton productId={product.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="text-lg fontsemibold">{product.title}</div>
        <div className="text-neutral-500 font-light">{product.category}</div>
        <div className="flex flex-row items-center justify-between gap-1">
          <div className="font-semibold">${product.price}<span className="font-light">원</span></div>
           <div>
            {fromNow(product.createdAt)}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
