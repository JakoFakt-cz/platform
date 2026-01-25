"use client";

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

interface DropdownItem {
  label: string;
  href: string;
}

interface MenuItemProps {
  label: string;
  href?: string;
  isMulti?: boolean;
  items?: DropdownItem[];
}

const MenuItem = ({ label, href, isMulti, items = [] }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const content = (
      <span
          className={`text-primary font-semibold text-lg flex items-center gap-0.5 cursor-pointer px-2 py-1 rounded-md hover:bg-primary/10 transition-all duration-200 ${
              isOpen ? 'bg-primary/10' : ''
          }`}
          onClick={() => isMulti && setIsOpen(!isOpen)}
      >
      {label}
        {isMulti && (
            <Icon
                icon={'mdi:chevron-down'}
                className={`text-2xl transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
        )}
    </span>
  );

  return (
      <div className="relative inline-block" ref={menuRef}>
        {isMulti ? (
            content
        ) : (
            <Link href={href || '#'} passHref>
              {content}
            </Link>
        )}

        {isMulti && isOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
              {items.map((item, index) => (
                  <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
              ))}
            </div>
        )}
      </div>
  );
};

export default MenuItem;