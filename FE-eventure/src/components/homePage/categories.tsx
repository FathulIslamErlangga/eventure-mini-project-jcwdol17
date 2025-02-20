"use client";
import "@/css/homePage/categoriesStyle.css";
import { CategoryCard } from "./categoryCard";
import useEvent from "@/hooks/useEvent.hooks";
import { ICategory } from "@/utils/interfaces/interfaces";
import React, { useState, useEffect } from "react";
import { CategoryCardSkeleton } from "./categoryCard.skeleton";
import { NoData } from "../noData";

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

  return (
    <div className="categories">
      <div className="categories-title">
        <div className="ctg-title">
          <span>Categories</span>
        </div>
        <div className="ctg-image"></div>
      </div>
      <div className="categories-content">
        {isLoading ? (
          <div className="moreCtg-skeleton-container">
            {[...Array(5)].map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : categoryList.length === 0 ? (
          <>
            <NoData messages="No Categories" />
          </>
        ) : (
          categoryList.map((category: ICategory) => (
            <CategoryCard key={category.id} {...category} />
          ))
        )}
      </div>
    </div>
  );
}
