const ur = {
  meta: {
    siteTitle: "ZnPedia: JavaScript, React aur Next.js Roman Urdu mein",
    siteDescription:
      "JavaScript, React, Next.js aur production-grade best practices Roman Urdu mein seekhein. Har topic ek chhota, structured chapter: definition, examples, mistakes aur revision.",
    keywords: [
      "JavaScript in Urdu",
      "React in Urdu",
      "Next.js in Urdu",
      "Roman Urdu programming",
      "coding best practices in Urdu",
      "learn web development",
    ],
    coursesTitle: "Courses: JavaScript, React, Next.js aur Best Practices",
    coursesDescription:
      "ZnPedia ke tamam free courses: JavaScript, React, Next.js aur Best Practices, Roman Urdu mein chhote structured chapters ke saath.",
    courseTitle: (title: string) => `${title} Course Roman Urdu mein`,
    aboutTitle: "About ZnPedia",
    aboutDescription:
      "ZnPedia kya hai, kis ke liye hai aur content kaise likha jata hai. Roman Urdu mein free web development courses, chhote structured chapters ke saath.",
    privacyTitle: "Privacy Policy",
    privacyDescription:
      "ZnPedia koi account, tracking ya personal data collect nahi karta. Theme, language aur AI chats aapke browser mein rehte hain. Poori tafseel yahan.",
    assistantTitle: "AI Assistant: courses ke baare mein sawal poochein",
    assistantDescription:
      "ZnPedia AI Assistant se JavaScript, React, Next.js aur best practices ke sawal poochein. Jawab ZnPedia ke chapters se, Roman Urdu mein, sources ke saath.",
    termsTitle: "Terms of Use",
    termsDescription:
      "ZnPedia ka content kaise use kar sakte hain, accuracy ke baare mein note, aur site ke istemal ki aam shartein, Roman Urdu mein.",
    ogTagline: "Roman Urdu mein web development",
    ogChapterSubtitle: "Roman Urdu mein seekhein: definition, examples, mistakes aur revision.",
  },
  nav: {
    courses: "Courses",
    learningPath: "Learning path",
    about: "About",
    startLearning: "Start learning",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    courseOverview: "Course overview",
    skipToContent: "Skip to content",
    home: "Home",
    allCourses: "All courses",
    privacy: "Privacy",
    terms: "Terms",
    language: "Language",
    assistant: "AI Assistant",
  },
  theme: {
    toLight: "Light mode",
    toDark: "Dark mode",
  },
  footer: {
    tagline: (count: number) =>
      `JavaScript, React, Next.js aur best practices, Roman Urdu mein. ${count} chhote chapters, bilkul free.`,
    rights: "Free learning for every developer.",
    motto: "Roman Urdu mein web development",
    coursesGroup: "Courses",
    startGroup: "Start here",
    siteGroup: "ZnPedia",
    startLinks: {
      javascript: "JavaScript Introduction",
      react: "React Introduction",
      bestPractices: "Best Practices Introduction",
      readiness: "Production Readiness",
    },
  },
  hero: {
    badge: (chapters: number, courses: number) =>
      `${chapters} chapters, ${courses} courses, Roman Urdu mein`,
    titleStart: "Web development seekhein,",
    titleAccent: "apni zabaan",
    titleEnd: "mein",
    body: "JavaScript se Next.js aur production-grade best practices tak. Har topic ek chhota, focused chapter: definition, code example, common mistakes aur quick revision.",
    primary: "Pehla chapter parhein",
    secondary: "Saare courses dekhein",
    highlights: ["Bilkul free", "Koi signup nahi", "React 19.2 aur Next.js 16"],
    stats: {
      courses: "Courses",
      chapters: "Chapters",
      freeValue: "Free",
      freeLabel: "Hamesha",
      signupValue: "0",
      signupLabel: "Signup zaroori",
    },
    preview: {
      section: "Functions",
      position: "Chapter 16 / 47",
      readTime: "5 min read",
      definitionLabel: "Short definition",
      definition: "Closure woh function hai jo apne bahar wale scope ke variables yaad rakhta hai.",
      mistakeLabel: "Galati:",
      mistake: "loop mein var ke saath closure",
      betterLabel: "Behtar:",
      better: "let use karein, har iteration ka apna scope.",
    },
  },
  home: {
    coursesEyebrow: "Courses",
    coursesTitle: "Apna course chunein",
    coursesDescription:
      "Har course sections mein bata hua hai, aur har chapter par uska level likha hai.",
    anatomyEyebrow: "Har chapter ka structure",
    anatomyTitle: "Har chapter ek hi tarteeb mein",
    anatomyDescription:
      "Aapko pata hota hai aage kya aayega, is liye dhyan concept par rehta hai, layout par nahi.",
    pathEyebrow: "Learning path",
    pathTitle: "Kis tarteeb mein parhein",
    pathDescription:
      "Har course pichle wale par khara hai. Jo aata hai woh skip karein, jo nahi aata wahan se shuru karein.",
    whyEyebrow: "Kyun ZnPedia",
    whyTitle: "Seekhna aasaan, content kaam ka",
    whyDescription:
      "Bikhre tutorials ki jagah ek tarteeb, apni zabaan mein, aaj ke tools ke saath.",
    faqEyebrow: "FAQ",
    faqTitle: "Aksar pooche jane wale sawal",
    faqDescription: "Kuch aur poochna hai? About page par ZnPedia ke baare mein sab likha hai.",
    cta: {
      title: "Aaj ek chapter, kal ek aur",
      body: "Rozana 15 minute kaafi hain. Pehla chapter kholein aur dekhein structure kaise madad karta hai.",
      primary: "JavaScript se shuru karein",
      secondary: "Best Practices dekhein",
    },
  },
  valueProps: [
    {
      title: "Roman Urdu mein, seedhi baat",
      body: "Concept apni zabaan mein, technical terms English mein. Wahi words jo job aur docs mein milenge.",
    },
    {
      title: "Ek topic, ek chhota chapter",
      body: "Har chapter sirf ek cheez samjhata hai, 5 se 10 minute mein. Lambi videos ya bikhre notes nahi.",
    },
    {
      title: "Modern aur current",
      body: "React 19.2, Next.js 16 App Router, Cache Components aur aaj ka JavaScript. Purana tareeqa sirf comparison ke liye.",
    },
    {
      title: "Production-grade habits",
      body: "Best Practices course batata hai team mein code kaise likha, review aur ship kiya jata hai, aur kyun.",
    },
    {
      title: "Saaf learning path",
      body: "JavaScript se Next.js tak ek tarteeb. Har chapter batata hai pehle kya parhna hai aur baad mein kya.",
    },
    {
      title: "Free, bina signup",
      body: "Koi account, paywall ya ads nahi. Page kholo aur parhna shuru karo.",
    },
  ],
  anatomy: [
    { title: "Kya hai?", body: "Ek line ki definition, phir simple explanation." },
    { title: "Kyun zaroori hai?", body: "Kaunsa asli problem solve hota hai, before aur after." },
    { title: "Kahan use hota hai?", body: "Real projects ke examples." },
    { title: "Kaise kaam karta hai?", body: "Mental model, step by step flow." },
    { title: "Code example", body: "Chhota, runnable code aur har line ka matlab." },
    { title: "Common mistakes", body: "Galati, kyun, aur behtar tareeqa." },
    { title: "Aage kya?", body: "Pehle aur baad ke chapters ke links." },
    { title: "Quick revision", body: "Key points ek nazar mein." },
  ],
  path: {
    javascript: "Variables se async/await aur DOM tak, language ki mazboot buniyaad.",
    react: "Components, state aur hooks se interactive UI banana.",
    nextjs: "Routing, server components, data aur deployment ke saath full app.",
    "best-practices": "Clean code, security, testing aur team workflow, production ke liye.",
  } as Record<string, string>,
  faq: [
    {
      question: "Kya ZnPedia bilkul free hai?",
      answer: "Haan. Saare courses aur chapters free hain. Koi signup, subscription ya ads nahi.",
    },
    {
      question: "Mujhe kahan se shuru karna chahiye?",
      answer:
        "Agar programming nayi hai to JavaScript Introduction se. React ya Next.js aata hai to seedha Best Practices course parhein.",
    },
    {
      question: "Content Roman Urdu mein kyun hai?",
      answer:
        "Concept apni zabaan mein jaldi samajh aata hai. Technical terms English mein rakhe gaye hain taake official docs aur job interviews mein wahi words pehchaan sakein.",
    },
    {
      question: "Kya English mein bhi parh sakte hain?",
      answer:
        "Haan. Header mein language switcher se English chunein. Har chapter dono languages mein hai aur URL bhi alag hai.",
    },
    {
      question: "Ek chapter mein kitna waqt lagta hai?",
      answer:
        "Zyada tar chapters 4 se 10 minute mein parhe ja sakte hain, code khud chala kar dekhne ka waqt alag. Har page ke upar reading time likha hota hai.",
    },
    {
      question: "Best Practices course kis ke liye hai?",
      answer:
        "Un developers ke liye jo basics jaante hain aur ab production-grade code likhna, review karna aur ship karna seekhna chahte hain.",
    },
  ],
  courses: {
    title: "Saare courses",
    body: (courses: number, chapters: number) =>
      `${courses} courses, ${chapters} chapters. Har course sections mein bata hua hai aur har chapter par uska level likha hai, taake aap sahi jagah se shuru kar sakein.`,
    listLabel: "Course list",
    cta: {
      title: "Pata nahi kahan se shuru karein?",
      body: "Programming nayi hai to JavaScript Introduction parhein. React aata hai to Best Practices course aapke liye hai.",
      primary: "JavaScript Introduction",
      secondary: "Best Practices",
    },
  },
  card: {
    chapters: (count: number) => `${count} chapters`,
    sections: (count: number) => `${count} sections`,
    hours: (hours: number) => `~${hours} ghante`,
    start: "Shuru karein",
  },
  overview: {
    eyebrow: "Course",
    start: "Course shuru karein",
    chaptersLabel: "Chapters",
    sectionsLabel: "Sections",
    readingLabel: "Parhai",
    hours: (hours: number) => `~${hours} ghante`,
    chapterCount: (count: number) => `${count} chapters`,
  },
  chapter: {
    minRead: (minutes: number) => `${minutes} min read`,
    position: (current: number, total: number) => `Chapter ${current} / ${total}`,
    onThisPage: "On this page",
    previous: "Previous",
    next: "Next",
    pagination: "Chapter navigation",
    linkToSection: "Link to this section",
    fallbackTitle: "Translation abhi tayyar nahi",
    fallbackBody: "Yeh chapter abhi is language mein available nahi, is liye asal version dikhaya ja raha hai.",
    copyCode: "Code copy karein",
    copied: "Copy ho gaya",
  },
  mdx: {
    mistake: "Galati",
    why: "Why?",
    better: "Behtar",
    note: "Note",
  },
  search: {
    trigger: "Search chapters...",
    triggerLabel: "Search chapters",
    placeholder: "Chapter, topic ya keyword likhein...",
    tryLabel: "Try searching",
    loading: "Loading...",
    error: "Search load nahi ho saka. Page refresh karke dobara try karein.",
    empty: "\"{query}\" ke liye koi chapter nahi mila.",
    close: "Close search",
    results: "Search results",
    hintSelect: "↑↓ select",
    hintOpen: "Enter open",
    hintClose: "Esc close",
  },
  about: {
    title: "ZnPedia ke baare mein",
    intro: (courses: number, chapters: number) =>
      `ZnPedia ek free learning site hai jahan web development Roman Urdu aur English mein, chhote aur structured chapters mein sikhaya jata hai. Abhi ${courses} courses aur ${chapters} chapters hain.`,
    whoTitle: "Kis ke liye hai?",
    who: [
      { lead: "Naye developers", text: "jo programming apni zabaan mein samajhna chahte hain." },
      { lead: "Students", text: "jinhein university ke baad React aur Next.js jaise modern tools seekhne hain." },
      { lead: "Junior developers", text: "jo production-grade code likhna, review karna aur ship karna seekhna chahte hain." },
    ],
    howTitle: "Content kaise likha jata hai",
    principles: [
      { title: "Ek chapter, ek idea", body: "Har chapter sirf ek topic samjhata hai. Agar do cheezein hain to do chapters hain." },
      { title: "Pehle kyun, phir kaise", body: "Syntax se pehle yeh samjhana ke cheez kis problem ke liye bani hai. Is se yaad bhi rehta hai." },
      { title: "Current, purana nahi", body: "Examples React 19.2, Next.js 16 aur aaj ke JavaScript par hain. Purana tareeqa sirf farq dikhane ke liye." },
      { title: "Galtiyan bhi sikhati hain", body: "Har chapter mein common mistakes hain: kya galti hoti hai, kyun, aur behtar tareeqa kya hai." },
    ],
    languageTitle: "Do languages kyun?",
    languageBody:
      "Naya concept apni zabaan mein jaldi samajh aata hai, is liye har chapter Roman Urdu mein hai. Wahi chapter English mein bhi hai, taake aap official docs aur interviews ki zabaan bhi saath saath seekhein. Technical terms dono mein English hi hain.",
    startTitle: "Kahan se shuru karein?",
    startBody: {
      before: "Programming nayi hai to",
      javascript: "JavaScript Introduction",
      middle: " se. React aata hai to",
      bestPractices: "Best Practices",
      after: "course aapke liye hai. Poori tarteeb",
      path: "learning path",
      end: " mein hai.",
    },
    cta: {
      title: "Parhna shuru karein",
      body: "Koi signup nahi. Pehla chapter kholein aur 15 minute mein ek naya concept seekhein.",
      primary: "Pehla chapter",
      secondary: "Saare courses",
    },
  },
  assistant: {
    title: "AI Assistant",
    newChat: "Naya chat",
    history: "Pichle chats",
    emptyHistory: "Abhi koi chat nahi. Pehla sawal poochein.",
    deleteChat: "Chat delete karein",
    openSidebar: "Chats dikhayein",
    closeSidebar: "Chats band karein",
    backToSite: "ZnPedia par wapas",
    greeting: "Aaj kya seekhna hai?",
    greetingBody: "JavaScript, React, Next.js ya best practices ke baare mein kuch bhi poochein. Jawab ZnPedia ke chapters se aata hai, sources ke links ke saath.",
    placeholder: "Apna sawal likhein...",
    send: "Bhejein",
    stop: "Rokein",
    composerHint: "Enter se bhejein, Shift + Enter se nayi line",
    disclaimer: "AI ghalati kar sakta hai. Zaroori baat ko linked chapter se milayein.",
    you: "Aap",
    assistantName: "ZnPedia AI",
    thinking: "Chapters dekh raha hoon...",
    sources: "Sources",
    copy: "Jawab copy karein",
    copied: "Copy ho gaya",
    retry: "Dobara try karein",
    scopeLabel: "Kahan se jawab de",
    scopeAll: "Saare courses",
    scopeWholeCourse: "Poora course",
    scopeChapterHint: "Chapter",
    howItWorks: "Yeh kaise kaam karta hai?",
    howItWorksClose: "Band karein",
    howItWorksTitle: "AI Assistant kaise kaam karta hai",
    howItWorksIntro: "Assistant apni marzi se kuch nahi ghadta. Har jawab ZnPedia ke 175 chapters par based hota hai.",
    howItWorksSteps: [
      {
        title: "1. Aapka sawal",
        body: "Aap sawal likhte hain aur chunte hain ke jawab saare courses se aaye, ek course se, ya sirf ek chapter se.",
      },
      {
        title: "2. Chapters mein talaash",
        body: "Server har chapter ke sections (definition, examples, mistakes, revision) mein aapke alfaaz dhoondta hai aur sab se milte julte sections chunta hai.",
      },
      {
        title: "3. Gemini jawab likhta hai",
        body: "Wohi sections aur courses ki list Gemini (Google ka AI model) ko di jati hai. Gemini unhi ki buniyad par aapki language mein, examples ke saath jawab likhta hai.",
      },
      {
        title: "4. Sources ke saath",
        body: "Jawab ke neeche woh chapters dikhte hain jin se jawab bana. Link par click karke poora chapter parh sakte hain.",
      },
    ],
    howItWorksPrivacy: "Aapke chats sirf aapke browser mein save hote hain. Sawal jawab banane ke liye Google Gemini API ko bheja jata hai, ZnPedia apne server par chats store nahi karta.",
    suggestions: {
      general: [
        "Closure kya hota hai? Ek chhota example do.",
        "useEffect ka cleanup kab chalta hai?",
        "Server Actions aur Route Handlers mein kya fark hai?",
        "Acha commit message kaise likhte hain?",
      ],
      course: [
        "{name} kahan se shuru karun?",
        "{name} ke sab se important topics kaun se hain?",
        "{name} mein beginners ki common mistakes kya hain?",
        "{name} ke liye ek chhota practice project batao.",
      ],
      chapter: [
        "\"{name}\" ko aasan alfaaz mein samjhao.",
        "\"{name}\" ka ek aur example do.",
        "\"{name}\" mein common mistakes kya hain?",
        "\"{name}\" par mujh se 3 sawal ka quiz lo.",
      ],
    },
    errors: {
      not_configured: "AI Assistant abhi setup nahi hua. Thodi der baad try karein.",
      rate_limited: "Bohat zyada sawal ek saath. Kuch minute baad dobara poochein.",
      invalid_request: "Sawal bhejne mein masla hua. Chat chhota karke ya naya chat shuru karke try karein.",
      refused: "Is sawal ka jawab nahi diya ja sakta. Koi aur sawal poochein.",
      busy: "Assistant abhi masroof hai. Thodi der baad try karein.",
      failed: "Kuch ghalat ho gaya. Dobara try karein.",
      network: "Connection ka masla. Internet check karke dobara try karein.",
    },
    askTitle: "Kuch samajh nahi aaya?",
    askChapterBody: "AI Assistant se is chapter ke baare mein sawal poochein. Jawab isi chapter se aayega.",
    askCourseBody: "Is course ke kisi bhi topic par AI Assistant se sawal poochein.",
    askCta: "AI se poochein",
  },
  legal: {
    updatedLabel: "Last updated",
    updated: "7 November 2026",
    privacyIntro: "Seedhi baat: ZnPedia aapka personal data collect nahi karta.",
    termsIntro: "ZnPedia ka content istemal karne ki aam shartein, saaf alfaaz mein.",
    privacy: [
      {
        title: "Hum kya collect karte hain",
        body: [
          "ZnPedia par koi account, login ya form nahi hai. Hum aapka naam, email ya koi personal maloomat nahi maangte aur na store karte hain.",
          "Site par koi analytics, advertising ya tracking script nahi lagi hui.",
        ],
      },
      {
        title: "Aapke browser mein kya save hota hai",
        body: [
          "Aapka chuna hua theme (light ya dark) aur AI Assistant ke chats localStorage mein, aur chuni hui language ek chhoti cookie (NEXT_LOCALE) mein, taake agli baar wahi khule.",
          "Browser ki settings se aap inhein kabhi bhi clear kar sakte hain.",
        ],
      },
      {
        title: "AI Assistant",
        body: [
          "Jab aap AI Assistant se sawal poochte hain, to aapka sawal, us chat ke pichle messages aur milte julte chapter sections jawab banane ke liye Google ki Gemini API ko bheje jate hain. Google yeh data Gemini API ki apni terms ke tehat process karta hai.",
          "ZnPedia aapke chats apne server par store nahi karta. Ghalat istemal rokne ke liye server kuch minute tak har IP address ki requests sirf memory mein ginta hai.",
          "Chat mein apni personal ya sensitive maloomat na likhein.",
        ],
      },
      {
        title: "Server logs",
        body: [
          "Hosting provider apne aam security aur performance logs rakh sakta hai, jaise IP address aur request ka waqt. Yeh logs hum kisi aur maqsad ke liye use nahi karte.",
        ],
      },
      {
        title: "Tabdeeliyan",
        body: [
          "Agar aage koi feature aaya jo data collect kare, to yeh page pehle update hoga aur upar wali date badlegi.",
        ],
      },
    ],
    terms: [
      {
        title: "Content ka istemal",
        body: [
          "ZnPedia ka content seekhne ke liye free hai. Aap chapters parh sakte hain, code examples apne projects mein use kar sakte hain aur links share kar sakte hain.",
          "Poore chapters copy karke kisi aur site par apne naam se publish karna allowed nahi.",
        ],
      },
      {
        title: "Accuracy",
        body: [
          "Content ko current aur durust rakhne ki poori koshish ki jati hai, lekin libraries aur frameworks badalte rehte hain. Production mein koi bhi code lagane se pehle official documentation se zaroor milayein.",
        ],
      },
      {
        title: "AI Assistant ke jawab",
        body: [
          "AI Assistant ke jawab ZnPedia ke chapters se khud ba khud bante hain aur in mein ghalati ho sakti hai. Inhein parhai mein madad samjhein, aur bharosa karne se pehle linked chapter ya official documentation se milayein.",
          "Assistant ko seekhne ke ilawa kisi aur kaam ke liye use na karein aur na hi isay ghalat tareeqe se istemal karein. Requests ki limit lagi hui hai.",
        ],
      },
      {
        title: "Koi guarantee nahi",
        body: [
          "Content jaisa hai waisa diya jata hai. Is ke istemal se hone wale kisi nuqsaan ki zimmedari ZnPedia par nahi.",
        ],
      },
      {
        title: "Tabdeeliyan",
        body: [
          "Yeh terms waqt ke saath update ho sakti hain. Upar wali date batati hai ke aakhri tabdeeli kab hui.",
        ],
      },
    ],
  },
};

export type Dictionary = typeof ur;

export default ur;
