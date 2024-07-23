'use client'
import Link from 'next/link'
import { classNames } from '@/utils/helper'
import { usePathname } from 'next/navigation'

const secondaryNavigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    initial: 'D',
  },
  {
    name: 'General',
    href: '/dashboard/general',
    initial: 'G',
  },
  {
    name: 'Upstox',
    href: '/dashboard/upstox',
    initial: 'U',
  },
  {
    name: 'Telegram',
    href: '/dashboard/telegram',
    initial: 'T',
  },
  {
    name: 'Devices',
    href: '/dashboard/devices',
    initial: 'D',
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-white lg:block lg:w-64 lg:flex-none lg:border-0">
      <nav className="flex-none overflow-x-auto px-2 py-4 lg:p-0">
        <ul role="list" className="flex flex-row gap-3 lg:flex-col">
          {secondaryNavigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={classNames(
                  item.href === pathname
                    ? 'bg-gray-50 text-primary'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                )}
              >
                <span
                  className={classNames(
                    item.href === pathname
                      ? 'border-primary text-primary'
                      : 'group-hover:primary border-gray-200 text-gray-400 group-hover:border-primary',
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                  )}
                >
                  {item.initial}
                </span>
                <span className="truncate">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
