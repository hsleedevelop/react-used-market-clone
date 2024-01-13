import { PRODUCTS_PER_PAGE } from "@/constants"
import prisma from "@/helpers/prismadb"

export interface IProductParameters {
  latitude?: number
  longitude?: number
  category?: string
  skip?: number
  page?: number
}

export default async function getProducts(
  params: IProductParameters = {}
) {
  try {
    const {
      latitude,
      longitude,
      category,
      skip,
    } = params

    let query: any = {};

    console.log('query.category', category)
    if (category) {
      query.category = category
    }

    if (latitude) {
      query.latitude = {
        gte: Number(latitude) - 0.01,
        lte: Number(latitude) + 0.01,
      }
    }

    if (longitude) {
      query.longitude = {
        gte: Number(longitude) - 0.01,
        lte: Number(longitude) + 0.01,
      }
    }

    const totalItems = await prisma.product.count({
      where: query
    })

    const products = await prisma.product.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      take: PRODUCTS_PER_PAGE,
      skip: skip ? Number(skip) : 0
    })

    return {
      data: products,
      totalItems
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
