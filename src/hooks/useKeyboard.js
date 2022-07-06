import { useEffect } from "react";

const useKeyboard = (callback, deps = []) => {
  useEffect(() => {
    document.addEventListener("keyup", callback);
    return () => {
      document.removeEventListener("keyup", callback);
    };
  }, [...deps]);
};

export default useKeyboard;
