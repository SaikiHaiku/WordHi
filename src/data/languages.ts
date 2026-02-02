export type LanguageCategory = 'Monde Réel' | 'Galactique & Fiction' | 'Ancien & Historique' | 'Technologie & Code' | 'Fun & Secret';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  category: LanguageCategory;
  origin: string;
}

export const languages: Language[] = [
  // --- MONDE RÉEL ---
  { code: "auto", name: "Détection automatique", nativeName: "Auto", flag: "🔍", category: 'Monde Réel', origin: 'Algorithme WordHi' },
  { code: "fr", name: "Français", nativeName: "Français", flag: "🇫🇷", category: 'Monde Réel', origin: 'France, Europe - Évolué du Latin' },
  { code: "en", name: "Anglais", nativeName: "English", flag: "🇬🇧", category: 'Monde Réel', origin: 'Angleterre, Royaume-Uni - Influence Germanique' },
  { code: "es", name: "Espagnol", nativeName: "Español", flag: "🇪🇸", category: 'Monde Réel', origin: 'Espagne, Europe - Royaume de Castille' },
  { code: "de", name: "Allemand", nativeName: "Deutsch", flag: "🇩🇪", category: 'Monde Réel', origin: 'Allemagne, Europe Centrale' },
  { code: "it", name: "Italien", nativeName: "Italiano", flag: "🇮🇹", category: 'Monde Réel', origin: 'Italie, Europe - Descendant direct du Latin' },
  { code: "pt", name: "Portugais", nativeName: "Português", flag: "🇵🇹", category: 'Monde Réel', origin: 'Portugal & Brésil - Péninsule Ibérique' },
  { code: "ru", name: "Russe", nativeName: "Русский", flag: "🇷🇺", category: 'Monde Réel', origin: 'Russie, Eurasie - Langue Slave' },
  { code: "zh-CN", name: "Chinois (Simplifié)", nativeName: "简体中文", flag: "🇨🇳", category: 'Monde Réel', origin: 'Chine, Asie - Dynasties Millénaires' },
  { code: "ja", name: "Japonais", nativeName: "日本語", flag: "🇯🇵", category: 'Monde Réel', origin: 'Japon, Asie - Archipel Nippon' },
  { code: "ko", name: "Coréen", nativeName: "한국어", flag: "🇰🇷", category: 'Monde Réel', origin: 'Corée, Asie - Invention du Hangeul (1443)' },
  { code: "ar", name: "Arabe", nativeName: "العربية", flag: "🇸🇦", category: 'Monde Réel', origin: 'Péninsule Arabique, Moyen-Orient' },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", category: 'Monde Réel', origin: 'Inde, Asie du Sud - Racine Sanskrit' },
  { code: "el", name: "Grec", nativeName: "Ελληνικά", flag: "🇬🇷", category: 'Monde Réel', origin: 'Grèce, Europe - Berceau de la Civilisation' },
  { code: "nl", name: "Néerlandais", nativeName: "Nederlands", flag: "🇳🇱", category: 'Monde Réel', origin: 'Pays-Bas, Europe' },
  { code: "pl", name: "Polonais", nativeName: "Polski", flag: "🇵🇱", category: 'Monde Réel', origin: 'Pologne, Europe Centrale' },
  { code: "tr", name: "Turc", nativeName: "Türkçe", flag: "🇹🇷", category: 'Monde Réel', origin: 'Turquie, Anatolie' },
  { code: "sv", name: "Suédois", nativeName: "Svenska", flag: "🇸🇪", category: 'Monde Réel', origin: 'Suède, Scandinavie' },
  { code: "vi", name: "Vietnamien", nativeName: "Tiếng Việt", flag: "🇻🇳", category: 'Monde Réel', origin: 'Vietnam, Asie du Sud-Est' },
  { code: "th", name: "Thaï", nativeName: "ไทย", flag: "🇹🇭", category: 'Monde Réel', origin: 'Thaïlande, Asie du Sud-Est' },
  { code: "he", name: "Hébreu", nativeName: "עברית", flag: "🇮🇱", category: 'Monde Réel', origin: 'Israël, Moyen-Orient - Langue Biblique' },

  // --- GALACTIQUE & FICTION ---
  { code: "klingon", name: "Klingon", nativeName: "tlhIngan Hol", flag: "🖖", category: 'Galactique & Fiction', origin: 'Empire Klingon, Planète Qo\'noS (Star Trek)' },
  { code: "vulcan", name: "Vulcain", nativeName: "Vuhlkansu", flag: "🖖", category: 'Galactique & Fiction', origin: 'Planète Vulcain (Star Trek)' },
  { code: "hutt", name: "Huttese", nativeName: "Huttese", flag: "🐌", category: 'Galactique & Fiction', origin: 'Nal Hutta & Tatooine (Star Wars)' },
  { code: "quenya", name: "Elfique (Quenya)", nativeName: "Quenya", flag: "🧝", category: 'Galactique & Fiction', origin: 'Aman, Terres du Milieu (J.R.R. Tolkien)' },
  { code: "sindarin", name: "Elfique (Sindarin)", nativeName: "Sindarin", flag: "🍃", category: 'Galactique & Fiction', origin: 'Beleriand, Terres du Milieu (J.R.R. Tolkien)' },
  { code: "dothraki", name: "Dothraki", nativeName: "Dothraki", flag: "🐎", category: 'Galactique & Fiction', origin: 'Mer Dothrak, Essos (Game of Thrones)' },
  { code: "valyrian", name: "Haut Valyrien", nativeName: "Valyrio", flag: "🐉", category: 'Galactique & Fiction', origin: 'Possession Valyrienne, Essos (Game of Thrones)' },
  { code: "navi", name: "Na'vi", nativeName: "Na'vi", flag: "💙", category: 'Galactique & Fiction', origin: 'Lune Pandora (Avatar, James Cameron)' },
  { code: "groot", name: "Groot", nativeName: "I am Groot", flag: "🌳", category: 'Galactique & Fiction', origin: 'Planète X, Flora colossus (Marvel)' },
  { code: "minion", name: "Minionnais", nativeName: "Banana", flag: "🍌", category: 'Galactique & Fiction', origin: 'Laboratoire de Gru (Moi, Moche et Méchant)' },
  { code: "simlish", name: "Simlish", nativeName: "Simlish", flag: "💎", category: 'Galactique & Fiction', origin: 'Le Monde des Sims (Maxis)' },
  { code: "cybertronian", name: "Cybertronien", nativeName: "Cybertronian", flag: "🤖", category: 'Galactique & Fiction', origin: 'Planète Cybertron (Transformers)' },

  // --- ANCIEN & HISTORIQUE ---
  { code: "latin", name: "Latin", nativeName: "Latina", flag: "🏛️", category: 'Ancien & Historique', origin: 'Latium, Empire Romain (753 av. J.-C.)' },
  { code: "egyptian", name: "Hiéroglyphes", nativeName: "Medu Netjer", flag: "𓂀", category: 'Ancien & Historique', origin: 'Vallée du Nil, Égypte Antique' },
  { code: "runic", name: "Runes Nordiques", nativeName: "Futhark", flag: "ᚠ", category: 'Ancien & Historique', origin: 'Scandinavie, Âge des Vikings' },
  { code: "mayan", name: "Mayan (Glyphes)", nativeName: "Mayan", flag: "🗿", category: 'Ancien & Historique', origin: 'Mésoamérique, Civilisation Maya' },
  { code: "sanskrit", name: "Sanskrit", nativeName: "संस्कृतम्", flag: "🕉️", category: 'Ancien & Historique', origin: 'Inde Antique, Langue Sacrée des Védas' },
  { code: "old_english", name: "Vieil Anglais", nativeName: "Ænglisc", flag: "📜", category: 'Ancien & Historique', origin: 'Angleterre Anglo-Saxonne (Beowulf)' },

  // --- TECHNOLOGIE & CODE ---
  { code: "binary", name: "Binaire", nativeName: "010101", flag: "🔢", category: 'Technologie & Code', origin: 'Cœur des Processeurs (Algèbre de Boole)' },
  { code: "hex", name: "Hexadécimal", nativeName: "0xABC", flag: "十六", category: 'Technologie & Code', origin: 'Informatique de bas niveau / Couleurs Web' },
  { code: "morse", name: "Code Morse", nativeName: "...---...", flag: "📡", category: 'Technologie & Code', origin: 'Télégraphie (Samuel Morse, 1836)' },
  { code: "js", name: "JavaScript", nativeName: "JS/Node", flag: "🟨", category: 'Technologie & Code', origin: 'Netscape Navigator (Brendan Eich, 1995)' },
  { code: "python", name: "Python", nativeName: "Python", flag: "🐍", category: 'Technologie & Code', origin: 'CWI, Pays-Bas (Guido van Rossum, 1991)' },
  { code: "base64", name: "Base64", nativeName: "YmFzZTY0", flag: "📦", category: 'Technologie & Code', origin: 'Encodage de données binaires en texte' },
  { code: "brainfuck", name: "Brainfuck", nativeName: "++++++++++", flag: "🧠", category: 'Technologie & Code', origin: 'Langage ésotérique (Urban Müller, 1993)' },

  // --- FUN & SECRET ---
  { code: "leet", name: "Leet Speak", nativeName: "|_337", flag: "🎮", category: 'Fun & Secret', origin: 'BBS & Culture Hacker des années 80' },
  { code: "emojify", name: "Emojify", nativeName: "😀🙌🔥", flag: "✨", category: 'Fun & Secret', origin: 'Internet Moderne & Smartphones' },
  { code: "pig_latin", name: "Pig Latin", nativeName: "Ig-pay Atin-lay", flag: "🐷", category: 'Fun & Secret', origin: 'Jeux linguistiques enfantins (Anglais)' },
  { code: "reverse", name: "Texte Inversé", nativeName: "ésrevnI", flag: "🔄", category: 'Fun & Secret', origin: 'Dimension Parallèle WordHi' },
  { code: "uwu", name: "Uwu-fication", nativeName: "Uwu", flag: "🐱", category: 'Fun & Secret', origin: 'Culture Internet / Esthétique Kawaii' },
  { code: "pirate", name: "Pirate", nativeName: "Arrgh!", flag: "🏴‍☠️", category: 'Fun & Secret', origin: 'Sept Mers & Caraïbes (XVIIe siècle)' }
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find((l) => l.code === code);
};

export const getLanguageName = (code: string): string => {
  const lang = getLanguageByCode(code);
  return lang ? lang.name : code;
};

export const getLanguageFlag = (code: string): string => {
  const lang = getLanguageByCode(code);
  return lang?.flag || "🌐";
};
