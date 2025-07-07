"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { X } from "lucide-react";
import { CreateProductData } from "@/app/actions/admin/product";
import { uploadFiles } from "@/lib/uploadFile";

interface ProductFormData {
  name: string;
  description: string;
  price: string | number;
  stock: string | number;
  category: string;
  salePrice: string | number;
  isActive: boolean;
  sku: string;
  specifications: Record<string, string | number | boolean>;
  images: string[];
  brand: { id: string; name: string };
  id?: string;
}

const initialFormState: ProductFormData = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  salePrice: "",
  isActive: true,
  sku: "",
  specifications: {},
  images: [],
  brand: { id: "", name: "" },
};

interface AddProductFormProps {
  onCancelAction: () => void;
  onSuccessAction: () => void;
  editingProduct?: ProductFormData;
}

export const AddProductForm = ({
  onCancelAction,
  onSuccessAction,
  editingProduct,
}: AddProductFormProps) => {
  const { categories } = useCategoryStore();
  const { addProduct, updateProduct, productBrands, fetchProductsBrands } =
    useProductStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(
    editingProduct || initialFormState,
  );
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (productBrands.length < 1) {
      fetchProductsBrands();
    }
  }, [fetchProductsBrands, productBrands]);

  const handleInputChange = (
    field: keyof ProductFormData,
    value: string | number | boolean,
  ) => {
    if (field === "price" || field === "salePrice" || field === "stock") {
      if (
        value === "" ||
        (typeof value === "string" && value.startsWith("0"))
      ) {
        setFormData((prev) => ({ ...prev, [field]: value }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    } else if (field === "brand") {
      const selectedBrand = productBrands.find((brand) => brand.name === value);
      setFormData((prev) => ({
        ...prev,
        brand: selectedBrand || { id: "", name: "" },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
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
      toast.error(
        error instanceof Error ? error.message : "Failed to upload images",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formattedData: CreateProductData = {
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

    if (editingProduct?.id) {
      const { success, error } = await updateProduct(
        editingProduct.id,
        formattedData,
      );
      if (success) {
        onSuccessAction();
      }
      if (!success && error) throw new Error(error);
    } else {
      const { success, error } = await addProduct(formattedData);
      if (success) {
        onSuccessAction();
      }
      if (!success && error) throw new Error(error);
    }
  };

  const formFields = [
    {
      id: "name",
      label: "Product Name",
      type: "text",
      value: formData.name,
      required: true,
    },
    {
      id: "sku",
      label: "SKU",
      type: "text",
      value: formData.sku,
      required: true,
    },
    {
      id: "price",
      label: "Price",
      type: "number",
      value: formData.price,
      required: true,
    },
    {
      id: "salePrice",
      label: "Sale Price",
      type: "number",
      value: formData.salePrice,
      required: true,
    },
    {
      id: "stock",
      label: "Stock",
      type: "number",
      value: formData.stock,
      required: true,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type={field.type}
              value={field.value}
              onChange={(e) =>
                handleInputChange(
                  field.id as keyof ProductFormData,
                  field.type === "number"
                    ? Number(e.target.value)
                    : e.target.value,
                )
              }
              required={field.required}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 cursor-pointer"
            />
          </div>
        ))}

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 cursor-pointer">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700">
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.name}
                  className="text-gray-900 dark:text-white cursor-pointer"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Select
            value={formData.brand?.name || ""}
            onValueChange={(value) => handleInputChange("brand", value)}
          >
            <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 cursor-pointer">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700">
              {productBrands.map((brand) => (
                <SelectItem
                  key={brand.id}
                  value={brand.name}
                  className="text-gray-900 dark:text-white cursor-pointer"
                >
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.isActive ? "true" : "false"}
            onValueChange={(value) =>
              handleInputChange("isActive", value === "true")
            }
          >
            <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 cursor-pointer">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700">
              <SelectItem
                value="true"
                className="text-gray-900 dark:text-white cursor-pointer"
              >
                Active
              </SelectItem>
              <SelectItem
                value="false"
                className="text-gray-900 dark:text-white cursor-pointer"
              >
                Draft
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 w-full">
        <Label className="text-gray-900 dark:text-white text-lg font-semibold">
          Product Images
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {(formData.images ?? []).map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
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

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          required
          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 min-h-[100px]"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancelAction}
          className="text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 cursor-pointer"
        >
          {loading
            ? "Saving..."
            : editingProduct
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default AddProductForm;
