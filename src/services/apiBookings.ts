import supabase from "@/services/supabase";

export const getBookings = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)");

  if (error) throw new Error("failed to get bookings");

  return { data, error };
};
