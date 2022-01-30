import { getSupabaseClient } from 'db/DatabaseClient';
import { v4 as uuidv4 } from 'uuid';
/**
 * Retrieves public uploaded image URL from supabase
 */
const getUploadedImageURL = async (imagePath: string, folder:string) => {
  const client = getSupabaseClient();
  const { publicURL, error } = client.storage.from(folder).getPublicUrl(imagePath);

  if (error) {
    throw Error(error?.message);
  }

  if (publicURL) {
    return publicURL;
  }
};

/**
 *uploads selected image to supabase DB and returns the public URL
 */
export const uploadImageToSupabase = async (file: File, folder: string) => {

  const filename = `${uuidv4()}.jpg`;
  
  const client = getSupabaseClient();
  const { data, error } = await client.storage.from(folder).upload(`public/${filename}`, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: 'image/jpg',
  });

  if (error) {
    throw Error(error?.message);
  }

  const path = data?.Key.substr(data?.Key.indexOf('/') + 1);
  if (path) {
    const URL = await getUploadedImageURL(path, folder);
    return URL;
  }
};