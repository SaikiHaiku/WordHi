export interface Expression {
  original: string;
  language: string;
  meaning: string;
  translations: { [key: string]: string };
}

export const expressions: Expression[] = [
  {
    original: "C'est la vie",
    language: "fr",
    meaning: "That's life / Such is life",
    translations: {
      en: "That's life",
      es: "Así es la vida",
      de: "So ist das Leben",
      it: "Così è la vita",
      pt: "É a vida",
      ar: "هذه هي الحياة",
      zh: "这就是生活",
      ja: "人生とはそういうものだ",
    },
  },
  {
    original: "It's raining cats and dogs",
    language: "en",
    meaning: "Il pleut très fort",
    translations: {
      fr: "Il pleut des cordes",
      es: "Llueve a cántaros",
      de: "Es regnet in Strömen",
      it: "Piove a catinelle",
      pt: "Está chovendo canivetes",
      ar: "تمطر بغزارة",
      zh: "倾盆大雨",
      ja: "土砂降りだ",
    },
  },
  {
    original: "Break a leg",
    language: "en",
    meaning: "Bonne chance (au théâtre)",
    translations: {
      fr: "Merde ! (au théâtre)",
      es: "¡Mucha mierda!",
      de: "Hals- und Beinbruch",
      it: "In bocca al lupo",
      pt: "Boa sorte",
      ar: "بالتوفيق",
      zh: "祝你好运",
      ja: "頑張って",
    },
  },
  {
    original: "Avoir le cafard",
    language: "fr",
    meaning: "Être triste, déprimé",
    translations: {
      en: "To feel blue / To be down in the dumps",
      es: "Estar deprimido",
      de: "Trübsal blasen",
      it: "Essere giù di morale",
      pt: "Estar na fossa",
      ar: "أن تكون حزيناً",
      zh: "感到沮丧",
      ja: "落ち込む",
    },
  },
  {
    original: "Coûter les yeux de la tête",
    language: "fr",
    meaning: "Être très cher",
    translations: {
      en: "To cost an arm and a leg",
      es: "Costar un ojo de la cara",
      de: "Ein Vermögen kosten",
      it: "Costare un occhio della testa",
      pt: "Custar os olhos da cara",
      ar: "يكلف ثروة",
      zh: "非常昂贵",
      ja: "目の玉が飛び出るほど高い",
    },
  },
  {
    original: "Piece of cake",
    language: "en",
    meaning: "Très facile",
    translations: {
      fr: "C'est du gâteau / Les doigts dans le nez",
      es: "Pan comido",
      de: "Ein Kinderspiel",
      it: "È una passeggiata",
      pt: "Moleza / Mamão com açúcar",
      ar: "سهل جداً",
      zh: "小菜一碟",
      ja: "朝飯前",
    },
  },
  {
    original: "Meter la pata",
    language: "es",
    meaning: "Faire une gaffe",
    translations: {
      fr: "Mettre les pieds dans le plat",
      en: "To put one's foot in it",
      de: "Ins Fettnäpfchen treten",
      it: "Fare una gaffe",
      pt: "Pisar na bola",
      ar: "ارتكاب خطأ",
      zh: "说错话",
      ja: "ドジを踏む",
    },
  },
  {
    original: "Tomber dans les pommes",
    language: "fr",
    meaning: "S'évanouir",
    translations: {
      en: "To pass out / To faint",
      es: "Desmayarse",
      de: "In Ohnmacht fallen",
      it: "Svenire",
      pt: "Desmaiar",
      ar: "يغمى عليه",
      zh: "晕倒",
      ja: "気を失う",
    },
  },
  {
    original: "Quando i maiali voleranno",
    language: "it",
    meaning: "Jamais / Quand les poules auront des dents",
    translations: {
      fr: "Quand les poules auront des dents",
      en: "When pigs fly",
      es: "Cuando las vacas vuelen",
      de: "Wenn Schweine fliegen können",
      pt: "Quando as galinhas tiverem dentes",
      ar: "عندما تطير الخنازير",
      zh: "太阳从西边出来",
      ja: "豚が空を飛んだら",
    },
  },
  {
    original: "Poser un lapin",
    language: "fr",
    meaning: "Ne pas venir à un rendez-vous",
    translations: {
      en: "To stand someone up",
      es: "Dejar plantado",
      de: "Jemanden versetzen",
      it: "Dare buca",
      pt: "Dar um bolo",
      ar: "لم يحضر الموعد",
      zh: "放鸽子",
      ja: "すっぽかす",
    },
  },
  {
    original: "The ball is in your court",
    language: "en",
    meaning: "C'est à toi de jouer",
    translations: {
      fr: "La balle est dans ton camp",
      es: "La pelota está en tu tejado",
      de: "Der Ball liegt bei dir",
      it: "La palla è nel tuo campo",
      pt: "A bola está do seu lado",
      ar: "القرار بيدك",
      zh: "现在轮到你了",
      ja: "あなた次第です",
    },
  },
  {
    original: "Avoir un chat dans la gorge",
    language: "fr",
    meaning: "Avoir la voix enrouée",
    translations: {
      en: "To have a frog in one's throat",
      es: "Tener carraspera",
      de: "Einen Frosch im Hals haben",
      it: "Avere un groppo in gola",
      pt: "Estar rouco",
      ar: "صوت أجش",
      zh: "嗓子不舒服",
      ja: "声がかすれる",
    },
  },
];

export const detectExpression = (text: string): Expression | null => {
  const lowerText = text.toLowerCase().trim();
  return (
    expressions.find((exp) => lowerText.includes(exp.original.toLowerCase())) ||
    null
  );
};
