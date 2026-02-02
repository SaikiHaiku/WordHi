import { useState, useRef, useEffect, useMemo } from "react";
import { languages, getLanguageFlag, LanguageCategory } from "../data/languages";
import { cn } from "../utils/cn";
import { Search, Globe, Info } from 'lucide-react';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  showAuto?: boolean;
  detectedLanguage?: string | null;
  className?: string;
}

export function LanguageSelector({
  value,
  onChange,
  showAuto = false,
  detectedLanguage,
  className,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<LanguageCategory | 'Toutes'>('Toutes');
  const containerRef = useRef<HTMLDivElement>(null);

  const categoryLabels: Record<LanguageCategory, string> = {
    'Monde Réel': "🌍 Monde",
    'Galactique & Fiction': "🚀 Galaxie",
    'Ancien & Historique': "🏛️ Ancien",
    'Technologie & Code': "💻 Tech",
    'Fun & Secret': "🤪 Fun"
  };

  const tabs: (LanguageCategory | 'Toutes')[] = ['Toutes', 'Monde Réel', 'Galactique & Fiction', 'Ancien & Historique', 'Technologie & Code', 'Fun & Secret'];

  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) => {
      const isNotAutoIfHidden = showAuto || lang.code !== "auto";
      const matchesSearch = 
        lang.name.toLowerCase().includes(search.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(search.toLowerCase()) ||
        lang.origin.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === 'Toutes' || lang.category === activeTab;
      
      return isNotAutoIfHidden && matchesSearch && matchesTab;
    });
  }, [search, activeTab, showAuto]);

  const selectedLang = languages.find((l) => l.code === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex flex-col items-start gap-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:border-indigo-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl drop-shadow-sm">{getLanguageFlag(value)}</span>
            <span className="font-bold text-slate-900">
              {selectedLang?.name || value}
            </span>
          </div>
          <svg
            className={cn("h-5 w-5 text-slate-400 transition-transform duration-300", isOpen && "rotate-180 text-indigo-500")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {selectedLang && selectedLang.code !== 'auto' && (
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 whitespace-nowrap">
              {selectedLang.category.split(' ')[0]}
            </span>
            <span className="text-[10px] text-slate-400 truncate font-medium">
              • {selectedLang.origin}
            </span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-[100] mt-3 w-screen max-w-[340px] sm:max-w-[420px] left-0 sm:left-auto sm:right-0 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200">
          {/* Search Header */}
          <div className="bg-slate-50/80 p-4 backdrop-blur-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher nom, pays, univers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border-0 bg-white py-3 pl-11 pr-4 text-sm font-medium shadow-inner focus:ring-2 focus:ring-indigo-500/20"
                autoFocus
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1 overflow-x-auto bg-slate-50/50 p-2 no-scrollbar border-b border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all",
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-slate-500 hover:bg-slate-200"
                )}
              >
                {tab === 'Toutes' ? '🌟 Toutes' : categoryLabels[tab as LanguageCategory]}
              </button>
            ))}
          </div>

          {/* Languages List */}
          <div className="max-h-[400px] overflow-y-auto p-2 custom-scrollbar">
            {filteredLanguages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Globe className="mb-3 h-12 w-12 opacity-10 animate-pulse" />
                <p className="font-bold">Mystère galactique...</p>
                <p className="text-xs">Aucune langue ne correspond à cet univers.</p>
              </div>
            ) : (
              <div className="grid gap-1">
                {filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onChange(lang.code);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "group flex flex-col items-start rounded-2xl p-3 text-left transition-all duration-200",
                      value === lang.code
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                        : "hover:bg-indigo-50"
                    )}
                  >
                    <div className="flex w-full items-center gap-4">
                      <span className={cn(
                        "text-3xl transition-transform duration-300",
                        value !== lang.code && "group-hover:scale-125"
                      )}>
                        {lang.flag}
                      </span>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-black leading-tight",
                            value === lang.code ? "text-white" : "text-slate-900"
                          )}>
                            {lang.name}
                          </span>
                          <span className={cn(
                            "text-[8px] rounded px-1.5 py-0.5 font-black uppercase tracking-widest",
                            value === lang.code ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                          )}>
                            {lang.category.split(' ')[0]}
                          </span>
                        </div>
                        <p className={cn(
                          "mt-1 text-[11px] font-medium italic truncate",
                          value === lang.code ? "text-indigo-100" : "text-slate-400"
                        )}>
                          {lang.origin}
                        </p>
                      </div>
                      {value === lang.code && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 bg-indigo-900 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/90">
            <Info className="h-3 w-3 text-indigo-300" />
            Traducteur Universel WordHi v2.0
          </div>
        </div>
      )}

      {showAuto && value === "auto" && detectedLanguage && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-indigo-50 p-2 text-xs font-bold text-indigo-600 border border-indigo-100 animate-in slide-in-from-top-1">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
          <span className="text-lg">{getLanguageFlag(detectedLanguage)}</span>
          Détecté : {languages.find((l) => l.code === detectedLanguage)?.name || detectedLanguage}
        </div>
      )}
    </div>
  );
}
