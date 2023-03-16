import { ReactNode, useEffect, useRef } from "react";
export function useClickOutside(handler: () => void) {
  let domNode = useRef<any>();
  useEffect(
    function () {
      function maybeHandler(event: Event) {
        if (domNode.current && !domNode.current.contains(event.target))
          handler();
      }
      document.addEventListener("mousedown", maybeHandler);
      return function () {
        document.removeEventListener("mousedown", maybeHandler);
      };
    },
    [handler]
  );
  return domNode;
}

// Hook that closes the modal or menu when clicked outside of their reference.
