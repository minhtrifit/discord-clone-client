import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const handleFileUpload = async (
  bucket: string,
  folderName: string,
  file: any
) => {
  const ext = file.type.split("/")[1];

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${folderName}/file_${Date.now()}.${ext}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file:", error.message);
    return null;
  } else {
    console.log("File uploaded successfully:", data);
    return data;
  }
};

export const handleFileExtUpload = async (
  bucket: string,
  folderName: string,
  file: any,
  ext: string
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${folderName}/file_${Date.now()}.${ext}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file:", error.message);
    return null;
  } else {
    console.log("File uploaded successfully:", data);
    return data;
  }
};

export const getAllFile = async (name: string) => {
  const { data, error } = await supabase.storage.from(name).list("images", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    console.error("Error get files:", error.message);
  } else {
    const files = data.map((file: any) => {
      return {
        ...file,
        publicUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${name}/images/${file.name}`,
      };
    });

    return files;
  }
};

export const downloadFile = async (
  bucket: string,
  folderName: string,
  fileName: string
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(`${folderName}/${fileName}`);

  if (error) {
    console.error("Error download files:", error.message);
    return { data, status: false };
  } else {
    return { data, status: true };
  }
};

export const getPublicUrl = async (
  bucket: string,
  folderName: string,
  fileName: string
) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(`${folderName}/${fileName}`);

  return data.publicUrl;
};

export const listAllFiles = async (bucket: string, folderName: string) => {
  const { data, error } = await supabase.storage.from(bucket).list(folderName, {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    console.error("Error download files:", error.message);
    return { data, status: false };
  } else {
    return { data, status: true };
  }
};
