"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link href="/sing-in">Login</Link>
        </li>
        <li>
          <Link href="/sing-up">Register</Link>
        </li>
      </ul>
    </header>
  );
}
