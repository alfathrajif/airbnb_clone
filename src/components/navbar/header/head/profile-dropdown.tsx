import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Menu, UserRound } from "lucide-react";
import styles from "./profile-dropdown.module.scss";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const authLinks = [
  {
    name: "Log in",
    path: "/login",
  },
  {
    name: "Sign up",
    path: "/signup",
  },
];

const featureLinks = [
  {
    name: "Gift cards",
    path: "/giftcards",
  },
  {
    name: "Airbnb your home",
    path: "/host/homes",
  },
  {
    name: "Host an experience",
    path: "/host/experiences",
  },
  {
    name: "Help Center",
    path: "/help",
  },
];

export default function ProfileDropdown() {
  return (
    <Popover>
      <PopoverTrigger asChild className="ml-2">
        <Button
          variant="outline"
          className="hover:bg-background hover:shadow h-12 [&_svg]:size-auto px-2 pl-3.5">
          <Menu size={20} className="text-muted-foreground" />
          <div className="bg-muted-foreground rounded-full h-8 w-8 flex items-center justify-center">
            <UserRound size={18} strokeWidth={3} className="text-muted" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className={styles.content}>
        <div className="py-2">
          {authLinks.map(({ name, path }) => (
            <Button
              key={name}
              asChild
              variant="ghost"
              className={`w-full rounded-none justify-start ${
                name === "Log in" ? "font-medium" : "font-light"
              }`}>
              <Link href={path}>{name}</Link>
            </Button>
          ))}
        </div>
        <Separator />
        <div className="py-2">
          {featureLinks.map(({ name, path }) => (
            <Button
              key={name}
              asChild
              variant="ghost"
              className="w-full rounded-none justify-start font-light">
              <Link href={path}>{name}</Link>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
