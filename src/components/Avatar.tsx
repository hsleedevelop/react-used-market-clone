import Image from "next/image";
import React from "react";
interface AvatarProps {
  src: string | null | undefined;
}
const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="rounded-full w-10 h-10"
      height={30}
      width={30}
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
