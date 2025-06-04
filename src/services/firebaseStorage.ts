import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadImage = async (
  file: File,
  fileName: string,
  prefix: "profile-picture" | "cover-picture"
) => {
  const imageRef = ref(storage, `${prefix}/${fileName}`);

  try {
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImage;

export const deleteImage = async (
  fileName: string,
  prefix: "profile-picture" | "cover-picture"
) => {
  const imageRef = ref(storage, `${prefix}/${fileName}`);

  try {
    await deleteObject(imageRef);
    // console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
