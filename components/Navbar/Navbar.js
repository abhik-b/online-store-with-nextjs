import React from "react";
import { useRouter } from "next/router";

const SmartLink = ({ children, href }) => {
  const router = useRouter();

  function handleClick(e) {
    e.preventDefault();
    router.push(href);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={router.asPath === href ? "active-navlink navlink" : "navlink"}
    >
      {children}
    </a>
  );
};

export default function Navbar({ cart }) {
  return (
    <nav>
      <SmartLink href="/">Home</SmartLink>
      <SmartLink href="/cart">Cart {cart && cart.total_unique_items}</SmartLink>
    </nav>
  );
}
