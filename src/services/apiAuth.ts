import { IUserLogin } from "@/types/authTypes";
import supabase from "./supabase";

// login
export const userLogin = async ({ email, password }: IUserLogin) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

// get current user
export const getCurrentUser = async () => {
  // get current user from localstorage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // if not in localstorage get current user
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

// logout
export const logoutApi = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
