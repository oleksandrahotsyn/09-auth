"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link href="/sign-in">Login</Link>
        </li>
        <li>
          <Link href="/sign-up">Register</Link>
        </li>
      </ul>
    </header>
  );
}
