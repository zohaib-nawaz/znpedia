import type { LegalSection } from "@/components/legal-page";

export const LEGAL_UPDATED = "1 November 2026";

export const privacySections: LegalSection[] = [
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
      "Sirf ek cheez: aapka chuna hua theme (light ya dark), taake agli baar wahi khule. Yeh aapke browser ke localStorage mein rehta hai aur hamare server tak nahi aata.",
      "Browser ki settings se aap ise kabhi bhi clear kar sakte hain.",
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
];

export const termsSections: LegalSection[] = [
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
];
