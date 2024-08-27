"use client";
export const cnvrtImgUrl=(photo: any)=> {
    return `data:image/jpeg;base64,${photo}`;
  }
export  const loadJQuery = async () => {
    // Dynamic import of jQuery
    const jquery = await import("jquery");
    // Ensure to return the jQuery '$' function
    return jquery.default;
  };
