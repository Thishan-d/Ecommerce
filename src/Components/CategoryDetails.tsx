import { useState, useEffect } from "react";
import { Pencil, Trash2, ClipboardPlus, BookCheck } from "lucide-react";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "../Services/manageCategories";
import type { Category } from "../Services/types";
// optional: install lucide-react for icons

const CategoryDetails = () => {
  // Remove the id field - Firestore will auto-generate it
  const [newProductCategory, setCategoryData] = useState({ name: "" });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditEnabled, setEditEnabled] = useState<boolean>(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await getAllCategories();
        if (fetchedCategories) {
          setCategories(fetchedCategories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateCategory(id, newProductCategory);
      // Refresh the categories list after updating
      const updatedCategories = await getAllCategories();
      if (updatedCategories) {
        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      try {
        await deleteCategory(id);
        // Refresh the categories list after deleting
        const updatedCategories = await getAllCategories();
        if (updatedCategories) {
          setCategories(updatedCategories);
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("submit clicked");
    e.preventDefault();
    if (isEditEnabled && editingCategoryId) {
      console.log("Inside if - updating category");
      try {
        await handleUpdate(editingCategoryId);
        setEditEnabled(false);
        setEditingCategoryId(null);
        setCategoryData({ name: "" });
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      try {
        await createCategory(newProductCategory);
        // Refresh the categories list after adding
        const updatedCategories = await getAllCategories();
        if (updatedCategories) {
          setCategories(updatedCategories);
        }
        setCategoryData({ name: "" });
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }
  };

  const editClicked = (id: string) => {
    setEditEnabled(true);
    setEditingCategoryId(id);
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setCategoryData({ name: category.name });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-sm font-semibold opacity-70 tracking-wide">
          Product Categories
        </li>

        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded shadow space-y-6"
        >
          <div>
            <label className="block font-medium mb-1">Category Name *</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                required
                value={newProductCategory.name}
                onChange={handleInputChange}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
              {isEditEnabled && (
                <button type="submit" className="btn btn-warning">
                  <BookCheck size={18} />
                </button>
              )}

              {!isEditEnabled && (
                <button type="submit" className="btn btn-success">
                  <ClipboardPlus size={18} />
                </button>
              )}
            </div>
          </div>
        </form>
        {categories.map((category, index) => (
          <li key={category.id} className="list-row items-center gap-2">
            <div className="text-2xl font-thin opacity-30 tabular-nums w-8">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="list-col-grow">
              <div className="font-medium"> {category.name} </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                ID: {category.id}
              </div>
            </div>

            <button
              onClick={() => editClicked(category.id)}
              className="btn btn-square btn-ghost"
              title="Edit"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => handleDelete(category.id)}
              className="btn btn-square btn-ghost text-error"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDetails;
