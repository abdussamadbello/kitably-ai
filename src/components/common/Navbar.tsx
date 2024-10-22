"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="flex items-center mx-4">
      <NavigationMenu className="max-w-full p-4">
        <NavigationMenuList className="flex w-full">
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} font-semibold`}>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dashboard/book" legacyBehavior passHref>
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} font-semibold`}>My Books</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}
