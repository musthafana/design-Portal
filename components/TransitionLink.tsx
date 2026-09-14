'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({ children, href, className, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!document.startViewTransition) {
      router.push(href.toString());
      return;
    }
    document.startViewTransition(() => {
      router.push(href.toString());
    });
  };

  return (
    <a href={href.toString()} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
