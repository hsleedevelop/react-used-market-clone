"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { categories } from "@/components/categories/Categories";
import ProductHead from "@/components/products/ProductHead";
import ProductInfo from "@/components/products/ProductInfo";
import { Product, User } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";
interface IProductClientProps {
  product: Product & {
    user: User;
  };
  currentUser?: User | null;
}

const ProductClient: React.FC<IProductClientProps> = ({
  product,
  currentUser,
}) => {
  const router = useRouter();
  const category = categories.find((items) => items.path === product.category);

  const KakaoMap = dynamic(() => import("@/components/KakaoMap"), {
    ssr: false,
  });

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ProductHead
            title={product.title}
            imageSrc={product.imageSrc}
            id={product.id}
            currentUser={currentUser}
          />
        </div>

        <div className="grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-10">
          <div>
            <ProductInfo
              user={product.user}
              description={product.description}
              createdAt={product.createdAt}
              category={category}
            />
          </div>
          <div>
            <KakaoMap
              detailPage
              latitude={product.latitude}
              longitude={product.longitude}
            />
          </div>
        </div>

        {currentUser?.id !== product.userId && (
          <div className="py-6">
            <Button
              onClick={() =>
                router.push(
                  `/chat?id=${product.userId}&name=${product.user.name}&image=${product.user.image}`
                )
              }
              label="Chat with this user"
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProductClient;
