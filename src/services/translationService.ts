import { expressions } from "../data/expressions";

// Morse code mappings
const morseCodeMap: { [key: string]: string } = {
  'A': '•−', 'B': '−•••', 'C': '−•−•', 'D': '−••', 'E': '•',
  'F': '••−•', 'G': '−−•', 'H': '••••', 'I': '••', 'J': '•−−−',
  'K': '−•−', 'L': '•−••', 'M': '−−', 'N': '−•', 'O': '−−−',
  'P': '•−−•', 'Q': '−−•−', 'R': '•−•', 'S': '•••', 'T': '−',
  'U': '••−', 'V': '•••−', 'W': '•−−', 'X': '−••−', 'Y': '−•−−',
  'Z': '−−••',
  '0': '−−−−−', '1': '•−−−−', '2': '••−−−', '3': '•••−−',
  '4': '••••−', '5': '•••••', '6': '−••••', '7': '−−•••',
  '8': '−−−••', '9': '−−−−•',
  '.': '•−•−•−', ',': '−−••−−', '?': '••−−••', "'": '•−−−−•',
  '!': '−•−•−−', '/': '−••−•', '(': '−•−−•', ')': '−•−−•−',
  '&': '•−•••', ':': '−−−•••', ';': '−•−•−•', '=': '−•••−',
  '+': '•−•−•', '-': '−••••−', '_': '••−−•−', '"': '•−••−•',
  '$': '•••−••−', '@': '•−−•−•', ' ': '/'
};

// Reverse morse map
const reverseMorseMap: { [key: string]: string } = {};
Object.entries(morseCodeMap).forEach(([char, morse]) => {
  reverseMorseMap[morse] = char;
});

// Convert text to morse
export const textToMorse = (text: string): string => {
  return text.toUpperCase()
    .split('')
    .map(char => morseCodeMap[char] || char)
    .join(' ')
    .replace(/  +/g, ' / ');
};

// Convert morse to text
export const morseToText = (morse: string): string => {
  // Normalize morse code (handle different dot/dash representations)
  const normalized = morse
    .replace(/\./g, '•')
    .replace(/-/g, '−')
    .replace(/\|/g, '/')
    .trim();
  
  const words = normalized.split(/\s*\/\s*/);
  return words.map(word => {
    const letters = word.trim().split(/\s+/);
    return letters.map(letter => reverseMorseMap[letter] || letter).join('');
  }).join(' ');
};

// --- Custom Encoders for "All Languages of the Universe" ---

const textToBinary = (text: string) => text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
const binaryToText = (bin: string) => bin.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');

const textToHex = (text: string) => text.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
const hexToText = (hex: string) => hex.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('');

const toPigLatin = (text: string) => text.split(' ').map(word => {
  if (word.length <= 1) return word;
  return word.slice(1) + word[0] + 'ay';
}).join(' ');

const toLeet = (text: string) => {
  const map: { [key: string]: string } = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'b': '8' };
  return text.toLowerCase().split('').map(c => map[c] || c).join('');
};

const toEmoji = (text: string) => {
  const map: { [key: string]: string } = { 
    'love': '❤️', 'happy': '😊', 'hi': '👋', 'hello': '👋', 'sun': '☀️', 'moon': '🌙', 
    'cat': '🐱', 'dog': '🐶', 'fire': '🔥', 'water': '💧', 'pizza': '🍕', 'coffee': '☕' 
  };
  let result = text.toLowerCase();
  Object.entries(map).forEach(([word, emoji]) => {
    result = result.replace(new RegExp(`\\b${word}\\b`, 'g'), emoji);
  });
  return result;
};

// Functions for special translations


// Check if text is morse code
export const isMorseCode = (text: string): boolean => {
  const morsePattern = /^[\s•\.\-−\/\|]+$/;
  return morsePattern.test(text) && text.trim().length > 0;
};

// Language detection patterns
const languagePatterns: { [key: string]: RegExp[] } = {
  // Romance languages
  fr: [
    /\b(le|la|les|un|une|des|est|sont|avoir|être|faire|dans|pour|avec|sur|que|qui|ce|cette|ces|je|tu|il|elle|nous|vous|ils|elles|mon|ton|son|notre|votre|leur)\b/gi,
    /[àâäéèêëïîôùûüç]/gi,
  ],
  en: [
    /\b(the|is|are|was|were|have|has|been|being|do|does|did|will|would|could|should|can|may|might|this|that|these|those|my|your|his|her|its|our|their)\b/gi,
  ],
  es: [
    /\b(el|la|los|las|un|una|unos|unas|es|son|estar|ser|hacer|con|para|por|que|como|yo|tú|él|ella|nosotros|vosotros|ellos)\b/gi,
    /[áéíóúñ¿¡]/gi,
  ],
  de: [
    /\b(der|die|das|ein|eine|ist|sind|haben|sein|werden|mit|für|auf|und|oder|aber|wenn|ich|du|er|sie|es|wir|ihr)\b/gi,
    /[äöüß]/gi,
  ],
  it: [
    /\b(il|lo|la|i|gli|le|un|uno|una|è|sono|essere|avere|fare|con|per|che|come|questo|questa|io|tu|lui|lei|noi|voi|loro)\b/gi,
    /[àèéìíîòóùú]/gi,
  ],
  pt: [
    /\b(o|a|os|as|um|uma|uns|umas|é|são|estar|ser|fazer|com|para|por|que|como|este|esta|eu|tu|ele|ela|nós|vós|eles)\b/gi,
    /[àáâãéêíóôõúç]/gi,
  ],
  ro: [
    /\b(și|este|sunt|pentru|care|din|sau|acest|această)\b/gi,
    /[ăâîșț]/gi,
  ],
  ca: [
    /\b(el|la|els|les|un|una|uns|unes|és|són|amb|per|que|com|aquest|aquesta)\b/gi,
    /[àéèíïóòúüç·]/gi,
  ],
  
  // Slavic languages
  ru: [/[а-яА-ЯёЁ]/g, /\b(и|в|не|на|я|что|он|она|они|мы|вы|это|как|но|за|от|по|с|о|а)\b/gi],
  uk: [/[а-яА-ЯіїєґІЇЄҐ]/g, /\b(і|в|не|на|що|він|вона|вони|ми|ви|це|як|але)\b/gi],
  pl: [/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/gi, /\b(i|w|nie|na|co|on|ona|oni|my|wy|to|jak|ale)\b/gi],
  cs: [/[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/gi],
  sk: [/[áäčďéíĺľňóôŕšťúýžÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ]/gi],
  bg: [/[а-яА-Я]/g, /\b(и|в|не|на|за|от|с|се|е|са)\b/gi],
  sr: [/[а-яА-ЯђјљњћџЂЈЉЊЋЏ]/g],
  hr: [/[čćđšžČĆĐŠŽ]/gi],
  sl: [/[čšžČŠŽ]/gi],
  mk: [/[а-яА-ЯѓѕјљњќџЃЅЈЉЊЌЏ]/g],
  be: [/[а-яА-ЯіІўЎ]/g],
  
  // Asian languages
  zh: [/[\u4e00-\u9fff]/g],
  ja: [/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]/g, /[\u3040-\u309f]/g], // Hiragana priority
  ko: [/[\uac00-\ud7af\u1100-\u11ff]/g],
  th: [/[\u0e00-\u0e7f]/g],
  vi: [/[àảãáạăằẳẵắặâầẩẫấậèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵđĐ]/gi],
  my: [/[\u1000-\u109f]/g],
  km: [/[\u1780-\u17ff]/g],
  lo: [/[\u0e80-\u0eff]/g],
  
  // Indian languages
  hi: [/[\u0900-\u097f]/g],
  bn: [/[\u0980-\u09ff]/g],
  ta: [/[\u0b80-\u0bff]/g],
  te: [/[\u0c00-\u0c7f]/g],
  mr: [/[\u0900-\u097f]/g],
  gu: [/[\u0a80-\u0aff]/g],
  kn: [/[\u0c80-\u0cff]/g],
  ml: [/[\u0d00-\u0d7f]/g],
  pa: [/[\u0a00-\u0a7f]/g],
  or: [/[\u0b00-\u0b7f]/g],
  si: [/[\u0d80-\u0dff]/g],
  ne: [/[\u0900-\u097f]/g],
  
  // Middle Eastern
  ar: [/[\u0600-\u06ff]/g, /\b(و|في|من|على|إلى|أن|هذا|هذه|التي|الذي)\b/gi],
  he: [/[\u0590-\u05ff]/g],
  fa: [/[\u0600-\u06ff]/g, /[پچژگک]/g],
  ur: [/[\u0600-\u06ff]/g],
  
  // Other European
  el: [/[\u0370-\u03ff\u1f00-\u1fff]/g, /\b(και|το|η|ο|είναι|από|με|για|στο|στη|θα)\b/gi],
  hu: [/[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/gi],
  fi: [/[äöÄÖ]/gi, /\b(ja|on|ei|että|oli|se|hän|kun|niin|vain|mutta)\b/gi],
  et: [/[äöõüÄÖÕÜ]/gi],
  lv: [/[āčēģīķļņšūžĀČĒĢĪĶĻŅŠŪŽ]/gi],
  lt: [/[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/gi],
  
  // Nordic
  sv: [/[åäöÅÄÖ]/gi, /\b(och|i|att|det|som|en|av|på|är|för)\b/gi],
  da: [/[æøåÆØÅ]/gi],
  no: [/[æøåÆØÅ]/gi],
  is: [/[áðéíóúýþæöÁÐÉÍÓÚÝÞÆÖ]/gi],
  
  // Turkic
  tr: [/[çğıöşüÇĞİÖŞÜ]/gi, /\b(ve|bir|bu|için|ile|da|de|ne|var|çok)\b/gi],
  az: [/[çəğıöşüÇƏĞİÖŞÜ]/gi],
  kk: [/[әғқңөұүһіӘҒҚҢӨҰҮҺІ]/gi],
  uz: [/[ʻ]/gi],
  
  // African
  sw: [/\b(na|ya|wa|ni|kwa|la|za|au|lakini)\b/gi],
  af: [/\b(die|en|van|is|het|in|op|te|ek|jy|hy|sy)\b/gi],
  am: [/[\u1200-\u137f]/g],
  
  // Celtic
  ga: [/[áéíóúÁÉÍÓÚ]/gi, /\b(agus|an|ar|le|i|go|is|tá|sé|sí)\b/gi],
  cy: [/\b(y|yr|a|i|yn|ar|o|am|ei|hi|fe|mae)\b/gi],
  
  // Caucasian
  ka: [/[\u10a0-\u10ff]/g],
  hy: [/[\u0530-\u058f]/g],
  
  // Morse detection
  morse: [/^[\s•\.\-−\/\|]+$/],
};

export interface DetectionResult {
  language: string;
  confidence: number;
}

export const detectLanguage = (text: string): DetectionResult => {
  if (!text.trim()) {
    return { language: "unknown", confidence: 0 };
  }

  // Check for morse first
  if (isMorseCode(text)) {
    return { language: "morse", confidence: 0.95 };
  }

  const scores: { [key: string]: number } = {};

  for (const [lang, patterns] of Object.entries(languagePatterns)) {
    if (lang === 'morse') continue;
    
    let matchCount = 0;
    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches) {
        matchCount += matches.length;
      }
    }
    scores[lang] = matchCount;
  }

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) {
    return { language: "en", confidence: 0.3 };
  }

  const detectedLang = Object.entries(scores).find(
    ([, score]) => score === maxScore
  )?.[0];
  const confidence = Math.min(maxScore / (text.split(" ").length * 2), 1);

  return {
    language: detectedLang || "en",
    confidence: Math.round(confidence * 100) / 100,
  };
};

export interface TranslationResult {
  translatedText: string;
  detectedLanguage?: string;
  expressionInfo?: {
    original: string;
    meaning: string;
    equivalentExpression?: string;
  };
}

// Check if text contains an expression
const findExpression = (
  text: string,
  targetLang: string
): { original: string; meaning: string; equivalentExpression?: string } | null => {
  const lowerText = text.toLowerCase();

  for (const expr of expressions) {
    if (lowerText.includes(expr.original.toLowerCase())) {
      return {
        original: expr.original,
        meaning: expr.meaning,
        equivalentExpression: expr.translations[targetLang],
      };
    }

    // Check in translations too
    for (const [, translation] of Object.entries(expr.translations)) {
      if (lowerText.includes(translation.toLowerCase())) {
        return {
          original: translation,
          meaning: expr.meaning,
          equivalentExpression:
            expr.translations[targetLang] || expr.original,
        };
      }
    }
  }

  return null;
};

export const translateText = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslationResult> => {
  if (!text.trim()) {
    return { translatedText: "" };
  }

  // Detect language if auto
  let actualSourceLang = sourceLang;
  if (sourceLang === "auto") {
    const detection = detectLanguage(text);
    actualSourceLang = detection.language;
  }

  // --- Universal Translator logic for special categories ---
  
  // Handle Tech/Coding and Fun languages
  const specialTranslations: Record<string, (t: string) => string> = {
    binary: textToBinary,
    hex: textToHex,
    base64: (t) => btoa(t),
    pig_latin: toPigLatin,
    leet: toLeet,
    emojify: toEmoji,
    reverse: (t) => t.split('').reverse().join(''),
    js: (t) => `console.log("${t.replace(/"/g, "'")}");`,
    python: (t) => `print("${t.replace(/"/g, "'")}")`,
    html: (t) => `<div>${t}</div>`,
    rust: (t) => `println!("{}","${t.replace(/"/g, "'")}");`,
    morse: textToMorse,
    uwu: (t) => t.toLowerCase().replace(/[rl]/g, 'w').replace(/n([aeiou])/g, 'ny$1').replace(/!/g, ' >w<'),
    pirate: (t) => "Ahoy! " + t.replace(/r/g, 'rrrh').replace(/hello/gi, 'ahoy') + ", matey! Arrrgh!",
    brainfuck: (t) => t.split('').map(() => ['+', '-', '>', '<', '.', ',', '[', ']'][Math.floor(Math.random() * 8)]).join('').substring(0, t.length * 4),
  };

  if (specialTranslations[targetLang]) {
    let textToConvert = text;
    if (actualSourceLang === 'binary') textToConvert = binaryToText(text);
    if (actualSourceLang === 'hex') textToConvert = hexToText(text);
    if (actualSourceLang === 'morse') textToConvert = morseToText(text);

    return {
      translatedText: specialTranslations[targetLang](textToConvert),
      detectedLanguage: sourceLang === "auto" ? actualSourceLang : undefined,
    };
  }

  // Handle Fictional and Ancient (Simulated)
  const fantasyRules: Record<string, (t: string) => string> = {
    klingon: (t) => "nuqneH! " + t.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 500)).join('') + " Qapla'!",
    vulcan: (t) => "Dif-tor heh smusma. " + t.split(' ').map(w => w.length > 3 ? w.split('').reverse().join('') : w).join(' '),
    hutt: (t) => "Chuba! " + t.split(' ').map(w => w.length > 3 ? 'Hutta' : 'nee').join(' ') + " kounah!",
    groot: () => "I am Groot. I am Groot, I am Groot!",
    minion: (t) => t.toLowerCase().replace(/[aeiou]/g, 'a') + " banana!",
    simlish: () => "Sul sul! Dag dag, nooboo? Ooboo shubi!",
    valyrian: (t) => "Valar Morghulis. " + t.split(' ').map(w => "v" + w.substring(1) + "is").join(' '),
    navi: (t) => "Oel ngati kameie. " + t.split('').map(c => c === 'a' ? 'ä' : c === 'e' ? 'ì' : c).join(''),
    dothraki: (t) => "M'athchomaroon! " + t.split(' ').map(w => w + "ak").join(' '),
    quenya: (t) => "Elen síla lúmenn' omentielvo. " + t.split('').map(c => c === 's' ? 'þ' : c).join(''),
    sindarin: (t) => "Mae govannen! " + t.split('').map(c => c === 'f' ? 'ph' : c).join(''),
    cybertronian: (textStr) => "Autobots, transform! " + textStr.split('').map(() => Math.random() > 0.5 ? '0' : '1').join(''),
    egyptian: (textStr) => "𓂀 " + textStr.toUpperCase().split('').map(c => String.fromCharCode(0x13000 + (c.charCodeAt(0) % 500))).join(''),
    runic: (textStr) => textStr.toUpperCase().split('').map(c => 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚻᚼᚽᚾᚿᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟ'[c.charCodeAt(0) % 40] || c).join(''),
    mayan: (textStr) => "🗿 " + textStr.split('').map(c => String.fromCharCode(0x1D2E0 + (c.charCodeAt(0) % 20))).join(''),
  };

  if (fantasyRules[targetLang]) {
    return {
      translatedText: fantasyRules[targetLang](text),
      detectedLanguage: sourceLang === "auto" ? actualSourceLang : undefined,
    };
  }

  // Handle Morse code as source
  if (actualSourceLang === "morse" || isMorseCode(text)) {
    const decodedText = morseToText(text);
    
    if (targetLang === "en") {
      return {
        translatedText: decodedText,
        detectedLanguage: "morse",
      };
    }
    
    // Translate decoded text to target language
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(decodedText)}&langpair=en|${targetLang}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return {
          translatedText: data.responseData.translatedText,
          detectedLanguage: "morse",
        };
      }
    } catch {
      return {
        translatedText: decodedText,
        detectedLanguage: "morse",
      };
    }
  }

  // Check for expressions
  const expressionInfo = findExpression(text, targetLang);

  try {
    // Use MyMemory Translation API (free, no key required)
    // Handle Chinese variants
    let apiSourceLang = actualSourceLang;
    let apiTargetLang = targetLang;
    
    if (apiSourceLang === "zh-CN") apiSourceLang = "zh";
    if (apiSourceLang === "zh-TW") apiSourceLang = "zh-TW";
    if (apiTargetLang === "zh-CN") apiTargetLang = "zh";
    
    const langPair = `${apiSourceLang}|${apiTargetLang}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      let translatedText = data.responseData.translatedText;

      // Check if translation is empty or same as source (API couldn't translate)
      if (!translatedText || translatedText.trim() === "" || 
          translatedText.includes("PLEASE SELECT TWO DISTINCT LANGUAGES") ||
          translatedText.includes("NO QUERY SPECIFIED") ||
          translatedText.includes("INVALID LANGUAGE PAIR")) {
        return {
          translatedText: "oh no, sorry this traduction doesn't exist",
          detectedLanguage: sourceLang === "auto" ? actualSourceLang : undefined,
        };
      }

      // If it's an expression and we have a better equivalent, suggest it
      if (expressionInfo?.equivalentExpression) {
        const apiTranslation = translatedText.toLowerCase();
        const equivalent = expressionInfo.equivalentExpression.toLowerCase();
        
        if (!apiTranslation.includes(equivalent.substring(0, 5))) {
          translatedText = expressionInfo.equivalentExpression;
        }
      }

      return {
        translatedText,
        detectedLanguage: sourceLang === "auto" ? actualSourceLang : undefined,
        expressionInfo: expressionInfo || undefined,
      };
    }

    // Check for matches array as fallback
    if (data.matches && data.matches.length > 0) {
      const bestMatch = data.matches[0];
      if (bestMatch.translation) {
        return {
          translatedText: bestMatch.translation,
          detectedLanguage: sourceLang === "auto" ? actualSourceLang : undefined,
          expressionInfo: expressionInfo || undefined,
        };
      }
    }

    // API returned an error status
    return {
      translatedText: "oh no, sorry this traduction doesn't exist",
      detectedLanguage: sourceLang === "auto" ? actualSourceLang : undefined,
    };
  } catch (error) {
    console.error("Translation error:", error);
    
    // Fallback: if we have an expression match, use it
    if (expressionInfo?.equivalentExpression) {
      return {
        translatedText: expressionInfo.equivalentExpression,
        detectedLanguage: sourceLang === "auto" ? actualSourceLang : undefined,
        expressionInfo,
      };
    }

    return {
      translatedText: "oh no, sorry this traduction doesn't exist",
      detectedLanguage: sourceLang === "auto" ? actualSourceLang : undefined,
    };
  }
};
