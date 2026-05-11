import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Camera, Mail, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    setName(user.name || "");
    setEmail(user.email || "");
    setPicture(user.picture || "");
  }, [navigate, user]);

  if (!user) {
    return null;
  }

  const handleSave = () => {
    updateProfile({ name, email, picture });
    setIsEditing(false);
    alert("프로필/이메일 설정을 저장했습니다.");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-36 bg-gradient-to-r from-blue-600 to-cyan-500" />

          <div className="px-8 pb-8">
            <div className="flex items-end justify-between -mt-14 mb-6">
              <div className="relative">
                <img
                  src={picture || "https://i.pravatar.cc/150?img=10"}
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-1 right-1 p-2 bg-blue-600 text-white rounded-full shadow-lg">
                  <Camera className="w-4 h-4" />
                </div>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  프로필 수정
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    저장
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  이메일
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-700">{email}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">이메일 인증 없이 설정값만 변경됩니다.</p>
              </div>

              {isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">프로필 이미지 URL</label>
                  <input
                    type="url"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-white rounded-lg shadow hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          로그아웃
        </button>
      </div>
    </div>
  );
}
