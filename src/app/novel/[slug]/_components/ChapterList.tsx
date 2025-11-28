"use client";

import { useState } from "react";
import Link from "next/link";
import { type Novel, type Chapter } from "@/lib/data";
import { useUser } from "@/contexts/UserContext";
import { UnlockChapterDialog } from "@/components/novel/UnlockChapterDialog";
import { Lock, Unlock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChapterList({ novel }: { novel: Novel }) {
  const { unlockChapter, isChapterUnlocked } = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const handleUnlockClick = (chapter: Chapter) => {
    if (!chapter.isLocked || isChapterUnlocked(chapter.id)) {
      // This case should be handled by the Link, but as a fallback.
      return;
    }
    setSelectedChapter(chapter);
    setDialogOpen(true);
  };

  const handleConfirmUnlock = () => {
    if (selectedChapter) {
      unlockChapter(selectedChapter.id, selectedChapter.cost);
      setSelectedChapter(null);
    }
    setDialogOpen(false);
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <ul className="divide-y">
          {novel.chapters.map((chapter) => {
            const unlocked = !chapter.isLocked || isChapterUnlocked(chapter.id);
            const ChapterLinkWrapper = unlocked ? Link : 'div';
            const props = unlocked ? { href: `/novel/${novel.slug}/${chapter.slug}` } : {};

            return (
              <li key={chapter.id}>
                <ChapterLinkWrapper {...props}>
                  <div
                    onClick={() => !unlocked && handleUnlockClick(chapter)}
                    className={cn(
                      "flex items-center justify-between p-4 transition-colors",
                      unlocked ? "hover:bg-accent/10 cursor-pointer" : "cursor-pointer hover:bg-destructive/10"
                    )}
                  >
                    <span className="font-medium">{chapter.title}</span>
                    <div className="flex items-center gap-2 text-sm">
                      {unlocked ? (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <>
                          <span className="text-accent font-semibold">{chapter.cost} Koin</span>
                          <Lock className="h-5 w-5 text-accent" />
                        </>
                      )}
                    </div>
                  </div>
                </ChapterLinkWrapper>
              </li>
            );
          })}
        </ul>
      </div>

      {selectedChapter && (
        <UnlockChapterDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onConfirm={handleConfirmUnlock}
          chapterTitle={selectedChapter.title}
          cost={selectedChapter.cost}
        />
      )}
    </>
  );
}
