import { useState, useCallback, useEffect, useRef } from "react";
import {
  translateText,
  detectLanguage,
  TranslationResult,
  DetectionResult,
} from "../services/translationService";

export interface UseTranslationReturn {
  sourceText: string;
  setSourceText: (text: string) => void;
  translatedText: string;
  sourceLang: string;
  setSourceLang: (lang: string) => void;
  targetLang: string;
  setTargetLang: (lang: string) => void;
  isLoading: boolean;
  error: string | null;
  detectedLanguage: DetectionResult | null;
  expressionInfo: TranslationResult["expressionInfo"];
  swapLanguages: () => void;
  translate: () => Promise<void>;
}

export const useTranslation = (): UseTranslationReturn => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] =
    useState<DetectionResult | null>(null);
  const [expressionInfo, setExpressionInfo] =
    useState<TranslationResult["expressionInfo"]>(undefined);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const translate = useCallback(async () => {
    if (!sourceText.trim()) {
      setTranslatedText("");
      setExpressionInfo(undefined);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await translateText(sourceText, sourceLang, targetLang);
      setTranslatedText(result.translatedText);
      setExpressionInfo(result.expressionInfo);

      if (result.detectedLanguage) {
        setDetectedLanguage({
          language: result.detectedLanguage,
          confidence: 0.9,
        });
      }
    } catch (err) {
      setError("Erreur lors de la traduction. Veuillez réessayer.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, sourceLang, targetLang]);

  // Auto-detect language as user types
  useEffect(() => {
    if (sourceLang === "auto" && sourceText.trim()) {
      const detection = detectLanguage(sourceText);
      setDetectedLanguage(detection);
    } else if (!sourceText.trim()) {
      setDetectedLanguage(null);
    }
  }, [sourceText, sourceLang]);

  // Auto-translate with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (sourceText.trim()) {
      debounceRef.current = setTimeout(() => {
        translate();
      }, 500);
    } else {
      setTranslatedText("");
      setExpressionInfo(undefined);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [sourceText, sourceLang, targetLang, translate]);

  const swapLanguages = useCallback(() => {
    if (sourceLang === "auto") return;

    const tempLang = sourceLang;
    const tempText = translatedText;

    setSourceLang(targetLang);
    setTargetLang(tempLang);
    setSourceText(tempText);
    setTranslatedText(sourceText);
  }, [sourceLang, targetLang, sourceText, translatedText]);

  return {
    sourceText,
    setSourceText,
    translatedText,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    isLoading,
    error,
    detectedLanguage,
    expressionInfo,
    swapLanguages,
    translate,
  };
};
