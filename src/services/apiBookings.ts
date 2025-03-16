import { PAGE_SIZE } from "@/lib/utils";
import supabase from "@/services/supabase";
import { IBooking } from "@/types/bookingTypes";

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

// get booking details
export const getBooking = async (bookingId: number): Promise<IBooking> => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", bookingId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
};

// delete booking
export const deleteBookingApi = async (id: number) => {
  const { error, data } = await supabase.from("bookings").delete().eq("id", id);

  if (error) throw new Error("Failed to deleting booking...");

  return data;
};
