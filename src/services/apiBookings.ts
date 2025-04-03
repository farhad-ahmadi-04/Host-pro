import { BreakfastOptions } from "@/features/check-in-out/checkIn";
import { getToday, PAGE_SIZE } from "@/lib/utils";
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

// update booking information
export const UpdateBooking = async (
  id: number,
  obj: { status: string; isPaid: boolean; breakfast?: BreakfastOptions }
) => {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select();

  if (error) throw new Error("Failed to update booking...");

  return { data };
};

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export const getBookingAfterDate = async (date: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
};

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday({}));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<IBooking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday(
        {}
      )}),and(status.eq.checked-in,endDate.eq.${getToday({})})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}
