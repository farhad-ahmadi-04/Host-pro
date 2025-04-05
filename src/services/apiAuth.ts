import { IUserLogin, IUserSignup } from "@/types/authTypes";
import supabase, { supabaseUrl } from "./supabase";

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

// signup
export const signupApi = async ({ email, password, fullName }: IUserSignup) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

// Update the user profile
export const updateCurrentUser = async ({
  avatar,
  fullName,
  password,
}: {
  avatar?: File | null;
  fullName?: string;
  password?: string;
}) => {
  // 1. update password or fullName
  const updateData: { data?: { fullName: string }; password?: string } = {};
  if (password) updateData.password = password;

  if (fullName) updateData.data = { fullName };

  if (Object.keys(updateData).length === 0) {
    throw new Error("No update parameter provided.");
  }
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2.upload avatar image
  const fileName = `avatar-${avatar.lastModified}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. update avatar in the user
  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  console.log(supabaseUrl);

  if (error2) throw new Error(error2.message);
  return updateUser;
};
