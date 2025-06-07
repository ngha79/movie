"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const showtimes: { title: string; to: string }[] = [
  {
    title: "Lịch chiếu phim hôm nay",
    to: "/showtimes/today",
  },
  {
    title: "Phim đang chiếu",
    to: "/movies",
  },
  {
    title: "Phim sắp chiếu",
    to: "/movies?tab=coming-soon",
  },
];

const cinemas: { title: string; to: string }[] = [
  {
    title: "CGV",
    to: "/rap/1",
  },
  {
    title: "Galaxy Cinema",
    to: "/rap/2",
  },
  {
    title: "Lotte Cinema",
    to: "/rap/3",
  },
  {
    title: "Beta Cinema",
    to: "/rap/4",
  },
];

export default function RouterHeader() {
  return (
    <NavigationMenu viewport={false} className="max-lg:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Lịch chiếu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2">
              {showtimes.map((time) => (
                <ListItem key={time.title} title={time.title} to={time.to} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Rạp chiếu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2">
              {cinemas.map((cinema) => (
                <ListItem
                  key={cinema.title}
                  title={cinema.title}
                  to={cinema.to}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/movies">Phim chiếu</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/reviews">Review phim</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  to,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { to: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={to}>
          <div className="text-sm leading-none font-medium">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
