import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initalValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initalValue === "function") {
        return (initalValue as () => T)();
      } else {
        return initalValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as [T, typeof setValue];
}
