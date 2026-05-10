import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PhotoDetailModal } from "./PhotoDetailModal";

const IMAGES_PER_PAGE = 24;

const sampleImages = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/seed/home-${i + 1}/600/600`,
  alt: `Photo ${i + 1}`,
}));

export function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<{ id: number; url: string; alt: string } | null>(null);

  const filteredImages = useMemo(
    () => sampleImages.filter((image) => image.alt.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery],
  );

  const totalPages = Math.max(1, Math.ceil(filteredImages.length / IMAGES_PER_PAGE));
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const currentImages = filteredImages.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded transition-colors ${
            currentPage === i ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-8">LOGO</h1>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="사진 검색"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {currentImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedPhoto(image)}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
            >
              <ImageWithFallback
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {selectedPhoto && (
          <PhotoDetailModal
            open={!!selectedPhoto}
            onOpenChange={(open) => !open && setSelectedPhoto(null)}
            photo={selectedPhoto}
          />
        )}

        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
