"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentSales = [
  {
    name: "John Doe",
    email: "john@example.com",
    amount: "$250.00",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    amount: "$499.00",
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    amount: "$199.00",
  },
  {
    name: "Sarah Williams",
    email: "sarah@example.com",
    amount: "$349.00",
  },
  {
    name: "David Brown",
    email: "david@example.com",
    amount: "$599.00",
  },
];

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt={sale.name} />
            <AvatarFallback>
              {sale.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
}
