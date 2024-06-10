import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      // Define the callback function that checks if the pressed key matches the specified key
      function callBack(e) {
        if (e.code === key) {
          action();
          console.log("ESCAPE ");
        }
      }

      // Add the event listener for the 'keydown' event
      document.addEventListener("keydown", callBack);

      // Cleanup function to remove the event listener when the component unmounts or dependencies change
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [action, key] // Dependencies array
  );
}
