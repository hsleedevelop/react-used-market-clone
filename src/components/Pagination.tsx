'use client'

import React from 'react'
import { PRODUCTS_PER_PAGE } from '@/constants'
import usePagination from '@lucasmogari/react-pagination'
import PaginationLink from './PaginationLink'


interface IPaginationProps {
  page: number
  totalItems: number
  perPage: number
}

const Pagination = ({ page, totalItems, perPage }: IPaginationProps) => {
  const { getPageItem, totalPages } = usePagination({ 
    totalItems: totalItems,
    page: page,
    itemsPerPage: perPage,
    maxPageItems: 3,
  })

  const firstPage = 1
  const nextPage = Math.min(page + 1, totalPages)
  const prevPage = Math.max(page - 1, firstPage)
  const arr = new Array(totalPages + 2)

  return (
    <div
    className='flex items-center justify-center gap-2 mt-4'>
      {[...arr].map((_, index) => {
        const { page, disabled, current } = getPageItem(index)
        if (page === "previous") {
          return (
            <PaginationLink page={prevPage} disabled={disabled} key={index} >
              {'<'}
            </PaginationLink>
          )
        }

        if (page === "gap") {
          return <span key={`${page}-${index}`}>...</span>
        }

        if (page === "next") {
          return (
            <PaginationLink page={nextPage} disabled={disabled} key={index} >
              {'>'}
            </PaginationLink>
          )
        }
        
        console.log('page', page)
        
        if (!page)  return null;

        return (
          <PaginationLink active={current} page={page} key={index} >
            {page}
          </PaginationLink>
        )
      })}
    </div>
  )
}

export default Pagination