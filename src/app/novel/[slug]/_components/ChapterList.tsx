"use client";

import { useState } from "react";
import Link from "next/link";
import { type Novel, type Chapter } from "@/lib/data";
import { useUser } from "@/contexts/UserContext";
import { UnlockChapterDialog } from "@/components/novel/UnlockChapterDialog";
import { Lock, Unlock, ChevronRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChapterList({ novel }: { novel: Novel }) {
  const { unlockChapter, isChapterUnlocked, coins } = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const handleUnlockClick = (chapter: Chapter, chapterIndex: number) => {
    // Free novels don't need unlocking
    if (novel.isFree) return;
    
    const isLocked = chapterIndex >= 10 && chapter.cost > 0;
    if (!isLocked || isChapterUnlocked(chapter.id)) {
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
      <div className="border rounded-lg overflow-hidden bg-secondary/20">
        <ul className="divide-y divide-border">
          {novel.chapters.map((chapter, index) => {
            const isLockedByDefault = !novel.isFree && index >= 10 && chapter.cost > 0;
            const unlocked = !isLockedByDefault || isChapterUnlocked(chapter.id);
            const ChapterLinkWrapper = unlocked ? Link : 'div';
            const props = unlocked ? { href: `/novel/${novel.slug}/${chapter.slug}` } : {};

            return (
              <li key={chapter.id}>
                <ChapterLinkWrapper {...props}>
                  <div
                    onClick={() => !unlocked && handleUnlockClick(chapter, index)}
                    className={cn(
                      "flex items-center justify-between p-4 transition-colors",
                      unlocked ? "hover:bg-accent/50 cursor-pointer" : "cursor-pointer hover:bg-destructive/10"
                    )}
                  >
                    <div className="flex items-center gap-3">
                       {unlocked && isLockedByDefault ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                         <span className="text-muted-foreground w-5 text-center flex-shrink-0">{index + 1}</span>
                      )}
                      <span className="font-medium">{chapter.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      {unlocked ? (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <>
                          <span className="text-primary font-semibold">{chapter.cost} Koin</span>
                          <Lock className="h-5 w-5 text-primary" />
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
          userCoins={coins}
        />
      )}
    </>
  );
}
