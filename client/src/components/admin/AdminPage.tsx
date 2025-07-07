import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface AdminPageProps {
  title: string;
  children: ReactNode;
  headerAction?: ReactNode;
}

export default function AdminPage({
  title,
  children,
  headerAction,
}: AdminPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {headerAction}
      </div>
      <Toaster position="top-center" />
      <Card className="bg-white dark:bg-gray-800 shadow-md">{children}</Card>
    </div>
  );
}
