import { IsIn, IsObject, IsOptional, IsString } from 'class-validator';

export class UserActivityDto {
  userId: number;
  sessionId: string;
  activityType:
    | 'VIEW_PRODUCT'
    | 'ADD_TO_CART'
    | 'REMOVE_FROM_CART'
    | 'SEARCH'
    | 'VIEW_CATEGORY'
    | 'CHECKOUT'
    | 'PURCHASE'
    | 'PAGE_VIEW'
    | 'LOGIN'
    | 'LOGOUT';
  data: {
    productId?: number;
    productName?: string;
    categoryId?: number;
    categoryName?: string;
    searchQuery?: string;
    quantity?: number;
    price?: number;
    totalAmount?: number;
    page?: string;
    orderId?: number;
    resultsCount?: number;
    cartItemCount?: number;
    [key: string]: any;
  };
  timestamp: Date;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    location?: string;
    sessionDuration?: number;
    referrer?: string;
  };
}

export class ProductViewActivityDto {
  productId: number;
  productName?: string;
  categoryName?: string;
  price?: number;
  viewDuration?: number;
  referrer?: string;
}

export class CartActivityDto {
  productId: number;
  productName?: string;
  quantity: number;
  price: number;
  totalCartValue?: number;
  cartItemCount?: number;
}

export class SearchActivityDto {
  searchQuery: string;
  resultsCount: number;
  categoryFilter?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

const VALID_ACTIVITY_TYPES = [
  'VIEW_PRODUCT',
  'ADD_TO_CART',
  'REMOVE_FROM_CART',
  'VIEW_CATEGORY',
  'SEARCH',
  'LOGIN',
  'LOGOUT',
  'PURCHASE',
  'PAGE_VIEW',
  'PAGE_VIEW_WITH_DURATION',
  'VIEW_PRODUCT_DURATION',
  'ADD_TO_WISHLIST',
  'CHECKOUT',
] as const;

export class TrackActivityDto {
  @IsString()
  @IsIn(VALID_ACTIVITY_TYPES)
  activityType: (typeof VALID_ACTIVITY_TYPES)[number];

  @IsObject()
  data: any;

  @IsOptional()
  @IsString()
  timestamp?: string;
}
