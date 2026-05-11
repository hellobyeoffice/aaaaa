import { useMemo } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Realtime() {
  const photos = useMemo(
    () => Array.from({ length: 36 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/seed/realtime-${i + 1}/600/600`,
      alt: `Realtime photo ${i + 1}`,
    })),
    [],
  );

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">실시간 사진</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
