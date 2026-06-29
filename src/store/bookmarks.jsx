import { createContext, useState, useEffect } from "react";

export const BookmarksContext = createContext({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  isBookmarked: () => false,
});

export default function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(stored);
  }, []);

  const addBookmark = (resource) => {
    const updated = [...bookmarks, resource];
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const removeBookmark = (url) => {
    const updated = bookmarks.filter((b) => b.url !== url);
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const isBookmarked = (url) => bookmarks.some((b) => b.url === url);

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
}
