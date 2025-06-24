import { useState } from "react";
import ProductDetail from "../../Components/ProductDetail";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "4.5",
    quantity: 1,
    actualPrice: "",
    fakePrice: "",
    colors: [] as string[],
    images: [] as string[],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [viewColorPicker, setColorPicker] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "colors") {
      const updatedColors = [...formData.colors];
      if (typeof index === "number") updatedColors[index] = value;
      setFormData({ ...formData, colors: updatedColors });
    } else if (name === "quantity") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addColorField = () => {
    setColorPicker(true);
    setFormData({ ...formData, colors: [...formData.colors, ""] });
  };

  const removeColorField = () => {
    setColorPicker(false);
    setFormData({ ...formData, colors: [] });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: previews });

    // const previews = files.map((file) => URL.createObjectURL(file));
    // setImagePreviews(previews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);

    // When integrating with Firebase, upload `formData.images` to Storage here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap mx-4">
        <div className="w-2/5 mx-0">
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded shadow space-y-6"
          >
            <h2 className="text-2xl font-bold">
              Add Product - Add product comparission
            </h2>

            <div>
              <label className="block font-medium mb-1">Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description *</label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Multiple Local Image Upload */}
            <div>
              <label className="block font-medium mb-1">Product Images *</label>
              <input
                type="file"
                accept="image/*"
                multiple
                required
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Rating *</label>
              <select
                name="rating"
                required
                value={formData.rating}
                onChange={handleInputChange}
                className="select"
              >
                <option value="5">5 ★</option>
                <option value="4.5">4.5 ★</option>
                <option value="4">4 ★</option>
                <option value="3.5">3.5 ★</option>
                <option value="3">3 ★</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Quantity *</label>
              <input
                type="number"
                name="quantity"
                required
                min={1}
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Actual Price *</label>
              <input
                type="number"
                name="actualPrice"
                min={0}
                value={formData.actualPrice}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Fake Price (%)</label>
              <input
                type="number"
                name="fakePrice"
                min={0}
                value={formData.fakePrice}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {/* {formData.discount && <span className="label pl-0">{parseFloat(formData.price) - (parseFloat(formData.price) * parseFloat(formData.discount)/100)}</span>} */}
            </div>

            {viewColorPicker && (
              <div className="mb-0">
                <label className="block font-medium mb-1">
                  Colors (optional)
                </label>
                {formData.colors.map((color, idx) => (
                  <input
                    key={idx}
                    type="color"
                    name="colors"
                    value={color}
                    onChange={(e) => handleInputChange(e, idx)}
                    className="w-12 h-10 p-1 border border-gray-300 rounded mb-2 mr-2"
                  />
                ))}
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={addColorField}
                className="btn btn-sm mt-2 mr-2"
              >
                + Add Colors
              </button>

              {formData.colors.length > 0 && (
                <button
                  type="button"
                  onClick={removeColorField}
                  className="btn btn-sm mt-2"
                >
                  Clear colors
                </button>
              )}
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
        <div className="w-3/5">
          <ProductDetail
            title={formData.title}
            description={formData.description}
            rating={parseFloat(formData.rating)}
            productQuantity={formData.quantity}
            actualPrice={
              formData.actualPrice ? parseFloat(formData.actualPrice) : 0
            }
            fakePrice={formData.fakePrice ? parseFloat(formData.fakePrice) : 0}
            colors={formData.colors}
            images={formData.images}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
