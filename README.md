# 🔍 Demo Double Metaphone

Une démonstration interactive de l'algorithme **Double Metaphone** implémentée en TypeScript pour la recherche phonétique de noms français.

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Démonstration](#-démonstration)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [Algorithme Double Metaphone](#-algorithme-double-metaphone)
- [Exemples](#-exemples)
- [Développement](#-développement)
- [Contribution](#-contribution)
- [Licence](#-licence)

## 🎯 À propos

Ce projet est une implémentation complète de l'algorithme **Double Metaphone** en TypeScript, accompagnée d'une interface web interactive pour démontrer ses capacités de recherche phonétique.

L'algorithme Double Metaphone, développé par Lawrence Philips, est une amélioration de l'algorithme Metaphone original. Il génère des codes phonétiques pour les mots, permettant de trouver des correspondances même lorsque les mots sont mal orthographiés ou ont des variantes phonétiques.

### Pourquoi ce projet ?

- **Éducatif** : Comprendre le fonctionnement des algorithmes de recherche phonétique
- **Pratique** : Démonstration concrète avec des noms français
- **Technique** : Implémentation complète en TypeScript moderne

## ✨ Fonctionnalités

- 🔍 **Recherche phonétique en temps réel** : Tapez un nom et obtenez instantanément les correspondances phonétiques
- 🎯 **Algorithme Double Metaphone complet** : Implémentation fidèle de l'algorithme original
- 🇫🇷 **Optimisé pour le français** : Gestion des accents et particularités de la langue française
- 📊 **Système de scoring** : Les résultats sont classés par pertinence phonétique
- 🎨 **Interface intuitive** : Interface web simple et élégante
- ⚡ **Performance** : Recherche instantanée sans latence

## 🚀 Démonstration

L'application permet de rechercher des noms dans une base de données en utilisant la similarité phonétique. Par exemple :

- Rechercher "**Jean Gonzales**" trouvera aussi "**Jean Gonzalez**", "**John Gonçalves**", etc.
- Rechercher "**Marie Dupond**" trouvera aussi "**Mary Dupont**", "**Mariie Duppont**", etc.

## 🛠 Installation

### Prérequis

- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/SIDGEY/demo_metaphone.git
   cd demo_metaphone2
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:5173
   ```

## 🎮 Utilisation

### Interface web

1. **Ouvrez l'application** dans votre navigateur
2. **Tapez un nom** dans le champ de recherche (ex: "Jean Gonzales")
3. **Visualisez les résultats** classés par pertinence phonétique
4. **Explorez la liste complète** des noms disponibles dans la colonne de droite

### Utilisation programmatique

```typescript
import { doubleMetaphone, normalizeString } from './src/metaphone';

// Obtenir les codes phonétiques d'un mot
const phonetics = doubleMetaphone(normalizeString('Gonzalez'));
console.log(phonetics); // ['KNSLS', 'KNSLS']

// Comparer deux noms phonétiquement
const name1 = doubleMetaphone(normalizeString('Gonzalez'));
const name2 = doubleMetaphone(normalizeString('Gonzales'));
const isPhoneticMatch = name1[0] === name2[0] || name1[0] === name2[1] || 
                       name1[1] === name2[0] || name1[1] === name2[1];
```

## 📁 Structure du projet

```
demo_metaphone2/
├── src/
│   ├── index.ts          # Point d'entrée et logique de l'interface
│   ├── metaphone.ts      # Implémentation de l'algorithme Double Metaphone
│   └── people.ts         # Base de données de démonstration
├── index.html            # Interface web
├── package.json          # Configuration du projet
├── tsconfig.json         # Configuration TypeScript
└── README.md            # Documentation
```

### Fichiers principaux

- **`src/metaphone.ts`** : Implémentation complète de l'algorithme Double Metaphone avec fonctions utilitaires
- **`src/index.ts`** : Logique de l'interface utilisateur et système de scoring
- **`src/people.ts`** : Dataset de démonstration avec des noms français et leurs variantes
- **`index.html`** : Interface web responsive avec styling intégré

## 🧠 Algorithme Double Metaphone

### Principe

L'algorithme Double Metaphone transforme les mots en codes phonétiques standardisés. Contrairement à Soundex, il :

- Génère **deux codes** par mot (primaire et secondaire)
- Gère mieux les **consonnes complexes**
- Prend en compte les **origines linguistiques** diverses
- Traite les **cas spéciaux** et exceptions

### Fonctionnalités de l'implémentation

- **Normalisation** : Suppression des accents et caractères spéciaux
- **Stemming** : Réduction des mots à leur racine
- **Sanitization** : Nettoyage et préparation des chaînes
- **Optimisations** : Gestion spécifique des noms français

## 📝 Exemples

### Correspondances phonétiques

| Nom original | Variantes trouvées | Code Metaphone |
|--------------|-------------------|----------------|
| Jean Gonzalez | Jean Gonzales, John Gonçalves, Jeanne Gonzelaz | JN KNSLS |
| Marie Dupont | Mary Dupond, Mariie Duppont, Mairie Dupont | MR TPNT |
| Luc Tremblay | Luke Tremblé, Luck Tremblai | LK TRMPL |

### Cas d'usage

- **Correction orthographique** : Trouver le bon nom malgré les fautes de frappe
- **Recherche floue** : Localiser des personnes avec des variantes de noms
- **Déduplication** : Identifier les doublons phonétiques dans une base de données
- **Matching** : Associer des enregistrements similaires phonétiquement

## 🔧 Développement

### Scripts disponibles

```bash
# Lancer le serveur de développement
npm run dev

# Build de production (si configuré)
npm run build

# Linter et formatage (si configuré)
npm run lint
```

### Technologies utilisées

- **TypeScript** : Langage principal pour la sécurité des types
- **Vite** : Bundler moderne et serveur de développement
- **HTML/CSS** : Interface utilisateur native
- **ES Modules** : Modules JavaScript modernes

### Architecture

Le projet suit une architecture modulaire :

- **Séparation des responsabilités** : Algorithme, données, et interface séparés
- **Types TypeScript** : Sécurité des types pour tous les composants
- **Fonctions pures** : Algorithmes sans effets de bord
- **Interface réactive** : Mise à jour en temps réel

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

### Étapes pour contribuer

1. **Fork** le projet
2. **Créer une branche** pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commiter** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Pousser** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir une Pull Request**

### Types de contributions

- 🐛 **Corrections de bugs**
- ✨ **Nouvelles fonctionnalités**
- 📚 **Amélioration de la documentation**
- 🎨 **Améliorations de l'interface**
- ⚡ **Optimisations de performance**
- 🧪 **Ajout de tests**

### Guidelines

- Respecter le style de code existant
- Ajouter des tests pour les nouvelles fonctionnalités
- Mettre à jour la documentation si nécessaire
- Utiliser des messages de commit descriptifs

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 🙏 Remerciements

- **Lawrence Philips** pour l'algorithme Double Metaphone original
- La communauté **TypeScript** pour les outils excellents
- Les contributeurs et utilisateurs de ce projet

## 📞 Contact

Pour toute question ou suggestion :

- 📧 **Email** : [contact@sidgey.fr]
- 🐙 **GitHub** : [https://github.com/SIDGEY]
- 💬 **Issues** : [https://github.com/SIDGEY/demo_metaphone/issues]

---

**⭐ N'hésitez pas à donner une étoile au projet si vous le trouvez utile !**
