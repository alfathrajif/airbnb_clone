import { getListings } from "@/actions/listings";
import Listings from "@/components/listings";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import { Suspense } from "react";

export default async function Home() {
  const listings = await getListings();

  return (
    <>
      <Header />
      <Suspense>
        <Navigation />
      </Suspense>
      <Listings listings={listings} />
    </>
  );
}
