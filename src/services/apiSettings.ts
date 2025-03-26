import { ISettings, IUpdateSettings } from "@/types/seetings";
import supabase from "./supabase";

export const getSettings = async (): Promise<ISettings> => {
  const { data, error } = await supabase.from("settings").select("*");

  if (error) throw new Error(error.message);

  return data[0];
};

export const updateSettingsApi = async (value: IUpdateSettings) => {
  const { data, error } = await supabase
    .from("settings")
    .update({ [value.field]: value.formattedValue })
    .eq("id", 1)
    .select();

  if (error) throw new Error(error.message);

  return data;
};
