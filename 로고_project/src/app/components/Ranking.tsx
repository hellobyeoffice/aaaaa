import { useMemo } from "react";
import { useParams } from "react-router";
import { Heart, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const categoryNames: Record<string, string> = {
  popular: "인기",
  best: "베스트",
  landscape: "풍경",
  portrait: "인물",
  sports: "스포츠",
};

export function Ranking() {
  const { category = "popular" } = useParams();
  const categoryName = categoryNames[category] ?? "인기";

  const rankingData = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        rank: i + 1,
        image: `https://picsum.photos/seed/rank-${category}-${i + 1}/400/400`,
        title: `${categoryName} 사진 ${i + 1}`,
        author: `user_${i + 1}`,
        likes: 2000 - i * 37,
        views: 5000 - i * 51,
      })),
    [category, categoryName],
  );

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{categoryName} 랭킹</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-20">순위</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">사진</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">작가</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">좋아요</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">조회수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rankingData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-lg font-bold text-gray-700">{item.rank}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-gray-900">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{item.author}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{item.likes.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span>{item.views.toLocaleString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
