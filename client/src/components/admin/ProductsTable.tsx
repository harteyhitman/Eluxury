"use client";

import { useProductStore } from "@/stores/productStore";
import { Product } from "@/app/actions/admin/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { commaFormatted } from "@/helpers";

export function ProductsTable() {
  const { products, setSelectedProduct, setShowFormModal, deleteProduct } =
    useProductStore();

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowFormModal(true);
  };

  const handleDelete = (product: Product) => {
    deleteProduct(product.id);
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">
            Product
          </th>
          <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">
            SKU
          </th>
          <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">
            Category
          </th>
          <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">
            Brand
          </th>
          <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">
            Price
          </th>
          <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">
            Stock
          </th>
          <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">
            Status
          </th>
          <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <td className="p-4">
              <div className="flex items-center space-x-4">
                {product?.images?.length > 0 && product.images[0] !== "" ? (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500 text-xs">
                      No image
                    </span>
                  </div>
                )}
                <span className="text-gray-900 dark:text-white font-medium">
                  {product.name}
                </span>
              </div>
            </td>
            <td className="p-4 text-gray-900 dark:text-white">{product.sku}</td>
            <td className="p-4 text-gray-900 dark:text-white">
              {product.category.name}
            </td>
            <td className="p-4 text-gray-900 dark:text-white">
              {product.brand?.name || "No Brand"}
            </td>
            <td className="p-4 text-gray-900 dark:text-white font-medium">
              ₦{commaFormatted(product.price)}
            </td>
            <td className="p-4 text-gray-900 dark:text-white">
              {commaFormatted(product.stock)}
            </td>
            <td className="p-4">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.isActive
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                }`}
              >
                {product.isActive ? "Active" : "Draft"}
              </span>
            </td>
            <td className="p-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(product)}
                  className="text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                  onClick={() => handleDelete(product)}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
