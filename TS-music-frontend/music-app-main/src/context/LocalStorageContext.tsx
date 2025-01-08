// context/LocalStorageContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

interface LocalStorageContextType {
  getItem: <T>(key: string, defaultValue: T) => T;
  setItem: <T>(key: string, value: T) => void;
  removeItem: (key: string) => void;
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(
  undefined
);

export const LocalStorageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getItem = <T,>(key: string, defaultValue: T): T => {
    try {
      if (!key || typeof window === "undefined") {
        return defaultValue;
      }
      // console.log(key);
      const item = window.localStorage.getItem(key);
      // console.log("context");
      // console.log(typeof item);
      // console.log(item);

      if (
        !item ||
        item === "undefined" ||
        item === "null" ||
        item.trim() === ""
      ) {
        // console.log("masuk");
        return defaultValue;
      }

      return JSON.parse(item);
    } catch (error) {
      console.error(`Error getting local storage item: ${key}`, error);
      return defaultValue;
    }
  };

  const setItem = <T,>(key: string, value: T): void => {
    try {
      // console.log("set item");
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting local storage item: ${key}`, error); // Corrected message
    }
  };

  const removeItem = (key: string): void => {
    try {
      // console.log("remove item");
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing local storage item: ${key}`, error);
    }
  };

  return (
    <LocalStorageContext.Provider value={{ getItem, setItem, removeItem }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorage = (): LocalStorageContextType => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error(
      "useLocalStorage must be used within a LocalStorageProvider"
    );
  }
  return context;
};
