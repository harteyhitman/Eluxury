import AdminPage from "@/components/admin/AdminPage";

interface ProductSkeletonProps {
  rowCount?: number;
}

export default function ProductSkeleton({ rowCount = 5 }: ProductSkeletonProps) {
  return (
    <AdminPage title="Products">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
       
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">Product</th>
                <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">SKU</th>
                <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">Category</th>
                <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">Brand</th>
                <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">Price</th>
                <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">Stock</th>
                <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">Status</th>
                <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(rowCount)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </td>
                  <td className="p-4">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPage>
  );
} 