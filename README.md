# 🎄 Calendrier de l'Avent 2025

Un calendrier de l'Avent interactif créé avec React et Tailwind CSS.

## ✨ Fonctionnalités

### 5. Animations et ambiance
- ❄️ Effet de neige qui tombe (activable/désactivable)
- 🎵 Musique de Noël en fond (avec contrôle on/off)
- ✨ Animations fluides lors de l'ouverture des cases
- ⏰ Compte à rebours jusqu'à Noël

### 6. Bonus optionnel
- 📱 Mode partage : partager une surprise sur les réseaux sociaux
- 🎁 Mini-jeu de collection (cases ouvertes sauvegardées)
- 🔧 Mode administrateur (localStorage pour personnaliser)
- 🌐 Version multilingue (FR/EN)

## 🚀 Installation

```bash
npm install
```

## 💻 Développement

```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## 📦 Build

```bash
npm run build
```

Le build génère les fichiers dans le dossier `dist/`.

## 🚀 Déploiement sur Vercel

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement Vite
3. Les paramètres sont configurés dans `vercel.json`
4. Le déploiement se fait automatiquement à chaque push

**Configuration Vercel :**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## 📅 Système de dates

Le calendrier fonctionne en temps réel avec la date actuelle :

**En décembre :**
- Si on est le 18 décembre → cases 1 à 18 disponibles
- Si on est le 25 décembre → cases 1 à 25 disponibles
- Les cases 19, 20, 21... restent verrouillées jusqu'à leur date

**En janvier (jusqu'au 17) :**
- Toutes les cases de décembre sont disponibles
- Plus les cases correspondant aux jours de janvier

**Indicateurs visuels :**
- ✓ **Ouvertes** (déjà consultées) - Vert
- 💡 **Disponible aujourd'hui** (mise en évidence) - Badge "AUJOURD'HUI" + bordure dorée
- 🔒 **Verrouillées** (jours futurs) - Gris avec opacité

**Sécurité :**
- Les cases futures sont strictement verrouillées
- Cliquer sur une case verrouillée affiche un message d'alerte
- Animation "shake" pour feedback visuel

## 🎁 Contenu des surprises

Chaque case révèle une surprise variée :
- 💬 **Citation/message inspirant de Noël**
- 🎲 **Blague ou devinette festive**
- 🎮 **Mini-jeu simple** (puzzle, memory, quiz)
- 🍪 **Recette de Noël**
- 🎨 **Idée cadeau DIY**
- 🎵 **Chanson de Noël** (lien YouTube)
- 🖼️ **Fond d'écran de Noël** (téléchargeable)
- 🎟️ **Code promo fictif** ou réduction

## 💾 Sauvegarde de progression

- **LocalStorage** pour mémoriser les cases déjà ouvertes
- L'utilisateur peut revenir et voir son historique
- Les cases ouvertes restent marquées en vert

## 🎵 Musique de Noël

Pour ajouter votre propre musique de Noël :

1. Téléchargez un fichier MP3 libre de droits depuis :
   - [Pixabay Music](https://pixabay.com/music/search/christmas/) (gratuit, sans attribution)
   - [Free Music Archive](https://freemusicarchive.org/search?quicksearch=christmas)
   - [Incompetech](https://incompetech.com/music/royalty-free/music.html)

2. Renommez le fichier en `christmas-music.mp3`

3. Placez-le dans le dossier `public/`

4. Relancez l'application

Le bouton 🎵 Musique permet d'activer/désactiver la musique de fond.

## 🛠️ Technologies

- **Frontend**: React 18
- **Styling**: Tailwind CSS v4
- **Build**: Vite
- **Animation**: CSS Animations + Canvas API
- **Déploiement**: Vercel

## 📝 Note

L'application utilise actuellement des musiques en ligne gratuites.
Si vous n'entendez rien, vérifiez :
- Que votre volume est activé
- Que votre navigateur autorise la lecture audio
- Votre connexion internet
