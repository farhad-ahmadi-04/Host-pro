import { PAGE_SIZE } from "@/lib/utils";
import supabase from "@/services/supabase";

interface getBookingsProps {
  page: number;
  filter: { field: string; value: string } | null;
}

export const getBookings = async ({ page, filter }: getBookingsProps) => {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

  // filter
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  // pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error("failed to get bookings");

  return { data, error, count };
};
