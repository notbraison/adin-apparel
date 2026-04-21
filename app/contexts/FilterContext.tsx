'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type SortBy = 'newest' | 'price-low' | 'price-high' | 'popularity';

interface FilterContextType {
  selectedCategory: string | null;
  selectedSizes: string[];
  priceRange: [number, number];
  sortBy: SortBy;
  
  setCategory: (category: string | null) => void;
  toggleSize: (size: string) => void;
  setSizeFilter: (sizes: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: SortBy) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setCategory] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<SortBy>('newest');

  const toggleSize = useCallback((size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }, []);

  const setSizeFilter = useCallback((sizes: string[]) => {
    setSelectedSizes(sizes);
  }, []);

  const resetFilters = useCallback(() => {
    setCategory(null);
    setSelectedSizes([]);
    setPriceRange([0, 5000]);
    setSortBy('newest');
  }, []);

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        selectedSizes,
        priceRange,
        sortBy,
        setCategory,
        toggleSize,
        setSizeFilter,
        setPriceRange,
        setSortBy,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
