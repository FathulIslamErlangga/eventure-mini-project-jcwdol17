'use client';
import "@/css/homePage/categoriesStyle.css";
import { CategoryCard } from "./categoryCard";
import useEvent from "@/hooks/useEvent.hooks";
import { ICategory } from "@/utils/interfaces/interfaces";
import React, { useState, useEffect } from "react";

export function Categories() {
  const { categories } = useEvent();
  const { category } = categories;
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (category?.data) {
        setCategoryList(category?.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
      setIsLoading(false);
    }
  }, [categories]);

  if (isLoading) {
    return (
      <div className="categories">
        <div className="categories-title">
          <div className="ctg-title">
            <span>Categories</span>
          </div>
        </div>
        <div className="categories-content">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories">
        <div className="categories-title">
          <div className="ctg-title">
            <span>Categories</span>
          </div>
        </div>
        <div className="categories-content">{error}</div>
      </div>
    );
  }

  return (
    <div className="categories">
      <div className="categories-title">
        <div className="ctg-title">
          <span>Categories</span>
        </div>
        <div className="ctg-image"></div>
      </div>
      <div className="categories-content">
        {categoryList.map((category: ICategory) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
}
