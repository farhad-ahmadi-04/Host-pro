import { PAGE_SIZE } from "@/lib/utils";
import supabase from "./supabase";

interface getCabinsProps {
  page: number;
  filter: { field: string; value: string } | null;
}

export const getCabins = async ({ page, filter }: getCabinsProps) => {
  // get data from cabins
  let query = supabase.from("cabins").select("*", { count: "exact" });

  // filter
  if (filter) {
    if (filter.value === "with-discount") query = query.gt(filter.field, "0");
    if (filter.value === "no-discount") query = query.eq(filter.field, "0");
  }

  // pagination
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
