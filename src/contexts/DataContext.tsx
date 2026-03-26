import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Activity, Booking, Stay, Transport, Product,
  initialActivities, initialStays, initialTransport, initialProducts,
} from "@/data/mockData";

type DataContextType = {
  activities: Activity[];
  bookings: Booking[];
  stays: Stay[];
  transport: Transport[];
  products: Product[];
  addActivity: (a: Omit<Activity, "id">) => void;
  updateActivity: (id: string, a: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  addBooking: (b: Omit<Booking, "id">) => void;
  addProduct: (p: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
};

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

function load<T>(key: string, fallback: T[]): T[] {
  const d = localStorage.getItem(key);
  return d ? JSON.parse(d) : fallback;
}

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>(() => load("ex_activities", initialActivities));
  const [bookings, setBookings] = useState<Booking[]>(() => load("ex_bookings", []));
  const [stays] = useState<Stay[]>(initialStays);
  const [transport] = useState<Transport[]>(initialTransport);
  const [products, setProducts] = useState<Product[]>(() => load("ex_products", initialProducts));

  useEffect(() => { localStorage.setItem("ex_activities", JSON.stringify(activities)); }, [activities]);
  useEffect(() => { localStorage.setItem("ex_bookings", JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem("ex_products", JSON.stringify(products)); }, [products]);

  const addActivity = (a: Omit<Activity, "id">) => setActivities((prev) => [...prev, { ...a, id: `act_${Date.now()}` }]);
  const updateActivity = (id: string, data: Partial<Activity>) => setActivities((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)));
  const deleteActivity = (id: string) => setActivities((prev) => prev.filter((a) => a.id !== id));
  const addBooking = (b: Omit<Booking, "id">) => setBookings((prev) => [...prev, { ...b, id: `bk_${Date.now()}` }]);
  const addProduct = (p: Omit<Product, "id">) => setProducts((prev) => [...prev, { ...p, id: `pr_${Date.now()}` }]);
  const deleteProduct = (id: string) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <DataContext.Provider value={{ activities, bookings, stays, transport, products, addActivity, updateActivity, deleteActivity, addBooking, addProduct, deleteProduct }}>
      {children}
    </DataContext.Provider>
  );
};
