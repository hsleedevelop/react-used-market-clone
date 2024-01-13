import { PRODUCTS_PER_PAGE } from '@/constants';
import { useSearchParams } from 'next/navigation';
import React, { PropsWithChildren } from 'react'
import qs from 'query-string';
import cn from 'classnames';
import Link from 'next/link';

type PaginationLinkProps = {
  page?: number | string;
  active?: boolean;
  disabled?: boolean;
} & PropsWithChildren

const PaginationLink = ({ page, children, ...props }: PaginationLinkProps) => {
  const params = useSearchParams();
  const limit = PRODUCTS_PER_PAGE
  const skip = page ? (Number(page) - 1) * limit : 0

  let currentQuery = {}

  if (params) {
    currentQuery = qs.parse(params.toString())
  }

  const updateQuery: any = {
    ...currentQuery,
    page,
    skip
  }

  return (
    <Link
    href={{ query: updateQuery }}
    className={cn({
      "p-2": true,
      "font-bold text-orange-500": props.active,
      "text-gray-500": !props.active,
      "pointer-events-none text-gray-200": props.disabled
    })}
    >
      {children}
    </Link>
  )
}

export default PaginationLink