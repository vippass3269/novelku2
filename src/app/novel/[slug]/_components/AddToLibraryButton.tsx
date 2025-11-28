"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";

export default function AddToLibraryButton({ novelSlug }: { novelSlug: string }) {
  const { addToLibrary, removeFromLibrary, isNovelInLibrary } = useUser();
  const [isInLibrary, setIsInLibrary] = useState(false);

  useEffect(() => {
    setIsInLibrary(isNovelInLibrary(novelSlug));
  }, [isNovelInLibrary, novelSlug]);

  const handleToggleLibrary = () => {
    if (isInLibrary) {
      removeFromLibrary(novelSlug);
      setIsInLibrary(false);
    } else {
      addToLibrary(novelSlug);
      setIsInLibrary(true);
    }
  };

  return (
    <Button 
      onClick={handleToggleLibrary}
      variant={isInLibrary ? "outline" : "default"}
      className="w-full mt-4 bg-primary text-primary-foreground"
    >
      {isInLibrary ? (
        <>
          <BookmarkCheck className="mr-2 h-4 w-4" />
          Di Pustaka
        </>
      ) : (
        <>
          <Bookmark className="mr-2 h-4 w-4" />
          Tambahkan ke Pustaka
        </>
      )}
    </Button>
  );
}
