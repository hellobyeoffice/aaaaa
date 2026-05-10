import { useState, useEffect } from "react";
import { Sun, Moon, Monitor, Bell, Globe, Lock, HelpCircle } from "lucide-react";

type Theme = "light" | "dark" | "system";

export function Settings() {
  const [theme, setTheme] = useState<Theme>("light");
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState("ko");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else if (newTheme === "light") {
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">설정</h1>

        <div className="space-y-6">
          {/* 테마 설정 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">테마</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              앱의 테마를 선택하세요
            </p>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleThemeChange("light")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === "light"
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <Sun className={`w-6 h-6 mx-auto mb-2 ${
                  theme === "light" ? "text-blue-600" : "text-gray-600 dark:text-gray-400"
                }`} />
                <p className={`text-sm font-medium ${
                  theme === "light" ? "text-blue-600" : "text-gray-700 dark:text-gray-300"
                }`}>
                  밝은 모드
                </p>
              </button>

              <button
                onClick={() => handleThemeChange("dark")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === "dark"
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <Moon className={`w-6 h-6 mx-auto mb-2 ${
                  theme === "dark" ? "text-blue-600" : "text-gray-600 dark:text-gray-400"
                }`} />
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-blue-600" : "text-gray-700 dark:text-gray-300"
                }`}>
                  어두운 모드
                </p>
              </button>

              <button
                onClick={() => handleThemeChange("system")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === "system"
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <Monitor className={`w-6 h-6 mx-auto mb-2 ${
                  theme === "system" ? "text-blue-600" : "text-gray-600 dark:text-gray-400"
                }`} />
                <p className={`text-sm font-medium ${
                  theme === "system" ? "text-blue-600" : "text-gray-700 dark:text-gray-300"
                }`}>
                  시스템 설정
                </p>
              </button>
            </div>
          </div>

          {/* 알림 설정 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              알림
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">푸시 알림</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    새로운 활동에 대한 알림을 받습니다
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">이메일 알림</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    이메일로 알림을 받습니다
                  </p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    emailNotifications ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      emailNotifications ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 언어 설정 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              언어
            </h2>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>
          </div>

          {/* 개인정보 및 보안 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              개인정보 및 보안
            </h2>

            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
                비밀번호 변경
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
                2단계 인증
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
                개인정보 다운로드
              </button>
            </div>
          </div>

          {/* 도움말 및 지원 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              도움말 및 지원
            </h2>

            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
                FAQ
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
                문의하기
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
                이용약관
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
                개인정보처리방침
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
