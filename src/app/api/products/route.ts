import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/helpers/prismadb";

export async function POST(request : Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json();
  const { title, description, imageSrc, category, price, latitude, longitude } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error()
    }
  })

  const product = await prisma.product.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      price: Number(price),
      latitude,
      longitude,
      userId: currentUser.id
    }
  })

  return NextResponse.json(product)
}