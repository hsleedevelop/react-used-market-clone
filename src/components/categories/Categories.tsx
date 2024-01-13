'use client';

import { useSearchParams } from "next/navigation";
import { TbBadge, TbBeach, TbCar, TbMan, TbMountain, TbSportBillard, TbWoman } from "react-icons/tb";
import CategoryBox from "./CategoryBox";

export const categories = [
  {
    label: "디지털기기",
    path: "digital",
    icon: TbBeach,
    description: "디지털기기 카테고리입니다."
  },
  {
    label: "생활가전",
    path: "appliances",
    icon: TbMountain,
    description: "생활가전 카테고리입니다."
  },
  {
    label: "가구",
    path: "interior",
    icon: TbMountain,
    description: "가구 카테고리입니다."
  },
  {
    label: "여성의류",
    path: "women-clothing",
    icon: TbWoman,
    description: "여성의류 카테고리입니다."
  },
  {
    label: "남성패션",
    path: "men-clothing",
    icon: TbMan,
    description: "남성패션 카테고리입니다."
  },
  {
    label: "뷰티/미용",
    path: "beauty",
    icon: TbBadge,
    description: "뷰티/미용 카테고리입니다."
  },
  {
    label: "스포츠/레저",
    path: "sports",
    icon: TbSportBillard,
    description: "스포츠/레저 카테고리입니다."
  },
  {
    label: "중고차",
    path: "used-car",
    icon: TbCar,
    description: "중고차 카테고리입니다."
  },
]

const Categories = () => {
  const parameters = useSearchParams();
  const category = parameters?.get("category");

  return (
    <div className="
    flex flex-row items-center justify-between overflow-x-auto pt-4
    ">
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          path={item.path}
          icon={item.icon}
          selected={category === item.path}
        />
      ))}
    </div>
  )
}

export default Categories