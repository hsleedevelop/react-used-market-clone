"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import { categories } from "@/components/categories/Categories";
import CategoryInput from "@/components/categories/CategoryInput";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const ProductUploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      latitude: 33.5563,
      longitude: 126.7958,
      imgSrc: "",
      price: 1,
    },
  });
  const router = useRouter();
  const imageSrc = watch("imageSrc");
  const category = watch("category");
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const KakaoMap = dynamic(() => import("@/components/KakaoMap"), {
    ssr: false,
  })

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  };
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post("/api/products", data)
    .then((response) => {
      router.push(`/products/${response.data.id}`);
      reset();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Heading title="Product Upload" subtitle="Upload your product" />
          <ImageUpload
            onChange={(value) => setCustomValue("imageSrc", value)}
            value={imageSrc}
          />
          <hr />

          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <hr />

          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <hr />

          <Input
            id="price"
            label="Price"
            formatPrice
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <hr />

          <div
            className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          max-h-[50vh]
          overflow-y-auto
          "
          >
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.path}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>

          <hr />
          
          <KakaoMap 
          setCustomValue={setCustomValue}
          latitude={watch("latitude")}
          longitude={watch("longitude")}
          />
          
          <Button label="Create Product" />
        </form>
      </div>
    </Container>
  );
};

export default ProductUploadPage;
