"use client";

import { Button, Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();
  function setThemeMode(value) {
    if (value) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <header className="flex justify-between items-center">
      <Link href="/">
        <div>Digicommerce</div>
      </Link>
      <div className="flex items-center gap-4">
        <div>Featured</div>
        <div>Most Downloaded</div>
        <Button>Join as Creator</Button>
        <Switch size="sm" onChange={(e) => setThemeMode(e.target.checked)} />
      </div>
    </header>
  );
}
