import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Heart, Share2, Send } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";

interface PhotoDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photo: {
    id: number;
    url: string;
    alt: string;
  };
}

interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  time: string;
}

const seedComments: Comment[] = [
  {
    id: 1,
    user: "photofan",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Great composition.",
    time: "2h ago",
  },
  {
    id: 2,
    user: "visual_note",
    avatar: "https://i.pravatar.cc/150?img=2",
    content: "Nice color tone.",
    time: "5h ago",
  },
];

export function PhotoDetailModal({ open, onOpenChange, photo }: PhotoDetailModalProps) {
  const { isLoggedIn, user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(124);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(seedComments);

  const currentViewer = useMemo(
    () => ({
      name: isLoggedIn ? user?.name ?? "User" : "Anonymous",
      avatar: isLoggedIn
        ? user?.picture || "https://i.pravatar.cc/150?img=11"
        : "https://i.pravatar.cc/150?img=50",
      roleLabel: isLoggedIn ? "Logged in" : "Anonymous",
    }),
    [isLoggedIn, user],
  );

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("링크를 복사했습니다.");
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      user: currentViewer.name,
      avatar: currentViewer.avatar,
      content: comment.trim(),
      time: "just now",
    };

    setComments((prev) => [newComment, ...prev]);
    setComment("");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg overflow-hidden shadow-xl z-50 w-[90vw] max-w-6xl h-[90vh] flex">
          <Dialog.Title className="sr-only">Photo detail</Dialog.Title>

          <div className="flex-1 bg-black flex items-center justify-center">
            <ImageWithFallback src={photo.url} alt={photo.alt} className="max-w-full max-h-full object-contain" />
          </div>

          <div className="w-[400px] flex flex-col bg-white">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={currentViewer.avatar} alt="Viewer" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-gray-900">{currentViewer.name}</p>
                  <p className="text-xs text-gray-500">{currentViewer.roleLabel}</p>
                </div>
              </div>
              <Dialog.Close asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </Dialog.Close>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-gray-900">{c.user}</span>
                      <span className="text-xs text-gray-500">{c.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200">
              <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-200">
                <button onClick={handleLike} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Heart className={`w-6 h-6 ${liked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                  <span className="text-sm font-semibold text-gray-900">{likeCount}</span>
                </button>
                <button onClick={handleShare} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Share2 className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              <form onSubmit={handleCommentSubmit} className="p-4 flex gap-2">
                <input
                  type="text"
                  placeholder="댓글을 입력하세요"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!comment.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
