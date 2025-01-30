import Navbar from "@/components/navbar";
import Listings from "@/components/listings";
import { getListings } from "@/actions/listings";

export default async function Home() {
  const listings = await getListings();

  return (
    <>
      <Navbar />
      <Listings listings={listings} />
    </>
  );
}
