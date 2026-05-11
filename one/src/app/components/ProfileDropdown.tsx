import { useNavigate } from "react-router";
import { User, LogIn } from "lucide-react";

interface ProfileDropdownProps {
  isLoggedIn: boolean;
}

export function ProfileDropdown({ isLoggedIn }: ProfileDropdownProps) {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span className="text-sm font-medium">로그인</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate("/profile")}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
      title="프로필"
    >
      <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </button>
  );
}
