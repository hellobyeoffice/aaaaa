import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Trash2, Archive, Star } from "lucide-react";

interface MailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sampleMails = [
  {
    id: 1,
    from: "admin@photoapp.com",
    subject: "회원가입을 환영합니다!",
    preview: "PhotoApp에 가입해주셔서 감사합니다. 다양한 기능을 사용해보세요.",
    time: "오전 10:30",
    isRead: false,
    isStarred: false,
  },
  {
    id: 2,
    from: "김철수",
    subject: "사진 공유 요청",
    preview: "안녕하세요! 지난번에 찍으신 사진 공유해주실 수 있나요?",
    time: "어제",
    isRead: true,
    isStarred: true,
  },
  {
    id: 3,
    from: "notifications@photoapp.com",
    subject: "새로운 댓글 알림",
    preview: "회원님의 사진에 새로운 댓글이 달렸습니다.",
    time: "2일 전",
    isRead: true,
    isStarred: false,
  },
  {
    id: 4,
    from: "support@photoapp.com",
    subject: "서비스 업데이트 안내",
    preview: "새로운 필터 기능이 추가되었습니다. 지금 바로 확인해보세요!",
    time: "3일 전",
    isRead: false,
    isStarred: false,
  },
];

export function MailModal({ open, onOpenChange }: MailModalProps) {
  const [mails, setMails] = useState(sampleMails);
  const [selectedMail, setSelectedMail] = useState<number | null>(null);

  const handleStarToggle = (id: number) => {
    setMails(
      mails.map((mail) =>
        mail.id === id ? { ...mail, isStarred: !mail.isStarred } : mail
      )
    );
  };

  const handleDelete = (id: number) => {
    setMails(mails.filter((mail) => mail.id !== id));
    if (selectedMail === id) {
      setSelectedMail(null);
    }
  };

  const handleMailClick = (id: number) => {
    setSelectedMail(id);
    setMails(
      mails.map((mail) => (mail.id === id ? { ...mail, isRead: true } : mail))
    );
  };

  const selectedMailData = mails.find((mail) => mail.id === selectedMail);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg overflow-hidden shadow-xl z-50 w-[90vw] max-w-4xl h-[80vh] flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold text-gray-900">받은 메일함</Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            받은 메일을 확인하고 관리할 수 있습니다
          </Dialog.Description>

          <div className="flex-1 flex overflow-hidden">
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
              {mails.map((mail) => (
                <div
                  key={mail.id}
                  onClick={() => handleMailClick(mail.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !mail.isRead ? "bg-blue-50" : ""
                  } ${selectedMail === mail.id ? "bg-gray-100" : ""}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2 flex-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStarToggle(mail.id);
                        }}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            mail.isStarred
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                      <span
                        className={`text-sm truncate ${
                          !mail.isRead ? "font-semibold" : ""
                        }`}
                      >
                        {mail.from}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {mail.time}
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-1 ${
                      !mail.isRead ? "font-semibold" : ""
                    }`}
                  >
                    {mail.subject}
                  </p>
                  <p className="text-xs text-gray-600 truncate">{mail.preview}</p>
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col">
              {selectedMailData ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {selectedMailData.subject}
                        </h3>
                        <p className="text-sm text-gray-600">
                          보낸 사람: {selectedMailData.from}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(selectedMailData.id)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="보관"
                        >
                          <Archive className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{selectedMailData.time}</p>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <p className="text-gray-700">{selectedMailData.preview}</p>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  메일을 선택하세요
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
