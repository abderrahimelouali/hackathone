import { 
  initialActivities, 
  initialStays, 
  initialTransport, 
  initialProducts, 
  blogPosts, 
  mapLocations 
} from '../data/mockData';

const wrap = <T>(data: T): Promise<{ data: T }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, 300); // Simulate network latency
  });
};

export const fetchActivities = () => wrap(initialActivities);
export const fetchBookings = () => wrap(JSON.parse(localStorage.getItem('experiencia_bookings') || '[]'));
export const fetchStays = () => wrap(initialStays);
export const fetchTransports = () => wrap(initialTransport);
export const fetchProducts = () => wrap(initialProducts);
export const fetchBlogs = () => wrap(blogPosts);
export const fetchMapLocations = () => wrap(mapLocations);

export const createActivity = (data: any) => wrap({ ...data, _id: `act_${Date.now()}` });
export const updateActivity = (id: string, data: any) => wrap({ ...data, _id: id });
export const createBooking = (data: any) => {
  const bookings = JSON.parse(localStorage.getItem('experiencia_bookings') || '[]');
  const newBooking = { ...data, _id: `book_${Date.now()}`, status: "مؤكد" };
  bookings.push(newBooking);
  localStorage.setItem('experiencia_bookings', JSON.stringify(bookings));
  return wrap(newBooking);
};
export const createBlog = (data: any) => wrap({ ...data, _id: `blog_${Date.now()}` });
export const createMapLocation = (data: any) => wrap({ ...data, _id: `map_${Date.now()}` });
export const deleteMapLocation = (id: string) => wrap({ success: true, id });

// Auth Endpoints (Mock)
export const login = (data: any) => {
  const email = data.email.toLowerCase();
  
  // Specific Superadmin Credentials
  if (email === "admin@experiencia.com" && data.password === "admin123") {
    return wrap({
      _id: "admin123",
      name: "Super Admin",
      email: data.email,
      role: "superAdmin",
      token: "fake-jwt-token"
    });
  }

  const isHost = email.includes("host");
  const isAdmin = email.includes("admin");
  
  const mockUser = {
    _id: isHost ? "host123" : isAdmin ? "admin123" : "user123",
    name: isHost ? "Local Host" : isAdmin ? "Super Admin" : "Tinghir Traveler",
    email: data.email,
    role: isHost ? "host" : isAdmin ? "superAdmin" : "tourist",
    token: "fake-jwt-token"
  };
  return wrap(mockUser);
};

export const register = (data: any) => {
  // Always return requiresVerification for the demo
  return wrap({
    requiresVerification: true,
    email: data.email,
    name: data.name,
    role: data.role || "tourist"
  });
};

export const verifyOTP = (data: { email: string, code: string }) => {
    // ANY CODE PASSES
    const email = data.email.toLowerCase();
    const isHost = email.includes("host");
    const isAdmin = email.includes("admin");

    return wrap({
        token: "fake-jwt-token",
        _id: isHost ? "host123" : isAdmin ? "admin123" : "user123",
        name: isHost ? "Local Host" : isAdmin ? "Super Admin" : "Tinghir Traveler",
        email: data.email,
        role: isHost ? "host" : isAdmin ? "superAdmin" : "tourist"
    });
};

export const resendOTP = (data: { email: string }) => wrap({ success: true });
export const getMe = () => {
    const user = JSON.parse(localStorage.getItem('experiencia_user') || 'null');
    return wrap(user);
};

export default {
  fetchActivities,
  fetchBookings,
  fetchStays,
  fetchTransports,
  fetchProducts,
  fetchBlogs,
  fetchMapLocations,
  createActivity,
  updateActivity,
  createBooking,
  createBlog,
  createMapLocation,
  deleteMapLocation,
  login,
  register,
  verifyOTP,
  resendOTP,
  getMe
};
