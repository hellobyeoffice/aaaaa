import { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Upload, Image as ImageIcon, AlertCircle } from "lucide-react";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 15 * 1024 * 1024; // 15MB in bytes

    const validFiles = files.filter((file) => {
      if (!file.type.includes("gif")) {
        alert(`${file.name}은(는) GIF 파일이 아닙니다.`);
        return false;
      }
      if (file.size > maxSize) {
        alert(`${file.name}의 크기가 15MB를 초과합니다.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setSelectedFiles(validFiles);
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      console.log("Uploading files:", selectedFiles);
      alert(`${selectedFiles.length}개의 파일이 업로드되었습니다!`);
      setSelectedFiles([]);
      setPreviews([]);
      onOpenChange(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl z-50 w-[90vw] max-w-2xl">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">사진 업로드</Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            GIF 파일을 업로드할 수 있습니다 (15MB 이하)
          </Dialog.Description>

          <div className="p-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/gif"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="mb-4 flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-200">
                <p className="font-semibold mb-1">주의사항</p>
                <p>15MB 이하의 GIF 파일만 업로드 가능합니다.</p>
              </div>
            </div>

            {previews.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <ImageIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  GIF 파일을 선택하세요
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  클릭하거나 드래그하여 파일을 업로드하세요
                </p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-4"
                >
                  더 추가하기
                </button>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                취소
              </button>
            </Dialog.Close>
            <button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              업로드
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
