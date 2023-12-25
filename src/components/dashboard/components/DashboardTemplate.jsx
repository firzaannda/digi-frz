import { Activity, Box, Receipt } from "lucide-react";
import Link from "next/link";

export const DashboardTemplate = ({ children }) => {
  return (
    <main className="flex h-screen">
      <aside className="border r-2 w-[230px] p-8 flex flex-col justify-between">
        <div>
          <Link href="/dashboard" className="menu">
            <Activity size={15} />
            Dashboard
          </Link>
          <Link href="/dashboard/products" className="menu">
            <Box size={15} />
            Products
          </Link>
          <Link href="/dashboard/products" className="menu">
            <Receipt size={15} />
            Orders
          </Link>
        </div>
        <div>Logout</div>
      </aside>
      <section className="p-8 w-[calc(100vw-230px)]">
        <div className="max-w-5xl m-auto">{children}</div>
      </section>
    </main>
  );
};
