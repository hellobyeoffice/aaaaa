import { useState } from "react";
import { Clock, Heart, MessageCircle, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const historyItems = [
  {
    id: 1,
    type: "upload",
    image: "https://images.unsplash.com/photo-1500000000000?w=400&h=400&fit=crop",
    title: "새로운 사진을 업로드했습니다",
    time: "2시간 전",
    likes: 24,
    comments: 5,
    views: 156,
  },
  {
    id: 2,
    type: "like",
    image: "https://images.unsplash.com/photo-1500000001000?w=400&h=400&fit=crop",
    title: "사진에 좋아요를 눌렀습니다",
    time: "5시간 전",
    likes: 89,
    comments: 12,
    views: 432,
  },
  {
    id: 3,
    type: "comment",
    image: "https://images.unsplash.com/photo-1500000002000?w=400&h=400&fit=crop",
    title: "사진에 댓글을 달았습니다",
    time: "1일 전",
    likes: 156,
    comments: 23,
    views: 789,
  },
  {
    id: 4,
    type: "upload",
    image: "https://images.unsplash.com/photo-1500000003000?w=400&h=400&fit=crop",
    title: "새로운 사진을 업로드했습니다",
    time: "2일 전",
    likes: 67,
    comments: 8,
    views: 234,
  },
  {
    id: 5,
    type: "like",
    image: "https://images.unsplash.com/photo-1500000004000?w=400&h=400&fit=crop",
    title: "사진에 좋아요를 눌렀습니다",
    time: "3일 전",
    likes: 45,
    comments: 3,
    views: 178,
  },
];

export function History() {
  const [filter, setFilter] = useState<"all" | "upload" | "like" | "comment">("all");

  const filteredItems =
    filter === "all"
      ? historyItems
      : historyItems.filter((item) => item.type === filter);

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">활동 기록</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter("upload")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "upload"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              업로드
            </button>
            <button
              onClick={() => setFilter("like")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "like"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              좋아요
            </button>
            <button
              onClick={() => setFilter("comment")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "comment"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              댓글
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-4">
                <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt="History item"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === "upload"
                          ? "bg-blue-100 text-blue-700"
                          : item.type === "like"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.type === "upload"
                        ? "업로드"
                        : item.type === "like"
                        ? "좋아요"
                        : "댓글"}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>{item.comments}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
