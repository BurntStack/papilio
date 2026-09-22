export type FoodCategory = 'all' | 'pizzas' | 'pastas' | 'burgers' | 'pastries' | 'beverages';

export type DietaryTag = 'vegan' | 'vegetarian' | 'gluten-free' | 'popular' | 'signature' | "chef's special";

export interface MenuItem {
  id: string;
  name: string;
  category: 'pizzas' | 'pastas' | 'burgers' | 'pastries' | 'beverages';
  mealTimes: ('breakfast' | 'lunch' | 'dinner' | 'patisserie')[];
  price: number;
  formattedPrice: string;
  description: string;
  ingredients?: string[];
  dietaryTags: DietaryTag[];
  image: string;
  rating: number;
  reviewsCount: number;
  isChefSpecial?: boolean;
  isSignature?: boolean;
  isPopular?: boolean;
  calories?: string;
  prepTime?: string;
}

export interface ReviewItem {
  id: string;
  guestName: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  source: string;
  reviewText: string;
  recommendedDishes?: string[];
  verified: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'indoor-calm' | 'botanical-patio' | 'lounge';
  occasion: string;
  specialRequests?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ambiance' | 'patisserie' | 'culinary';
  image: string;
  caption: string;
}
