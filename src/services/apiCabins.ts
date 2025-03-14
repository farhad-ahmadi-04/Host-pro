import { PAGE_SIZE } from "@/lib/utils";
import supabase, { supabaseUrl } from "./supabase";
import { INewCabinData } from "@/features/cabins/useEditCabin";

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

// delete cabin row
export const deleteCabinApi = async (id: number | undefined) => {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabins could not be deleted");

  return data;
};

// create cabin row
export const createEditCabin = async (newCabin: INewCabinData, id?: number) => {
  // imageValue: get the image URL if it's a string, otherwise get the image name
  const imageValue =
    typeof newCabin.image === "string" ? newCabin.image : newCabin.image?.name;

  // hasImagePath: check if imageValue starts with the Supabase URL (i.e., image is already hosted)
  const hasImagePath = imageValue.startsWith(supabaseUrl);

  // imageName: generate a unique name for the image by prefixing with a random number
  const imageName =
    typeof newCabin.image === "string"
      ? `${Math.random()}-${newCabin.image}`
      : `${Math.random()}-${newCabin.image.name}`.split("/").join("");

  // imagePath: set the final image path; if the image is already hosted, use it directly, otherwise construct the storage URL
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // Example URL: https://your-supabase-url/storage/v1/object/public/cabin-images/cabin-001.jpg

  // data and error: placeholders for the result and error from the database query
  let data, error;
  if (!id) {
    // For creating a new cabin: insert a new record with newCabin data and the computed imagePath
    const query = supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }]);
    // Execute the insert query and destructure the result
    ({ data, error } = await query.select().single());
  } else {
    // For updating an existing cabin: update the record that matches the provided id
    const query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
    // Execute the update query and destructure the result
    ({ data, error } = await query.select().single());
  }

  // If there was an error with the database operation, log it and throw an error
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

  // If the image is already hosted (hasImagePath is true), no need to upload, so return the fetched data directly
  if (hasImagePath) return data;

  // storageError: result from attempting to upload the image to Supabase storage
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  console.log(newCabin.image); // Log the image details for debugging

  // If there is an error during image upload, delete the cabin record and throw an error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id); // Remove the cabin record due to upload failure
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not create"
    );
  }

  // Return the successfully created or updated cabin data
  return data;
};
