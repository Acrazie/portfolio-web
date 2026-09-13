---
name: Mayeul Portfolio
description: Un portfolio éditorial noir et blanc, introduit par un unique héros bleu-violet vivant.
colors:
  paper: "#ffffff"
  ink: "#000000"
  ink-muted: "rgb(0 0 0 / 62%)"
  rule: "rgb(0 0 0 / 18%)"
  input-rule: "rgb(0 0 0 / 24%)"
  hero-midnight: "#020617"
  hero-navy: "#071a62"
  hero-indigo: "#4338ca"
  hero-blue: "rgb(38 96 255 / 90%)"
  hero-violet: "rgb(96 48 255 / 82%)"
  hero-lavender: "rgb(126 154 255 / 68%)"
  hero-cobalt: "rgb(18 62 221 / 78%)"
  hero-indigo-bloom: "rgb(92 72 255 / 62%)"
  hero-top-shade: "rgb(0 4 26 / 68%)"
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
  sm: "10px"
  md: "12px"
  lg: "14px"
  xl: "16px"
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
    rounded: "{rounded.xl}"
    padding: "10px 16px"
    height: "44px"
  button-inverse-large:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.xl}"
    padding: "10px 16px"
    height: "44px"
  menu-control:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    size: "44px"
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
    rounded: "0px"
    padding: "0 0 4px"
    height: "44px"
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

Un seul événement visuel rompt ce régime éditorial: le héros d’accueil est entièrement occupé par un Canvas 2D bleu, violet et lavande. Son large fondu blanc, symétrique autour de l’axe vertical, absorbe la couleur avant le contenu. Ce geste constitue la signature du portfolio; toutes les autres surfaces restent strictement monochromes et sans effet de matière.

Le système privilégie une hiérarchie franche, une densité basse et des contrôles opaques. Hanken Grotesk maintient une voix unique, humaine et technique. Base UI fournit les primitives interactives, CVA leurs variantes, et les compositions s’appuient sur des lignes et des alignements plutôt que sur des cartes répétées.

**Key Characteristics:**

- Surfaces ordinaires exclusivement noires ou blanches.
- Bleu, violet et lavande confinés au Canvas du héros et à son fondu blanc.
- Hanken Grotesk variable auto-hébergée pour toute la voix éditoriale et interactive.
- Titres réguliers de 400 à 500; intertitres de contenu long à 600.
- Rayons mesurés de 10 à 16px, contrôles opaques et règles de 1px.
- Espaces ouverts, peu d’objets, aucune collection de cartes.
- Un seul mouvement signature, robuste au SSR, à la réduction de mouvement et à la suspension.

## Colors

Le système possède deux régimes étanches: noir et blanc pour l’interface; spectre froid uniquement à l’intérieur du héros d’accueil.

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
- **Règle de champ** (`input-rule`): compatibilité des primitives de champ; elle ne légitime pas un formulaire absent.

**The Chromatic Quarantine Rule.** Toute couleur chromatique reste dans le Canvas du héros et son fondu; aucune couleur dans navigation, pages intérieures, listes, pied de page, états ou texte.

**The Two-Surface Rule.** Hors héros, toute grande surface est noire ou blanche. La hiérarchie vient du contraste, de l’opacité et des règles, jamais d’un troisième fond.

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

Le système est plat. Aucun `box-shadow`, flou d’arrière-plan, verre translucide ou empilement de surfaces ne crée la profondeur des pages ordinaires. Les ruptures noir/blanc, l’opacité typographique, les règles et l’espace suffisent. Dans le héros seulement, la superposition de gradients radiaux du Canvas et le fondu blanc construisent une profondeur lumineuse sans produire une carte ni une vitre.

Les micro-interactions durent 160–200ms avec une sortie simple: le bouton se lève de 2px au survol puis descend de 1px à l’activation; les liens changent contraste ou soulignement. Elles restent des retours d’état, jamais une animation ambiante.

Le Canvas est l’unique mouvement signature. Il plafonne son rendu à environ 30fps et son DPR à 1.5. Il s’arrête hors écran, quand le document est caché, sur pause ou avec `prefers-reduced-motion`; ce dernier état reçoit une peinture statique. Le repli CSS est présent dès le HTML serveur et reste visible si le contexte 2D manque.

**The Flat-by-Default Rule.** Aucune ombre sur boutons, navigation, rangées, typeset ou pied de page.

**The Single Motion Rule.** Seul le Canvas du héros peut bouger de manière autonome; tout autre mouvement répond directement à une action.

**The Canvas Budget Rule.** Conserver le plafond de 30fps, le DPR maximal de 1.5, la pause, les suspensions visibilité/hors-écran, le mode statique reduced-motion, le rendu SSR et le repli CSS.

## Shapes

La géométrie combine coins doux et structure rectiligne. L’échelle de rayon va de 10 à 16px; contrôles courants et boutons utilisent 16px. Les rayons restent visiblement inférieurs à une pilule complète. Les actions éditoriales soulignées, rangées de contenu, en-têtes de section et fonds pleine largeur restent rectilignes.

Les séparateurs font 1px et emploient une encre noire ou blanche à faible opacité. Le focus global utilise un contour de 2px décalé de 4px; les primitives Button utilisent un anneau de 2px décalé de 2px. Les cibles interactives mesurent au moins 44px.

**The Measured Radius Rule.** Employer 10, 12, 14 ou 16px selon l’échelle; ne pas transformer boutons, labels, technologies ou navigation en pilules.

**The Rule-not-Card Rule.** Une rangée de preuve possède des séparateurs et de l’espace, pas une boîte arrondie autour de chaque item.

## Components

### Buttons

Contrôles opaques, tactiles et strictement monochromes, construits sur Base UI et organisés par CVA.

- **Shape:** coins doux (16px), cible de 40px en petit format, 44px par défaut, 48px en grand format et 44px pour une icône seule.
- **Primary:** fond noir, texte blanc, padding de 10px × 16px.
- **Inverse:** fond blanc, texte noir; le héros emploie la grande taille avec 12px × 24px.
- **Outline:** fond blanc opaque, contour noir de 1px et texte noir; le survol inverse noir et blanc.
- **Hover / Focus / Active:** levée de 2px, anneau visible de 2px, puis descente de 1px; transition de 200ms `ease-out`.
- **Disabled:** aucune interaction et 50% d’opacité.

### Cards / Containers

Il n’existe pas de carte canonique. Projet, éducation, capacités et technologies sont des rangées ouvertes séparées par des règles. Les grandes surfaces blanches ou noires restent bord à bord; leur contenu seul est contraint par le conteneur.

### Navigation

- L’en-tête mesure au moins 80px et reste noir sur les routes intérieures; sur Home, il se superpose au sommet sombre du Canvas.
- Home omet le petit mot-symbole MAYEUL pour ne pas répéter le grand nom; les routes intérieures le rétablissent à gauche.
- La navigation desktop s’aligne à droite, avec lien actif souligné et cibles de 44px.
- Sous 48rem, un contrôle Menu noir ouvre une surface plein écran noire; le contrôle de fermeture est blanc.
- Tabler fournit uniquement les pictogrammes Menu et X. Toute autre destination conserve un libellé texte.
- Le sélecteur de langue est un contrôle noir opaque à coins de 16px, non une pilule translucide.

### Editorial Actions

Les actions secondaires sont des liens textuels à soulignement fin. Elles gardent une cible verticale de 44px, renforcent le trait au survol et reçoivent le focus global. Elles ne deviennent ni bouton fantôme, ni chip, ni icône sans libellé.

### Typeset

Le `typeset` shadcn fourni gère paragraphes, listes, définitions, liens, citations, code, tableaux et médias. About et Project detail l’emploient dans une colonne de 68–70ch. Ses titres `h1` à `h4` sont à 600; les niveaux `h5` et `h6` redescendent à 500. Education reprend cette logique de poids dans ses rangées, sans encapsulation.

### Gradient Hero

Le héros combine un repli CSS, un Canvas 2D purement décoratif et un fondu blanc au-dessus. Les masses bleues, violettes et lavande sont peintes par paires miroir; le fondu utilise deux ellipses latérales symétriques et une résolution verticale vers le papier. Le texte, le lien Projects et la commande Pause restent des éléments DOM indépendants et sémantiques.

## Do's and Don'ts

### Do:

- **Do** maintenir le noir et le blanc comme seules couleurs des surfaces ordinaires.
- **Do** confiner tout bleu, violet et lavande au Canvas du héros et à son fondu.
- **Do** utiliser Hanken Grotesk auto-hébergée, avec des titres à 400–500 et des intertitres de lecture à 600.
- **Do** construire les listes et preuves avec espace, grilles et règles de 1px.
- **Do** employer les primitives Base UI/CVA et conserver des contrôles opaques, des rayons de 10–16px et des cibles d’au moins 44px.
- **Do** préserver le budget, la pause, les suspensions, reduced-motion, SSR et le repli statique du Canvas.
- **Do** réserver Tabler aux seules icônes Menu et X.

### Don't:

- **Don't** réintroduire la Salle d’optique computationnelle, ses lentilles, halos d’interface, instrumentation mono ou métaphores de laboratoire.
- **Don't** ajouter de glassmorphism, flou d’arrière-plan, ombre de carte ou panneau translucide.
- **Don't** construire une grille de cartes, des chips de technologies ou des pilules répétées.
- **Don't** appliquer de dégradé au texte ni laisser une couleur sortir du héros.
- **Don't** ajouter un système de thème, une bascule sombre ou une palette secondaire.
- **Don't** multiplier les icônes quand un libellé texte suffit.
- **Don't** masquer du contenu sémantique derrière le Canvas ou rendre l’animation nécessaire à la compréhension.
