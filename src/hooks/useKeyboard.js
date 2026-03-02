import { useEffect } from "react";

const useKeyboard = (callback: (e: KeyboardEvent) => void, deps: any[] = []) => {
  useEffect(() => {
    document.addEventListener("keyup", callback);
    return () => {
      document.removeEventListener("keyup", callback);
    };
  }, [...deps]);
};

export default useKeyboard;
