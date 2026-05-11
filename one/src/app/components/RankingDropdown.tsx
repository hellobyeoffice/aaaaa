import { useNavigate } from "react-router";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { TrendingUp, Award, Mountain, User, Trophy } from "lucide-react";

export function RankingDropdown() {
  const navigate = useNavigate();

  const categories = [
    { id: "popular", label: "인기", icon: TrendingUp, path: "/ranking/popular" },
    { id: "best", label: "최우수", icon: Award, path: "/ranking/best" },
    { id: "landscape", label: "풍경", icon: Mountain, path: "/ranking/landscape" },
    { id: "portrait", label: "인물", icon: User, path: "/ranking/portrait" },
    { id: "sports", label: "스포츠", icon: Trophy, path: "/ranking/sports" },
  ];

  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 group">
            랭킹
            <svg
              className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="py-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => navigate(category.path)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
