import { IUserLogin } from "@/types/authTypes";
import supabase from "./supabase";

export const userLogin = async ({ email, password }: IUserLogin) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};
