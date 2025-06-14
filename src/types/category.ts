import { CategoriesProps } from "@features/profile/OnboardProfileController";

// src/types/category.ts
export interface Category {
  _id: string;
  interest: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: CategoriesProps[];
}
