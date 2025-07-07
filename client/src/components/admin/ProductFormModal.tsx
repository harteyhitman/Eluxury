"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Input, TextArea, Select } from "@/components/ui/form";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";
import { X } from "lucide-react";
import { uploadFiles } from "@/lib/uploadFile";
import { useCategoryStore } from "@/stores/categoryStore";

export interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  initialData?: ProductFormData;
}

export interface ProductFormData {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  images: string[];
  salePrice: number;
  category: string;
  brand: { id: string; name: string };
  sku: string;
  specifications: Record<string, string>;
}

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  category: "",
  stock: 0,
  images: [],
  brand: { id: "", name: "" },
  sku: "",
  isActive: true,
  specifications: {},
  salePrice: 0,
};

export default function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const { showToast } = useToast();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formattedData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        sku: formData.sku,
        salePrice: Number(formData.salePrice),
        isActive: formData.isActive,
        specifications: formData.specifications,
        images: formData.images,
        brand: formData.brand,
      };

      await onSubmit(formattedData);
      showToast(
        `Product ${initialData ? "updated" : "created"} successfully!`,
        "success",
      );
      onClose();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      showToast(
        `Failed to ${
          initialData ? "update" : "create"
        } product: ${errorMessage}`,
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "salePrice"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    try {
      const sessionId = Math.random().toString(36).substring(2, 15);
      const { urls } = await uploadFiles(files, sessionId);

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images ?? []), ...urls],
      }));

    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to upload images",
        "error",
      );
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onCloseAction={onClose}
      title={initialData ? "Edit Product" : "Create Product"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
            <Input
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories.map(cat => ({
              value: cat.id,
              label: cat.name
            }))}
            required
          />

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Images
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <Image
                      src={url}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <label className="aspect-square relative rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <div className="text-center p-4">
                  <div className="text-gray-500 dark:text-gray-400 font-medium">
                    {uploadingImages ? "Uploading..." : "Add Image"}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    PNG, JPG up to 5MB
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  disabled={uploadingImages}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
