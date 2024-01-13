import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { toast } from "react-toastify";

interface IUseFavoriteProps {
  productId: string;
  currentUser?: User | null;
}

const useFavorite = ({ productId, currentUser }: IUseFavoriteProps) => {
  const router = useRouter();
  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(productId);
  }, [productId, currentUser]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('productId:' + productId)
    if (!currentUser) {
      toast.error("You must be logged in");
      return;
    }

    try {
      let request;

      if (hasFavorite) {
        request = () => axios.delete(`/api/favorites/${productId}`);
      } else {
        request = () => axios.post(`/api/favorites/${productId}`);
      }

      await request();
      router.refresh();
      toast.success('Success')
    } catch (error) {
      toast.error('Something went wrong')
    }
  };

  return { hasFavorite, toggleFavorite };
};

export default useFavorite;