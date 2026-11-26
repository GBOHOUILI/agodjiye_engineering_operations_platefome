# AGOOJIYÉ Engineering Tracking System — démonstration (Next.js)

ENVIRONNEMENT DE DÉMONSTRATION — DONNÉES FICTIVES. Aucun backend, aucune variable d’environnement.

## Prérequis
Node.js 18.18+ et npm (ou pnpm).

## Installation et lancement
npm install
npm run dev          # http://localhost:3000

## Vérifications avant déploiement
npm run typecheck    # TypeScript strict
npm run build        # build de production

## Déploiement Vercel
1. Pousser le dossier sur GitHub. 2. Vercel > Add New Project > importer le dépôt (preset Next.js détecté). 3. Deploy.

## Données fictives
`src/data/seed.ts` : 3 prototypes, 12 composants, 15 essais (mesures incluses), 8 anomalies reliés entre eux.
Accès uniquement via `src/services/*` (prêts à être remplacés par des appels à une future API NestJS).
Les modifications (statuts, observations, anomalies déclarées) sont conservées dans le localStorage du navigateur,
lu après le montage côté client (pas d’erreur d’hydratation). « Réinitialiser la démo » (menu) restaure l’état initial.

## Architecture
src/app (routes, layout (dashboard), error, not-found) · components/<module> (vues clientes) · services · data · hooks · lib/validations (Zod) · types

## Limites connues
- Création/modification des prototypes et composants, comparaison d’essais, pièces jointes : non implémentées.
- Pas de shadcn/ui ni React Hook Form (formulaires simples validés avec Zod).
- Les vues sont des Client Components car elles dépendent de l’état local modifiable ; les routes sont des Server Components.
- Build et tests visuels multi-tailles à exécuter après `npm install` (non exécutés lors de la génération).
