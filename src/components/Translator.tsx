import { useTranslation } from "../hooks/useTranslation";
import { LanguageSelector } from "./LanguageSelector";
import { TextArea } from "./TextArea";
import { ExpressionCard } from "./ExpressionCard";
import { ExpressionsLibrary } from "./ExpressionsLibrary";
import { InstallButton, DirectInstallButton } from "./InstallPWA";

export function Translator() {
  const {
    sourceText,
    setSourceText,
    translatedText,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    isLoading,
    detectedLanguage,
    expressionInfo,
    swapLanguages,
  } = useTranslation();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center relative">
        {/* Install Button - Top Right */}
        <div className="absolute top-0 right-0">
          <InstallButton />
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-5xl font-black text-transparent tracking-tighter">
              WordHi
            </h1>
            <InstallButton />
          </div>
        </div>
        <p className="mt-4 text-slate-500 font-medium">
          Le traducteur automatique universel de toute la galaxie. <br/>
          <span className="text-indigo-500 italic">"Parlez à n'importe qui, n'importe où, n'importe quand."</span>
        </p>
      </div>

      {/* Language Selectors */}
      <div className="mb-6 flex items-center gap-4 flex-col md:flex-row">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Langue source
          </label>
          <LanguageSelector
            value={sourceLang}
            onChange={setSourceLang}
            showAuto={true}
            detectedLanguage={detectedLanguage?.language}
          />
        </div>

        <button
          onClick={swapLanguages}
          disabled={sourceLang === "auto"}
          className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          title="Inverser les langues"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </button>

        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Langue cible
          </label>
          <LanguageSelector value={targetLang} onChange={setTargetLang} />
        </div>
      </div>

      {/* Translation Areas */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Source */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Texte original
            </span>
            {detectedLanguage && sourceLang === "auto" && (
              <span className="flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
                Détecté: {detectedLanguage.language.toUpperCase()}
              </span>
            )}
          </div>
          <TextArea
            value={sourceText}
            onChange={setSourceText}
            placeholder="Entrez le texte à traduire..."
          />
        </div>

        {/* Target */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Traduction
            </span>
            {isLoading && (
              <span className="flex items-center gap-2 text-xs text-indigo-600">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Traduction en cours...
              </span>
            )}
          </div>
          <TextArea
            value={translatedText}
            readOnly={true}
            placeholder="La traduction apparaîtra ici..."
          />
        </div>
      </div>

      {/* Expression Info */}
      <ExpressionCard expressionInfo={expressionInfo} />

      {/* Features */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
            <svg
              className="h-5 w-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800">Détection auto</h3>
          <p className="mt-1 text-sm text-slate-500">
            Détection automatique de la langue
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <span className="text-xl">🌍</span>
          </div>
          <h3 className="font-semibold text-slate-800">+100 langues</h3>
          <p className="mt-1 text-sm text-slate-500">
            Grec, Japonais, Arabe, Morse...
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
            <span className="text-xl">💡</span>
          </div>
          <h3 className="font-semibold text-slate-800">Expressions</h3>
          <p className="mt-1 text-sm text-slate-500">
            Traduction d'expressions idiomatiques
          </p>
        </div>

        <DirectInstallButton />
      </div>

      {/* Expressions Library */}
      <ExpressionsLibrary onSelectExpression={setSourceText} />

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-slate-400">
        <p>
          Propulsé par MyMemory Translation API • Traductions automatiques avec
          détection d'expressions
        </p>
      </footer>
    </div>
  );
}
