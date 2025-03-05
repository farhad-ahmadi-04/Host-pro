import supabase from "./supabase";

export const getCabins = async () => {
  // get data from cabins
  const { data, error } = await supabase.from("cabins").select("*");
  // handle errors
  if (error) {
    throw new Error("Failed to fetch cabins");
  }
  // return data and error
  return data;
};
