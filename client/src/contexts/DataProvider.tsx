import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Activity, Booking, Stay, Transport, Product, BlogPost, MapLocation } from "@/data/mockData";
import * as api from "@/services/api";

type DataContextType = {
  activities: Activity[];
  bookings: Booking[];
  stays: Stay[];
  transport: Transport[];
  products: Product[];
  blogPosts: BlogPost[];
  mapLocations: MapLocation[];
  loading: boolean;
  addActivity: (a: Omit<Activity, "id">) => Promise<void>;
  updateActivity: (id: string, a: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  addBooking: (b: Omit<Booking, "id">) => Promise<void>;
  addProduct: (p: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
  addBlogPost: (bp: Omit<BlogPost, "id">) => void;
  addMapLocation: (ml: Omit<MapLocation, "id">) => Promise<void>;
  deleteMapLocation: (id: string) => Promise<void>;
};

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stays, setStays] = useState<Stay[]>([]);
  const [transport, setTransport] = useState<Transport[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [mapLocations, setMapLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);

  // MongoDB returns _id — normalize it to id for the whole app
  const normalize = (doc: any) => ({ 
    ...doc, 
    id: doc._id ?? doc.id,
    image: doc.image ?? doc.images?.[0]
  });

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [acts, bks, sts, trs, prs, blgs, mlgs] = await Promise.all([
          api.fetchActivities(),
          api.fetchBookings(),
          api.fetchStays(),
          api.fetchTransports(),
          api.fetchProducts(),
          api.fetchBlogs(),
          api.fetchMapLocations()
        ]);
        setActivities(acts.data.map(normalize));
        setBookings(bks.data.map(normalize));
        setStays(sts.data.map(normalize));
        setTransport(trs.data.map(normalize));
        setProducts(prs.data.map(normalize));
        setBlogPosts(blgs.data.map(normalize));
        setMapLocations(mlgs.data.map(normalize));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const addActivity = async (a: Omit<Activity, "id">) => {
    try {
      const res = await api.createActivity(a);
      setActivities((prev) => [...prev, normalize(res.data)]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateActivity = async (id: string, data: Partial<Activity>) => {
    try {
      const resp = await api.updateActivity(id, data);
      const updated = normalize(resp.data);
      setActivities((prev) => prev.map((a) => (a.id === id || (a as any)._id === id ? updated : a)));
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  };
  const deleteActivity = (id: string) => setActivities((prev) => prev.filter((a) => a.id !== id));

  const addBooking = async (b: Omit<Booking, "id">) => {
    try {
      const res = await api.createBooking(b);
      setBookings((prev) => [...prev, normalize(res.data)]);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = (p: Omit<Product, "id">) => setProducts((prev) => [...prev, { ...p, id: `pr_${Date.now()}` } as any]);
  const deleteProduct = (id: string) => setProducts((prev) => prev.filter((p) => p.id !== id));
  const addBlogPost = async (bp: Omit<BlogPost, "id">) => {
    try {
      const res = await api.createBlog(bp);
      setBlogPosts((prev) => [normalize(res.data), ...prev]);
    } catch (error) {
      console.error("Failed to add blog post:", error);
    }
  };

  const addMapLocation = async (ml: Omit<MapLocation, "id">) => {
    try {
      const res = await api.createMapLocation(ml);
      setMapLocations(prev => [...prev, normalize(res.data)]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMapLocation = async (id: string) => {
    try {
      await api.deleteMapLocation(id);
      setMapLocations(prev => prev.filter(l => (l.id !== id && (l as any)._id !== id)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DataContext.Provider value={{
      activities, bookings, stays, transport, products, blogPosts, mapLocations, loading,
      addActivity, updateActivity, deleteActivity, addBooking, addProduct, deleteProduct, addBlogPost,
      addMapLocation, deleteMapLocation
    }}>
      {children}
    </DataContext.Provider>
  );
};
