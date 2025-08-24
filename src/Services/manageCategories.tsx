import { db } from "../Firebase/firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import type { Category } from "./types";

const categoryRef = collection(db, "categories");

export const createCategory = async (category: Omit<Category, 'id'>) => {
  try {
    const cleanObject = JSON.parse(JSON.stringify(category));
    console.log("categoryObject", cleanObject);
    await addDoc(categoryRef, cleanObject);
    alert("Category created successfully!");
  } catch (error) {
    console.error("Firestore error:", error);
    alert("Failed to create category. Please try again.");
  }
};

export const getAllCategories = async () => {
  try {
    const snapshot = await getDocs(categoryRef);
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[];
    return categories;
  } catch (error) {
    console.error("Firestore error:", error);
  }
};


export const updateCategory = async (id: string, categoryData: Omit<Category, 'id'>) => {
  try {
    const categoryDocRef = doc(db, "categories", id);
    const cleanObject = JSON.parse(JSON.stringify(categoryData));
    console.log("Updating category:", id, cleanObject);
    await updateDoc(categoryDocRef, cleanObject);
    alert("Category updated successfully!");
  } catch (error) {
    console.error("Firestore error:", error);
    alert("Failed to update category. Please try again.");
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const categoryDocRef = doc(db, "categories", id);
    await deleteDoc(categoryDocRef);
    console.log("Category deleted:", id);
    alert("Category deleted successfully!");
  } catch (error) {
    console.error("Firestore error:", error);
    alert("Failed to delete category. Please try again.");
  }
};
