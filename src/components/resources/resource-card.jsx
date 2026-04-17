import React, { useContext, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BookmarksContext } from "@/contexts/bookmarks-context";
import ResourceTags from "@/components/resources/resource-tags";

function ResourceCard({ name, url, imageUrl, tags = [], badges = [] }) {
  const { addBookmark, removeBookmark, isBookmarked } =
    useContext(BookmarksContext);
  const bookmarked = isBookmarked(url);
  const safeImageUrl = imageUrl?.trim();

  const randomSeed = useMemo(
    () =>
      Math.random().toString(36).slice(2) ||
      `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    []
  );

  const randomFallbackUrl = useMemo(
    () => `https://picsum.photos/seed/${randomSeed}/1280/740`,
    [randomSeed]
  );

  const finalFallbackSvg = useMemo(() => {
    const encodedName = encodeURIComponent(name || "Resource Preview");
    return `data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='1280' height='740' viewBox='0 0 1280 740'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23e5e7eb'/><stop offset='100%' stop-color='%23cbd5e1'/></linearGradient></defs><rect width='1280' height='740' fill='url(%23g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23334155' font-family='Arial, sans-serif' font-size='48'>${encodedName}</text></svg>`;
  }, [name]);

  const [imgSrc, setImgSrc] = useState(safeImageUrl || randomFallbackUrl);
  const [hasTriedRandomFallback, setHasTriedRandomFallback] = useState(
    !safeImageUrl
  );

  useEffect(() => {
    setImgSrc(safeImageUrl || randomFallbackUrl);
    setHasTriedRandomFallback(!safeImageUrl);
  }, [safeImageUrl, randomFallbackUrl]);

  const handleBookmark = (e) => {
    e.preventDefault();
    if (bookmarked) {
      removeBookmark(url);
      toast.warning("Bookmark removed", {
        description: `${name} removed from favorites.`,
      });
    } else {
      addBookmark({ name, url, imageUrl, tags, badges });
      toast.success("Bookmarked!", {
        description: `${name} added to favorites.`,
      });
    }
  };

  const handleImageError = () => {
    if (!hasTriedRandomFallback) {
      setImgSrc(randomFallbackUrl);
      setHasTriedRandomFallback(true);
      return;
    }

    setImgSrc(finalFallbackSvg);
  };

  return (
    <Card className="relative rounded-lg hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full w-full p-0">
      {/* Bookmark */}
      <Button
        size="icon-sm"
        onClick={handleBookmark}
        title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
        className={`absolute top-3 right-3 transition-transform duration-150 active:scale-90 ${
          bookmarked
            ? "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/40 dark:hover:bg-yellow-900/60"
            : "bg-secondary hover:bg-secondary/80"
        }`}
      >
        <Bookmark
          className={`transition-colors duration-200 ${
            bookmarked
              ? "fill-yellow-500 text-yellow-500"
              : "fill-transparent text-foreground"
          }`}
        />
      </Button>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full"
      >
        {/* Image */}
        <CardContent className="w-full rounded-lg p-2 aspect-video overflow-hidden">
          <img
            src={imgSrc}
            alt={name}
            onError={handleImageError}
            className="w-full h-full object-cover bg-muted rounded"
            loading="lazy"
          />
        </CardContent>

        {/* Content */}
        <div className="p-4 flex flex-1 flex-col gap-4 justify-start">
          <CardTitle className="text-base font-semibold">{name}</CardTitle>
          <ResourceTags tags={tags} badges={badges} />
        </div>
      </a>
    </Card>
  );
}

export default React.memo(ResourceCard);
