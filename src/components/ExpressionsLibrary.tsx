import { useState } from "react";
import { expressions } from "../data/expressions";
import { languages } from "../data/languages";

interface ExpressionsLibraryProps {
  onSelectExpression: (text: string) => void;
}

export function ExpressionsLibrary({
  onSelectExpression,
}: ExpressionsLibraryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterLang, setFilterLang] = useState("all");

  const filteredExpressions =
    filterLang === "all"
      ? expressions
      : expressions.filter((e) => e.language === filterLang);

  const getLanguageName = (code: string) => {
    return languages.find((l) => l.code === code)?.name || code;
  };

  const getLanguageFlag = (code: string) => {
    const flags: { [key: string]: string } = {
      fr: "🇫🇷",
      en: "🇬🇧",
      es: "🇪🇸",
      de: "🇩🇪",
      it: "🇮🇹",
      pt: "🇵🇹",
    };
    return flags[code] || "🌐";
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 text-left transition-all hover:border-indigo-200 hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📚</span>
          <div>
            <h3 className="font-semibold text-indigo-800">
              Bibliothèque d'expressions
            </h3>
            <p className="text-xs text-indigo-600">
              Explorez les expressions idiomatiques populaires
            </p>
          </div>
        </div>
        <svg
          className={`h-5 w-5 text-indigo-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-3 rounded-xl border-2 border-slate-200 bg-white p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={() => setFilterLang("all")}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                filterLang === "all"
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Toutes
            </button>
            {["fr", "en", "es", "de", "it"].map((code) => (
              <button
                key={code}
                onClick={() => setFilterLang(code)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  filterLang === code
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {getLanguageFlag(code)} {getLanguageName(code)}
              </button>
            ))}
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto">
            {filteredExpressions.map((expr, index) => (
              <div
                key={index}
                onClick={() => onSelectExpression(expr.original)}
                className="cursor-pointer rounded-lg border border-slate-100 bg-slate-50 p-3 transition-all hover:border-indigo-200 hover:bg-indigo-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-800">
                      {getLanguageFlag(expr.language)} "{expr.original}"
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{expr.meaning}</p>
                  </div>
                  <span className="shrink-0 rounded bg-slate-200 px-2 py-0.5 text-xs text-slate-600">
                    {getLanguageName(expr.language)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
