/* ============================================================
   DONNÉES DU CALENDRIER DE L'AVENT
   ============================================================
   C'est le SEUL fichier à modifier pour personnaliser ton
   calendrier. Aucune connaissance en programmation n'est requise.

   - CALENDAR_YEAR : l'année de ton calendrier (ex: 2025).
     Le jour N s'ouvre automatiquement le N décembre de cette année.
     Tu peux surcharger une date précise avec "unlockDate" (format
     "AAAA-MM-JJ") si tu veux un fonctionnement différent.

   - CALENDAR_DAYS : un tableau de 24 objets, un par jour.
     Pour chaque jour tu peux définir :
       day          -> numéro du jour (1 à 24), obligatoire
       title        -> titre affiché dans la fenêtre
       description  -> texte facultatif
       link         -> URL vers laquelle le bouton doit pointer
       linkText     -> texte du bouton (ex: "Découvrir")
       unlockDate   -> (facultatif) "AAAA-MM-JJ" pour surcharger
                       la date de déverrouillage automatique
   ============================================================ */

const CALENDAR_YEAR = 2025;

const CALENDAR_DAYS = [
  { day: 1,  title: "Premier flocon",        description: "Le compte à rebours commence.",         link: "https://example.com/1",  linkText: "Ouvrir" },
  { day: 2,  title: "Étincelle du jour",      description: "Une petite surprise scintillante.",     link: "https://example.com/2",  linkText: "Ouvrir" },
  { day: 3,  title: "Chocolat chaud",         description: "Un moment cocooning s'impose.",         link: "https://example.com/3",  linkText: "Ouvrir" },
  { day: 4,  title: "Guirlande dorée",        description: "",                                      link: "https://example.com/4",  linkText: "Ouvrir" },
  { day: 5,  title: "Cinquième bougie",       description: "La magie continue de s'installer.",     link: "https://example.com/5",  linkText: "Ouvrir" },
  { day: 6,  title: "Saint-Nicolas",          description: "Une pensée pour les gourmands.",         link: "https://example.com/6",  linkText: "Ouvrir" },
  { day: 7,  title: "Semaine de féerie",      description: "",                                      link: "https://example.com/7",  linkText: "Ouvrir" },
  { day: 8,  title: "Flocon d'argent",        description: "",                                      link: "https://example.com/8",  linkText: "Ouvrir" },
  { day: 9,  title: "Étoile filante",         description: "Fais un vœu.",                          link: "https://example.com/9",  linkText: "Ouvrir" },
  { day: 10, title: "Dixième jour",           description: "Déjà presque la moitié !",              link: "https://example.com/10", linkText: "Ouvrir" },
  { day: 11, title: "Ruban rouge",            description: "",                                      link: "https://example.com/11", linkText: "Ouvrir" },
  { day: 12, title: "Mi-décembre",            description: "L'ambiance de Noël s'installe.",        link: "https://example.com/12", linkText: "Ouvrir" },
  { day: 13, title: "Boule dorée",            description: "",                                      link: "https://example.com/13", linkText: "Ouvrir" },
  { day: 14, title: "Quatorzième lumière",    description: "",                                      link: "https://example.com/14", linkText: "Ouvrir" },
  { day: 15, title: "Neige douce",            description: "Un peu de calme avant les fêtes.",      link: "https://example.com/15", linkText: "Ouvrir" },
  { day: 16, title: "Clochettes",             description: "",                                      link: "https://example.com/16", linkText: "Ouvrir" },
  { day: 17, title: "Étoile scintillante",    description: "",                                      link: "https://example.com/17", linkText: "Ouvrir" },
  { day: 18, title: "Sapin illuminé",         description: "Plus que quelques jours.",              link: "https://example.com/18", linkText: "Ouvrir" },
  { day: 19, title: "Douceur d'hiver",        description: "",                                      link: "https://example.com/19", linkText: "Ouvrir" },
  { day: 20, title: "Vingtième jour",         description: "L'attente devient délicieuse.",         link: "https://example.com/20", linkText: "Ouvrir" },
  { day: 21, title: "Solstice",               description: "La nuit la plus longue de l'année.",    link: "https://example.com/21", linkText: "Ouvrir" },
  { day: 22, title: "Derniers préparatifs",   description: "",                                      link: "https://example.com/22", linkText: "Ouvrir" },
  { day: 23, title: "Veille de veille",       description: "L'excitation monte.",                   link: "https://example.com/23", linkText: "Ouvrir" },
  { day: 24, title: "Joyeux Noël !",          description: "Le grand jour est arrivé. ✨",           link: "https://example.com/24", linkText: "Découvrir" }
];
