import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Overlay = ({ children }) => {
  const elementRef = useRef(null);

  if (!elementRef.current) {
    elementRef.current = document.createElement("div");
  }

  useEffect(() => {
    const overlayRoot = document.getElementById("overlay");
    overlayRoot.appendChild(elementRef.current);

    return () => overlayRoot.removeChild(elementRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elementRef.current);
};

export default Overlay;
