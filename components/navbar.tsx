"use client";
// import { HomeIcon} from "@/components/icons";
"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Image } from "@heroui/react";
// import { Link } from "@heroui/link";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/logo_dark.png" : "/logo.png";
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" isBordered>
      {/* Left side: Logo */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink href="https://www.k-gloe.com/">
            <Image src={logoSrc} width="110px" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Right side: Theme toggle */}
      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
