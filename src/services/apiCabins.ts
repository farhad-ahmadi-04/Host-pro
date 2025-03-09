import { PAGE_SIZE } from "@/lib/utils";
import supabase from "./supabase";

export const getCabins = async ({ page }: { page: number }) => {
  // get data from cabins
  let query = supabase.from("cabins").select("*", { count: "exact" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  // handle errors
  if (error) {
    throw new Error("Failed to fetch cabins");
  }
  // return data and error
  return { data, error, count };
};
