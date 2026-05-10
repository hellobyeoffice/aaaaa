import { useState } from "react";
import { Bell, X } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";

const notifications = [
  {
    id: 1,
    title: "시스템 점검 안내",
    content: "2026년 5월 10일 오전 2시부터 4시까지 시스템 점검이 진행됩니다.",
    date: "2026-05-01",
    isNew: true,
  },
  {
    id: 2,
    title: "새로운 기능 업데이트",
    content: "이미지 필터 기능이 추가되었습니다. 사진 편집에서 다양한 필터를 사용해보세요.",
    date: "2026-04-28",
    isNew: true,
  },
  {
    id: 3,
    title: "개인정보 처리방침 변경 안내",
    content: "개인정보 처리방침이 업데이트되었습니다. 자세한 내용은 설정에서 확인하세요.",
    date: "2026-04-25",
    isNew: false,
  },
  {
    id: 4,
    title: "이벤트 당첨자 발표",
    content: "4월 포토 콘테스트 당첨자가 발표되었습니다. 메일을 확인해주세요.",
    date: "2026-04-20",
    isNew: false,
  },
  {
    id: 5,
    title: "서비스 이용약관 개정",
    content: "서비스 이용약관이 개정되었습니다. 2026년 5월 15일부터 적용됩니다.",
    date: "2026-04-15",
    isNew: false,
  },
];

export function NotificationPopover() {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.isNew).length;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-lg border border-gray-200 w-[400px] max-h-[600px] overflow-hidden z-50"
          sideOffset={8}
          align="end"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">공지사항</h3>
            <Popover.Close asChild>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </Popover.Close>
          </div>

          <div className="overflow-y-auto max-h-[540px]">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                  notification.isNew ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    {notification.title}
                    {notification.isNew && (
                      <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                    )}
                  </h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {notification.date}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{notification.content}</p>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-gray-50 px-4 py-2 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              모든 공지사항 보기
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
