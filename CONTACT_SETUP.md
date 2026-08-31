# Activation du formulaire de contact

Le formulaire envoie tous les messages vers `by.marc.eml@gmail.com`. Cette adresse est définie uniquement dans la route serveur `src/app/api/contact/route.ts` et ne peut pas être remplacée par le navigateur.

## Configuration rapide

1. Créer un compte sur [Resend](https://resend.com/) avec `by.marc.eml@gmail.com`.
2. Créer une clé dans [API Keys](https://resend.com/api-keys).
3. Copier `.env.example` vers `.env.local`, puis remplacer `re_xxxxxxxxx` par la clé obtenue.
4. Redémarrer le serveur Next.js.
5. Envoyer un message depuis la section Contact et vérifier la boîte de réception ainsi que les spams.

Avec l’expéditeur de test `onboarding@resend.dev`, Resend limite la destination à l’adresse associée au compte. Cela convient ici si le compte est créé avec `by.marc.eml@gmail.com`.

## Mise en production

Pour une délivrabilité durable, ajouter et vérifier un domaine ou sous-domaine dans Resend, puis définir par exemple :

```env
CONTACT_FROM_EMAIL="Portfolio Marc-Emmanuel <contact@updates.votre-domaine.fr>"
```

Ajouter `RESEND_API_KEY` et `CONTACT_FROM_EMAIL` aux variables d’environnement de l’hébergeur. La clé ne doit jamais être préfixée par `NEXT_PUBLIC_` ni être enregistrée dans Git.

La route inclut une validation serveur, un champ honeypot, une limite de cinq messages par adresse IP toutes les quinze minutes et une vérification de l’origine de la requête.
