import { storage, db } from "../../src/Firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import type { ProductDetailProps } from "../Services/types";

const productRef = collection(db, "products");

export const handleImageUploadToServer = async (files: File[]): Promise<string[]> => {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        uploadedUrls.push(data.secure_url);
      }
    } catch (error) {
      console.error("Upload failed for file:", file.name, error);
    }
  }

  return uploadedUrls;
};



export const addProduct = async (product: ProductDetailProps) => {
  try {
    const cleanObject = JSON.parse(JSON.stringify(product));
    console.log("cleanObject",cleanObject);
  await addDoc(productRef, cleanObject);
} catch (error) {
  console.error("Firestore error:", error);
}

};

export const uploadImagesTest = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];

  for (const file of files) {
    const imageRef = ref(storage, `products/${file.name}-${Date.now()}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    urls.push(downloadURL);
  }

  return urls;
};