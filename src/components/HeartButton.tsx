"use client";

import useFavorite from "@/hooks/useFavorite";
import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface IHeartButtonProps {
  productId: string;
  currentUser?: User | null;
}

const HeartButton = ({ productId, currentUser }: IHeartButtonProps) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    productId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative transition cursor-pointer hover:opacity-80"
    >
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart
        size={24}
        className={hasFavorite ? "fill-orange-500" : "fill-white"}
      />
    </div>
  );
};

export default HeartButton;
