import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

interface ICategoryBoxProps {
  icon: IconType
  label: string
  path: string
  selected?: boolean
}

const CategoryBox = ({
  icon: Icon,
  label,
  path,
  selected,
}: ICategoryBoxProps) => {

  return (
    <Link
    href={`/?category=${path}`}
    className={`
    flex
    flex-col
    items-center
    justify-center
    gap-2
    p-3
    border-b-2
    hover:text-red-800
    transition
    cursor-pointer
    ${selected ? 'border-b-red-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </Link>
  )
}

export default CategoryBox