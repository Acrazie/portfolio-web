---
name: Mayeul Portfolio
description: Un portfolio éditorial noir et blanc, introduit par un unique héros bleu-violet vivant.
colors:
  paper: "#ffffff"
  ink: "#000000"
  ink-muted: "rgb(0 0 0 / 62%)"
  rule: "rgb(0 0 0 / 18%)"
  input-rule: "rgb(0 0 0 / 24%)"
  control-secondary: "oklch(0.97 0 0)"
  control-muted: "oklch(0.556 0 0)"
  control-accent: "oklch(0.97 0 0)"
  control-destructive: "oklch(0.577 0.245 27.325)"
  control-ring: "oklch(0.708 0 0)"
  hero-midnight: "#020617"
  hero-navy: "#071a62"
  hero-indigo: "#4338ca"
  hero-blue: "rgb(38 96 255 / 90%)"
  hero-violet: "rgb(96 48 255 / 82%)"
  hero-lavender: "rgb(126 154 255 / 68%)"
  hero-cobalt: "rgb(18 62 221 / 78%)"
  hero-indigo-bloom: "rgb(92 72 255 / 62%)"
  hero-top-shade: "rgb(0 4 26 / 52%)"
typography:
  hero-name:
    fontFamily: '"Hanken Grotesk Variable", "Hanken Grotesk", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(4rem, 10vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  page-title:
    fontFamily: '"Hanken Grotesk Variable", "Hanken Grotesk", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(3.75rem, 9vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  section-title:
    fontFamily: '"Hanken Grotesk Variable", "Hanken Grotesk", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(2.5rem, 5vw, 5rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  editorial-lead:
    fontFamily: '"Hanken Grotesk Variable", "Hanken Grotesk", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "normal"
  editorial-heading:
    fontFamily: '"Hanken Grotesk Variable", "Hanken Grotesk", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1.25em"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  editorial-body:
    fontFamily: '"Hanken Grotesk Variable", "Hanken Grotesk", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  body:
    fontFamily: '"Hanken Grotesk Variable", "Hanken Grotesk", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  control:
    fontFamily: '"Hanken Grotesk Variable", "Hanken Grotesk", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4286
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
spacing:
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "7": "28px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "24": "96px"
  "28": "112px"
  "32": "128px"
  "36": "144px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.control}"
    rounded: "{rounded.lg}"
    padding: "6px 10px"
    height: "32px"
  button-secondary:
    backgroundColor: "{colors.control-secondary}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.lg}"
    padding: "6px 10px"
    height: "32px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.lg}"
    padding: "6px 10px"
    height: "32px"
  input-contact:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.lg}"
    padding: "4px 10px"
    height: "32px"
  menu-control:
    backgroundColor: "{colors.control-secondary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    size: "32px"
  header-navigation:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "0px"
    width: "100%"
    height: "80px"
  editorial-action:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.lg}"
    padding: "6px 0"
    height: "32px"
  editorial-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "0px"
    padding: "40px 0"
    width: "100%"
  gradient-hero:
    backgroundColor: "{colors.hero-midnight}"
    textColor: "{colors.paper}"
    rounded: "0px"
    width: "100%"
    height: "max(760px, 100svh)"
---

# Design System: Mayeul Portfolio

## Overview

**Creative North Star: "La table de revue"**

La table de revue présente le travail de Mayeul comme un dossier précis, calme et immédiatement lisible. Après un premier viewport atmosphérique, l’interface se réduit volontairement à du noir, du blanc, des règles fines et des champs ouverts. Aucun décor ne concurrence les faits, les parcours courts ou les destinations utiles.

Un seul événement visuel rompt ce régime éditorial: le héros d’accueil est entièrement occupé par un Canvas 2D bleu, violet et lavande. Son large fondu blanc, symétrique autour de l’axe vertical, absorbe la couleur avant le contenu. Sur pointeur fin, le déplacement réel du curseur libère un nuage compact et lent de `>`, `_`, `o`, `/` et `+`. Ces particules restent libres sur presque tout le Canvas; seules celles qui traversent le champ étroit du mot caché se rangent dans sa matrice ASCII. Elles-mêmes dessinent progressivement « Bienvenue » ou « Welcome » sur une seule ligne, avec chaque lettre définie sur une grille de 7 × 9. La version française mobilise 217 glyphes persistants, distincts du nuage libre plafonné à 120. Ce geste constitue la signature du portfolio; toutes les autres surfaces restent strictement monochromes et sans effet de matière.

Le système privilégie une hiérarchie franche, une densité basse et des contrôles compacts. Hanken Grotesk maintient une voix unique, humaine et technique. shadcn `base-nova` fournit les composants possédés par le projet, Base UI leurs primitives interactives et CVA leurs variantes. Les compositions restent fondées sur des lignes et des alignements plutôt que sur des cartes répétées.

**Key Characteristics:**

- Grandes surfaces ordinaires noires ou blanches; contrôles neutral `base-nova` autorisés.
- Bleu, violet et lavande confinés au Canvas du héros et à son fondu blanc.
- Hanken Grotesk variable auto-hébergée pour toute la voix éditoriale et interactive.
- Titres réguliers de 400 à 500; intertitres de contenu long à 600.
- Rayons de 6 à 14px, contrôles compacts, anneaux neutral et règles de 1px.
- Espaces ouverts, peu d’objets, aucune collection de cartes.
- Un seul mouvement signature, robuste au SSR, à la réduction de mouvement et à la suspension.

## Colors

Le système possède deux régimes principaux: noir et blanc pour les grandes surfaces éditoriales; neutral `base-nova` pour les contrôles et overlays. Le spectre froid reste réservé au héros d’accueil.

### Primary

- **Encre franche** (`ink`): texte, fonds inversés, actions principales, anneaux de focus et sélection.
- **Papier net** (`paper`): fond de lecture, texte inversé, contrôles clairs et résolution finale du héros.

### Secondary

- **Nuit du héros** (`hero-midnight`, `hero-navy`, `hero-indigo`): base verticale sombre du Canvas et de son repli statique.
- **Bleu vivant** (`hero-blue`, `hero-cobalt`): masses radiales principales, toujours peintes dans le Canvas.
- **Violet vivant** (`hero-violet`, `hero-indigo-bloom`): masses secondaires et profondeur froide du Canvas.
- **Lavande de respiration** (`hero-lavender`): lumière haute et plus douce du Canvas.
- **Voile supérieur** (`hero-top-shade`): maintien du contraste blanc dans le haut du premier viewport.

### Neutral

- **Encre secondaire** (`ink-muted`): corps et métadonnées secondaires sur papier.
- **Règle éditoriale** (`rule`): séparateurs, contours et états actifs à faible contraste.
- **Règle de champ** (`input-rule`): ancienne référence éditoriale conservée pour les rangées existantes.
- **Neutral shadcn** (`control-secondary`, `control-muted`, `control-accent`, `control-ring`): boutons secondaires, champs, survols, textes atténués et focus.
- **Destructive** (`control-destructive`): erreurs de formulaire uniquement.

**The Chromatic Quarantine Rule.** Toute couleur expressive reste dans le Canvas du héros et son fondu. Seul le rouge `destructive` peut sortir de cette zone pour signaler une erreur réelle.

**The Two-Surface Rule.** Hors héros, toute grande surface reste noire ou blanche. Les tons neutral sont réservés aux composants interactifs, aux champs et aux overlays.

**The No Theme Rule.** Le portfolio reste en mode clair explicite avec sections noires inversées; ne pas ajouter de thème sombre, de bascule de thème ou de palette parallèle.

## Typography

**Display Font:** Hanken Grotesk Variable, auto-hébergée via `@fontsource-variable/hanken-grotesk`, avec Hanken Grotesk puis la pile sans-serif système en repli.

**Body Font:** Hanken Grotesk Variable, avec la même pile de repli.

**Character:** Une seule néo-grotesque tient ensemble présence éditoriale et précision technique. Les grands titres gagnent leur autorité par l’échelle, la compression et l’espace; aucun traitement coloré, dégradé ou décoratif n’est nécessaire.

### Hierarchy

- **Hero Name** (500, fluide jusqu’à 6rem, 0.9): MAYEUL en capitales dans le premier viewport.
- **Hero Role and Statement** (400–500, fluide jusqu’à 3rem, 1.02–1.28): position professionnelle puis phrase courte; contraste blanc légèrement abaissé pour la phrase.
- **Page Title** (500, fluide jusqu’à 6rem, 0.92): titres de route, blancs sur noir ou noirs sur blanc.
- **Section Title** (500, fluide jusqu’à 5rem, 0.96): ouvertures de section et titres de projet majeurs.
- **Editorial Lead** (400, fluide jusqu’à 2.5rem, 1.18): introduction About uniquement, sans devenir un second titre.
- **Editorial Heading** (600, échelle relative, 1.3–1.5): intertitres du `typeset` shadcn dans About et Project detail; Education applique également 600 à ses intitulés d’établissement.
- **Editorial Body** (400, 1.125rem, 1.7): lecture longue dans une colonne de 68–70ch.
- **Body** (400, 1rem, 1.75): résumés, légendes et descriptions courtes, généralement limités à 54–62ch.
- **Control** (500, 0.875rem, 1.4286): boutons, navigation et actions textuelles; la marque intérieure et certains labels structurants montent à 600.

**The One Voice Rule.** Hanken Grotesk porte titres, corps, navigation et contrôles. Une police mono peut servir au code livré par `typeset`, mais ne devient jamais voix de marque ou motif de terminal.

**The Weight Separation Rule.** Le héros et les grands titres restent réguliers à moyens (400–500); le poids 600 appartient aux intertitres de lecture et aux petits repères structurants.

**The Plain Type Rule.** Ne jamais appliquer de dégradé, contour, ombre ou remplissage chromatique au texte.

## Layout

Le contenu s’aligne sur un conteneur centré de 96rem maximum. Ses marges latérales passent de 20px à 40px au premier palier, puis à 64px sur grand écran. Les pages respirent avec 80–96px de rythme vertical sur petit écran et 112–144px sur grand écran; les groupes internes utilisent surtout 20–40px.

Le héros remplit au moins `100svh`, avec un plancher de 760px sur la page d’accueil. Navigation et contenu sont superposés au Canvas; le bloc identitaire descend dans la moitié basse tandis que le fondu blanc occupe largement la sortie du viewport. La couleur résout complètement vers le blanc avant la section suivante.

Les compositions passent de la pile à des grilles à 48rem ou 64rem. Projets et Education deviennent des rangées à deux colonnes; le détail projet réserve une colonne latérale de 18rem aux technologies. La navigation desktop apparaît à 48rem. Les longueurs de lecture restent contraintes même lorsque les surfaces s’étendent bord à bord.

**The Open Field Rule.** Structurer d’abord avec espace, alignement et règle de 1px. Ajouter un conteneur seulement si une fonction exige réellement une limite.

**The Short Route Rule.** Chaque route porte un sujet principal et peu de sections. Ne pas reconstruire une longue page d’accueil ou dupliquer les résumés de projet.

## Elevation & Depth

Le système reste plat dans les pages ordinaires. Les ruptures noir/blanc, l’opacité typographique, les règles et l’espace portent la profondeur. Les overlays shadcn constituent l’unique exception fonctionnelle: le Sheet utilise une ombre douce et Dialog/Sheet un léger voile flouté pour séparer le focus modal. Dans le héros, les gradients du Canvas et le fondu blanc construisent la profondeur lumineuse.

Les micro-interactions `base-nova` durent 100–200ms: variation neutral au survol, anneau de focus et descente de 1px à l’activation. Dialog zoome légèrement; Sheet glisse depuis la droite. Elles restent des réponses directes, jamais une animation ambiante.

Le Canvas est l’unique mouvement signature. Canvas 2D porte le champ et les particules ASCII liées au pointeur qui composent le mot bilingue localisé. La vitesse du curseur est filtrée avant d’être héritée proportionnellement par les glyphes; une masse individuelle, une traînée d’air exponentielle, une légère turbulence sinusoïdale et une poussée ascendante donnent au nuage son inertie organique. Le rendu plafonne à environ 30fps et son DPR à 1.5. Il s’arrête hors écran, quand le document est caché, sur pause ou avec `prefers-reduced-motion`; ce dernier état reçoit une peinture statique sans particules ni mot caché. Le repli CSS est présent dès le HTML serveur et reste visible si le contexte 2D manque.

**The Flat-by-Default Rule.** Aucune ombre sur boutons, navigation, rangées, typeset ou pied de page. Seuls les overlays modaux peuvent porter ombre et backdrop blur.

**The Single Motion Rule.** Seul le Canvas du héros peut bouger de manière autonome; tout autre mouvement répond directement à une action.

**The Canvas Budget Rule.** Conserver le plafond de 30fps, le DPR maximal de 1.5, au plus 12 émissions par déplacement, 120 glyphes libres simultanés et un budget distinct de 240 cibles persistantes — 217 utilisées par « Bienvenue », 160 par « Welcome » — ainsi que l’espacement d’émission lié à la distance réellement parcourue, la pause, les suspensions visibilité/hors-écran, le mode statique reduced-motion, le rendu SSR et le repli CSS.

## Shapes

La géométrie combine coins doux et structure rectiligne. L’échelle `base-nova` va de 6 à 14px; contrôles courants et boutons utilisent 10px. Les rayons restent visiblement inférieurs à une pilule complète. Rangées de contenu, en-têtes de section et fonds pleine largeur restent rectilignes.

Les séparateurs font 1px et emploient une encre noire ou blanche à faible opacité. Les composants shadcn utilisent un anneau de focus de 3px à 50% et des contrôles de 24 à 36px; le format courant mesure 32px. Les liens éditoriaux conservent le focus global décalé.

**The Measured Radius Rule.** Employer 6, 8, 10 ou 14px selon l’échelle; ne pas transformer boutons, labels, technologies ou navigation en pilules.

**The Rule-not-Card Rule.** Une rangée de preuve possède des séparateurs et de l’espace, pas une boîte arrondie autour de chaque item.

## Components

### Buttons

Contrôles shadcn `base-nova`, construits sur Base UI et organisés par CVA.

- **Shape:** coins de 10px; hauteurs 24, 28, 32 ou 36px; boutons icône sur la même échelle.
- **Primary:** fond `primary`, texte `primary-foreground`, 32px par défaut.
- **Secondary:** fond neutral clair, texte sombre; CTA du héros et contrôles sur surfaces noires.
- **Outline / Ghost / Link:** variantes officielles `base-nova`, adaptées seulement pour garantir le contraste sur les sections inversées.
- **Hover / Focus / Active:** variation neutral, anneau de 3px à 50%, puis descente de 1px; transition courte.
- **Disabled:** aucune interaction et 50% d’opacité.

### Cards / Containers

Il n’existe pas de carte canonique. Projet, éducation, capacités et technologies sont des rangées ouvertes séparées par des règles. Les grandes surfaces blanches ou noires restent bord à bord; leur contenu seul est contraint par le conteneur.

### Navigation

- L’en-tête mesure au moins 80px et reste noir sur les routes intérieures; sur Home, il se superpose au sommet sombre du Canvas.
- Home omet le petit mot-symbole MAYEUL pour ne pas répéter le grand nom; les routes intérieures le rétablissent à gauche.
- La navigation desktop s’aligne à droite, avec lien actif souligné et contrôles `base-nova` compacts.
- Sous 48rem, le contrôle Menu secondaire ouvre un Sheet clair depuis la droite, avec overlay, ombre douce et fermeture explicite.
- Tabler fournit uniquement les pictogrammes Menu et X. Toute autre destination conserve un libellé texte.
- Le sélecteur de langue utilise la variante secondaire shadcn.

### Editorial Actions

Les actions secondaires utilisent `Button` avec la variante `link`, y compris lorsque TanStack Router fournit l’élément rendu. Elles gardent un libellé explicite et ne deviennent ni chip ni icône seule.

### Typeset

Le `typeset` shadcn fourni gère paragraphes, listes, définitions, liens, citations, code, tableaux et médias. About et Project detail l’emploient dans une colonne de 68–70ch. Ses titres `h1` à `h4` sont à 600; les niveaux `h5` et `h6` redescendent à 500. Education reprend cette logique de poids dans ses rangées, sans encapsulation.

### Gradient Hero

Le héros combine un repli CSS, un Canvas 2D purement décoratif et un fondu blanc au-dessus. Les masses bleues, violettes et lavande sont peintes par paires miroir. Le déplacement d’un pointeur fin émet, avec au plus 12 émissions par événement, un nuage compact de 26 px de rayon parmi `>`, `_`, `o`, `/` et `+`, avec une pondération en faveur de `>` et `_`. La vélocité du curseur passe par un filtre passe-bas puis infléchit proportionnellement la direction et la vitesse initiales; la masse de chaque particule module ensuite sa traînée d’air exponentielle, complétée par une turbulence sinusoïdale légère et une faible poussée ascendante. Jusqu’à 120 particules libres coexistent et s’effacent après 0,85 à 1,75 seconde selon la vitesse du geste.

Seules les particules qui traversent le champ du mot, prolongé de 24 px autour de sa matrice, sont capturées. Elles réclament la cible libre la plus proche; attraction de ressort et amortissement augmentent progressivement pendant la capture. « Bienvenue » ou « Welcome » reste sur une seule ligne, chaque lettre occupant une matrice de 7 × 9. La largeur cible occupe 66 % du Canvas au-dessus de 960 px, puis progresse continûment jusqu’à 84 % à 768 px; son centre vertical descend de 68 % à 76 % sur le même intervalle. Les cellules mesurent au plus 18 px et les glyphes dessinés 95 % de cette taille. Le budget persistant, séparé du plafond libre, atteint 240 cibles: « Bienvenue » en utilise 217 et « Welcome » 160. Aucun texte séparé n’est peint.

Les particules capturées restent visibles sans expiration ni éviction par les nouvelles émissions. Un redimensionnement met leurs positions courantes à l’échelle avant de recalculer le champ; elles rejoignent alors progressivement leurs nouvelles cibles, sans téléportation. Pause les masque sans perdre la formation à la reprise. Un changement de langue reconstruit la formation. Une police monospace est réservée à cet art ASCII, tandis que toute la typographie d’interface reste en Hanken Grotesk. Le toucher, Pause et `prefers-reduced-motion` n’affichent ni particules ni mot. Le fondu utilise deux ellipses latérales symétriques et une résolution verticale vers le papier. Le texte, le lien Projects et la commande Pause restent des éléments DOM indépendants et sémantiques.

### Contact dialog

La modale Contact compose `Dialog`, `Field`, `Input`, `Textarea`, `Separator` et `Button` de shadcn `base-nova`. Sa surface neutral claire, son ring discret et son backdrop flouté marquent le focus modal. Le titre précède les champs nom, email et message; les coordonnées directes restent accessibles sous le formulaire. La surface défile dans les petits viewports. Échap et la fermeture restituent le focus au déclencheur; un clic extérieur ne ferme pas le brouillon. Une erreur utilise le token `destructive`; confirmation et copie restent textuelles.

## Do's and Don'ts

### Do:

- **Do** maintenir noir et blanc pour les grandes surfaces, neutral `base-nova` pour les contrôles et overlays.
- **Do** confiner tout bleu, violet et lavande au Canvas du héros et à son fondu.
- **Do** utiliser Hanken Grotesk auto-hébergée, avec des titres à 400–500 et des intertitres de lecture à 600.
- **Do** construire les listes et preuves avec espace, grilles et règles de 1px.
- **Do** employer les composants shadcn `base-nova` possédés localement, avec Base UI, CVA et les tokens neutral officiels.
- **Do** préserver le budget, la pause, les suspensions, reduced-motion, SSR et le repli statique du Canvas.
- **Do** réserver Tabler aux seules icônes Menu et X.

### Don't:

- **Don't** réintroduire la Salle d’optique computationnelle, ses lentilles, halos d’interface, instrumentation mono ou métaphores de laboratoire.
- **Don't** ajouter de glassmorphism, ombre de carte ou panneau translucide hors overlays shadcn.
- **Don't** construire une grille de cartes, des chips de technologies ou des pilules répétées.
- **Don't** appliquer de dégradé au texte ni laisser une couleur sortir du héros.
- **Don't** ajouter un système de thème, une bascule sombre ou une palette secondaire.
- **Don't** multiplier les icônes quand un libellé texte suffit.
- **Don't** masquer du contenu sémantique derrière le Canvas ou rendre l’animation nécessaire à la compréhension.
