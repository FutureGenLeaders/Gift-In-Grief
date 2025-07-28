
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const languages = {
    // Tier 1 (Priority)
    'en': 'English',
    'zh': '简体中文',
    'es': 'Español',
    'hi': 'हिन्दी',
    // Tier 2 (Asian focus)
    'ja': '日本語',
    'ko': '한국어',
    'th': 'ไทย',
    'vi': 'Tiếng Việt',
    'id': 'Bahasa Indonesia',
    // Tier 3 (Global)
    'fr': 'Français',
    'pt': 'Português',
    'ar': 'العربية',
    'ru': 'Русский',
    'de': 'Deutsch',
    // Tier 4 (Additional Asian)
    'tl': 'Tagalog',
    'ms': 'Bahasa Melayu',
    'bn': 'বাংলা',
    'ta': 'தமிழ்'
  };

  const getCurrentLanguageName = () => {
    return languages[i18n.language as keyof typeof languages] || 'English';
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-400" />
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-48 h-8 border-none bg-transparent text-gray-400">
          <SelectValue>
            {getCurrentLanguageName()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-64 overflow-y-auto bg-background border-border">
          {/* Tier 1 - Priority Languages */}
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="zh">简体中文 (Chinese)</SelectItem>
          <SelectItem value="es">Español (Spanish)</SelectItem>
          <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
          
          {/* Tier 2 - Asian Focus */}
          <SelectItem value="ja">日本語 (Japanese)</SelectItem>
          <SelectItem value="ko">한국어 (Korean)</SelectItem>
          <SelectItem value="th">ไทย (Thai)</SelectItem>
          <SelectItem value="vi">Tiếng Việt (Vietnamese)</SelectItem>
          <SelectItem value="id">Bahasa Indonesia</SelectItem>
          
          {/* Tier 3 - Global */}
          <SelectItem value="fr">Français (French)</SelectItem>
          <SelectItem value="pt">Português (Portuguese)</SelectItem>
          <SelectItem value="ar">العربية (Arabic)</SelectItem>
          <SelectItem value="ru">Русский (Russian)</SelectItem>
          <SelectItem value="de">Deutsch (German)</SelectItem>
          
          {/* Tier 4 - Additional Asian */}
          <SelectItem value="tl">Tagalog (Filipino)</SelectItem>
          <SelectItem value="ms">Bahasa Melayu (Malay)</SelectItem>
          <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
          <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
