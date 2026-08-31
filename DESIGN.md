# DESIGN.md — UNETEL Back Office
## UI/UX Design System & Guidelines

---

## 1. Identité de marque UNETEL

**Organisation** : Union Nationale des Entreprises de Télécommunications de Côte d'Ivoire  
**Mission** : Fédérer les opérateurs et acteurs des télécommunications pour bâtir un secteur innovant et inclusif  
**Ton général** : Institutionnel, sérieux, professionnel, moderne — ancré dans le contexte africain ivoirien

---

## 2. Palette de couleurs (extraite des captures d'écran réelles)

```css
/* Couleurs extraites des screenshots du site UNETEL */
:root {
  /* ─── PRIMAIRES ─────────────────────────────────────────── */
  --color-primary:        #2D3A8C;  /* Bleu indigo — couleur dominante du site */
  --color-primary-light:  #3D4FBF;  /* Bleu vif — hover, liens actifs */
  --color-primary-dark:   #1E2A6E;  /* Bleu profond — sidebar, header, hero overlay */
  --color-primary-xdark:  #141D52;  /* Hero background profond */

  /* ─── ACCENT ─────────────────────────────────────────────── */
  /* Pas d'orange dans l'identité UNETEL elle-même.
     L'orange visible = logo Orange CI (membre).
     Accent UNETEL = bleu vif + soulignements bleu indigo */
  --color-accent:         #2D3A8C;  /* Même bleu, utilisé pour liens cliqués */
  --color-accent-line:    #2D3A8C;  /* Trait de soulignement sous les titres de section */

  /* ─── SECTION LABELS (petits textes en caps) ─────────────── */
  /* Ex: "CONNECTIVITÉ", "NOS MEMBRES", "À PROPOS DE L'UNETEL" */
  --color-label:          #2D3A8C;  /* Bleu indigo, uppercase, letter-spacing large */

  /* ─── NEUTRALS ───────────────────────────────────────────── */
  --color-bg:             #F4F6FB;  /* Fond de section gris bleuté très pâle */
  --color-bg-alt:         #FFFFFF;  /* Sections blanches */
  --color-surface:        #FFFFFF;  /* Cartes, modals */
  --color-border:         #DDE1EA;  /* Bordures fines, visibles mais discrètes */
  --color-border-active:  #2D3A8C;  /* Bordure carte active (ex: carte "11%" highlight) */

  /* ─── TEXTES ──────────────────────────────────────────────── */
  --color-text-primary:   #1A1D2E;  /* Titres principaux — quasi-noir */
  --color-text-secondary: #4A5068;  /* Corps de texte — gris foncé */
  --color-text-muted:     #8A92A9;  /* Métadonnées, dates, placeholders */
  --color-text-on-dark:   #FFFFFF;  /* Texte sur fond bleu (hero, sidebar) */
  --color-text-link:      #2D3A8C;  /* "Lire l'article →", "Plus sur l'UNETEL →" */

  /* ─── ÉTATS FONCTIONNELS ─────────────────────────────────── */
  --color-success:        #22C55E;
  --color-warning:        #F59E0B;
  --color-danger:         #EF4444;
  --color-info:           #3B82F6;

  /* ─── SIDEBAR BACK OFFICE ────────────────────────────────── */
  --sidebar-bg:           #1E2A6E;  /* Bleu profond du hero site */
  --sidebar-text:         #B8C4E8;  /* Texte nav — bleu pâle */
  --sidebar-active-bg:    #2D3A8C;  /* Item actif */
  --sidebar-active-text:  #FFFFFF;
  --sidebar-active-border:#FFFFFF;  /* Trait gauche de l'item actif */
  --sidebar-icon:         #7A8FCC;
  --sidebar-hover:        #253280;
}
```

### Tokens visuels identifiés sur le site

| Élément | Valeur observée |
|---|---|
| Barre de contact (topbar publique) | `#2D3A8C` fond, texte blanc |
| Navigation publique | fond blanc, texte `#1A1D2E`, item actif souligné bleu |
| Hero background | photo pleine largeur + overlay bleu indigo `rgba(45,58,140,0.82)` |
| Hero sous-titre label | "CONNECTIVITÉ" en majuscules espacées, bleu clair |
| Sections alternées | blanc ↔ `#F4F6FB` |
| Trait décoratif sous titres | `3px`, couleur `#2D3A8C`, largeur `~40px` |
| Chiffres KPI | grands, bleu `#2D3A8C`, fond blanc |
| Cartes publiques | fond blanc, bordure `#DDE1EA` 1px, coins droits ou `2px`, pas d'ombre visible |
| Carte active (highlight) | bordure `#2D3A8C` 1.5px, ombre quasi imperceptible |
| Badge catégorie actualité | fond blanc, texte `#2D3A8C`, coins `2px` à `4px` |
| Numéros commissions | carré `#2D3A8C`, texte blanc, coins `2px` |
| Bouton CTA principal | fond blanc, texte sombre, border blanc (sur fond bleu) |
| Bouton CTA secondaire | fond `#2D3A8C`, texte blanc |
| Footer / newsletter | fond bleu nuit `#111936` à `#141D52`, séparateurs `rgba(255,255,255,0.12)` |

---

## 3. Typographie

```css
/* Polices */
/* Display / Titres : Sora — moderne, géométrique, lisible */
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

:root {
  --font-display: 'Sora', sans-serif;
  --font-body:    'DM Sans', sans-serif;

  /* Échelle typographique */
  --text-xs:   0.75rem;   /* 12px — badges, métadonnées */
  --text-sm:   0.875rem;  /* 14px — labels, tableaux */
  --text-base: 1rem;      /* 16px — corps de texte */
  --text-lg:   1.125rem;  /* 18px — sous-titres section */
  --text-xl:   1.25rem;   /* 20px — titres de carte */
  --text-2xl:  1.5rem;    /* 24px — titres de page */
  --text-3xl:  1.875rem;  /* 30px — dashboard headline */
}
```

---

## 4. Layout du Back Office

### Structure globale
```
┌─────────────────────────────────────────────────────────┐
│  TOPBAR  [Logo UNETEL]  [Search]  [Notifs]  [User Menu] │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│   SIDEBAR    │          MAIN CONTENT AREA               │
│  (240px)     │                                          │
│              │   [Breadcrumb]                           │
│  Navigation  │   [Page Title + Actions]                 │
│  par section │                                          │
│              │   [Content: Table / Form / Grid]         │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

### Sidebar — Navigation principale
```
🏠  Dashboard
📰  Actualités
🤝  Partenaires
📁  Centre d'informations
🎬  Médiathèque
📞  Messages (Contact)
👥  Utilisateurs
⚙️  Paramètres
```

### Breakpoints (responsive)
| Breakpoint | Comportement |
|---|---|
| < 768px | Sidebar en drawer (hamburger) |
| 768–1024px | Sidebar réduite (icônes seulement) |
| > 1024px | Sidebar déployée complète |

---

## 5. Composants UI

### Boutons
```
[Primary]   bg-primary-light, text-white, hover: bg-primary-dark
[Secondary] bg-white, border, text-primary, hover: bg-bg
[Danger]    bg-danger, text-white
[Ghost]     transparent, text-primary, hover: bg-bg
```
- Border-radius : `2px` à `4px`
- Padding : `10px 20px` (md), `8px 14px` (sm)
- Icône optionnelle à gauche (16px)

### Tableaux de données
- Header : fond `--color-primary` texte blanc, ou fond `--color-bg` texte `--text-secondary`
- Lignes : alternance `white` / `#F8FAFF`
- Hover row : fond `#EEF3FB`
- Actions par ligne : icônes ✏️ 🗑️ 👁️
- Pagination bas de tableau
- Recherche + filtres en haut

### Cartes (Cards)
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 2px;
  padding: 24px;
  box-shadow: none;
}
```

### Formulaires
- Labels : `--text-sm`, `--color-text-secondary`, `font-weight: 500`
- Inputs : border `--color-border`, focus `--color-primary-light`, border-radius `2px`
- Validation inline (rouge en bas du champ)
- Upload fichier/image : zone drag & drop avec preview

### Badges / Tags
```
[Publié]   green bg-light, text-success
[Brouillon] gray bg-light, text-muted
[En attente] orange bg-light, text-warning
[Archivé]  red bg-light, text-danger
```

### Stats Dashboard (KPI Cards)
```
┌─────────────────┐
│  🔢  Nombre      │
│  42              │
│  Actualités      │
│  ↑ +3 ce mois   │
└─────────────────┘
```

---

## 6. Icônes

Utiliser **Lucide React** (déjà inclus dans l'écosystème React moderne) :
- Cohérent, léger, outline style
- Taille standard : 18px (sidebar), 16px (boutons), 20px (actions)

---

## 7. Animations & Micro-interactions

- Transition pages : fade-in 150ms ease
- Hover boutons : `transform: translateY(-1px)`, shadow légère
- Loading states : skeleton screens (pas de spinners)
- Toast notifications : slide-in depuis le bas-droit, auto-dismiss 3s
- Modal : scale-in depuis le centre (0.95 → 1), overlay sombre léger

---

## 8. Structure des pages type

### Page Liste (ex: Actualités)
```
[Titre]                     [+ Ajouter]
[Recherche...]   [Filtre ▼]   [Export]

┌────────────────────────────────────────┐
│ Tableau des entrées                    │
│ ID | Titre | Catégorie | Date | Statut │Actions│
│ ...                                    │
└────────────────────────────────────────┘
[Pagination ← 1 2 3 ... →]
```

### Page Formulaire (Créer / Éditer)
```
← Retour à la liste

[Titre de la page]

┌──────────────────────────┐  ┌────────────────┐
│ Informations principales  │  │ Paramètres     │
│                           │  │ Statut: [▼]    │
│ Titre *                   │  │ Date: [📅]      │
│ [___________________]     │  │                │
│                           │  │ [Publier]       │
│ Contenu *                 │  │ [Sauvegarder]  │
│ [Rich Text Editor]        │  │ [Annuler]      │
└──────────────────────────┘  └────────────────┘
```

---

## 9. Gestion des médias

- Upload image : preview immédiate, crop optionnel
- Upload PDF/documents : barre de progression, nom + taille affichés
- Galerie médiathèque : grid responsive (3-4 colonnes), sélection multiple
- Formats acceptés clairement indiqués

---

## 10. Accessibilité & UX

- Contraste WCAG AA minimum
- Focus visible sur tous les éléments interactifs
- Messages d'erreur explicites (pas juste "Erreur 400")
- Confirmations de suppression toujours en modal (pas de suppression directe)
- États vides stylisés (illustration + texte incitatif)
- Breadcrumb sur toutes les pages profondes

---

## 11. Stack technique recommandée

| Besoin | Solution |
|---|---|
| Framework | React 18 + TypeScript |
| Routing | React Router v6 |
| State management | Zustand ou TanStack Query |
| UI Components | shadcn/ui (base Radix UI) |
| Styles | Tailwind CSS + CSS Variables |
| Rich Text | TipTap ou React Quill |
| Tableaux | TanStack Table |
| Formulaires | React Hook Form + Zod |
| Requêtes API | Axios + TanStack Query |
| Icônes | Lucide React |
| Notifications | React Hot Toast |
| Upload fichiers | React Dropzone |
| Date/Time | Day.js |

---

## 12. URL Back Office (recommandation)

```
/admin                         → Dashboard
/admin/actualites              → Liste des actualités
/admin/actualites/new          → Créer une actualité
/admin/actualites/:id/edit     → Éditer une actualité
/admin/partenaires             → Liste des partenaires
/admin/partenaires/new         
/admin/partenaires/:id/edit    
/admin/mediatheque     → Documents / ressources
/admin/mediatheque/new 
/admin/mediatheque             → Galerie médias
/admin/contact                 → Messages reçus
/admin/utilisateurs            → Gestion utilisateurs (si applicable)
/admin/parametres              → Paramètres du site
/login                         → Page de connexion
```

---

*Document généré pour le projet UNETEL Back Office — Mai 2026*
