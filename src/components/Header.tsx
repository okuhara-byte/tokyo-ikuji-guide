'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: '補助金を探す' },
  { href: '/journey', label: '妊活・出産ガイド' },
  { href: '/calendar', label: '申請カレンダー' },
  { href: '/compare', label: '区を比較する' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-[1080px] mx-auto px-6 h-14 flex items-center gap-2">
        <Link
          href="/"
          className="text-[17px] font-bold text-text no-underline shrink-0 hover:no-underline"
        >
          東京 妊活・出産・育児 支援ガイド
        </Link>
        <nav className="ml-auto">
          <ul className="flex gap-0.5 list-none">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm no-underline px-3 py-1.5 rounded transition-colors ${
                      isActive
                        ? 'text-blue font-bold bg-bg2'
                        : 'text-sub hover:bg-bg2 hover:text-text'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
