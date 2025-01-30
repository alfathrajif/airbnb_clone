"use server";

import { supabase } from "@/lib/supabase";
import { ListingType } from "@/types";

export async function getListings(): Promise<ListingType[]> {
  const { data: listings, error } = await supabase.from("listings").select("*, listing_photos(*)");

  if (error) throw new Error(error.message);

  return listings;
}
