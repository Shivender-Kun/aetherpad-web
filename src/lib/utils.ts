import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const resizeImageRatio = async (file: File, { type = file.type }) => {
  // Get as image data
  const imageBitmap = await createImageBitmap(file);

  // * If the image is already square, return the original file
  if (imageBitmap.width === imageBitmap.height) return file;

  // Draw to canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const imgWidth = imageBitmap.width;
  const imgHeight = imageBitmap.height;

  // Determine the smaller dimension (for a square crop)
  const smallerDimension = Math.min(imgWidth, imgHeight);

  // Calculate the starting coordinates for the square crop
  const sourceX = (imgWidth - smallerDimension) / 2;
  const sourceY = (imgHeight - smallerDimension) / 2;

  // Set canvas size to the smaller dimension
  canvas.width = smallerDimension;
  canvas.height = smallerDimension;

  if (ctx) {
    // Draw the image to the canvas
    ctx.drawImage(
      imageBitmap,
      sourceX,
      sourceY,
      smallerDimension,
      smallerDimension,
      0,
      0,
      smallerDimension,
      smallerDimension
    );

    // Turn into Blob
    const finalBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, type)
    );

    const newFile = new File([finalBlob as BlobPart], file.name, {
      type: file.type,
      lastModified: new Date().getTime(),
    });

    return newFile;
  }
  return file;
};

export const compressImage = async (
  file: File,
  { quality = 0.85, type = file.type }
) => {
  const resizedImage = await resizeImageRatio(file, { type });

  if (resizedImage.size / 1024 < 512) {
    // If the image is already less than 512KB, return the resized image
    return resizedImage;
  }
  // Get as image data
  const imageBitmap = await createImageBitmap(resizedImage);

  // Draw to canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;

  if (ctx) {
    // Draw the image to the canvas
    ctx.drawImage(imageBitmap, 0, 0);

    // Turn into Blob
    const finalBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, type, quality)
    );

    let newFile = new File([finalBlob as BlobPart], file.name, {
      type: file.type,
      lastModified: new Date().getTime(),
    });

    const newFileSizeinKB = newFile.size / 1024;

    // If the file is still larger than 512KB, recursively call resizeImageRatio
    if (newFileSizeinKB > 512 && quality > 0.1 && file.type !== "image/png") {
      newFile = await compressImage(newFile, {
        quality: Number((quality - 0.1).toFixed(2)),
        type,
      });

      return newFile;
    }
  }
  return file;
};
