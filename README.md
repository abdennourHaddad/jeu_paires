# Memory Game

## Mise en place du projet

Pour récupérer ce projet veuillez le cloner en `https` en lançant la commande suivante :

```bash
git clone https://github.com/abdennourHaddad/jeu_paires.git
```

1. Dans le dossier racine, exécutez :

```bash
npm install
```  

2. Exécutez la commande `npm run build` pour créer le dossier `./dist et construire un premier *bundle*
  
3. Vous pouvez ouvrir le fichier `dist/index.html`, pour vérifier que tout s'est bien déroulé en consultant la console (<kbd>Ctrl Shift K</kbd>) dans laquelle vous devez lire le message `le bundle a été généré`.  

> Attention, le résultat <strong> ne se consulte pas</strong> avec le fichier `src/index.html` : vous devez faire vos modifications et votre travail dans le dossier `src/` **mais le résultat du travail est observé dans le dossier `dist/`**.

Après chaque modification, il faut générer le <q>nouveau</q> <i>bundle</i>, toujours à l'aide de la commande <code>npm run build</code> et c'est le fichier **`dist`**`/index.html` qu'il faut consulter pour avoir le résultat, ou en lançant la commande :

```bash
npm run dev-server
```

**C'est la solution que l'on vous conseille d'adopter.**

5. N'oubliez pas d'exécuter la commande <code>npm run build</code> après l'arrêt du serveur de développement pour mettre à jour le dossier `dist/`.

> NB : le dossier `dist/` ne sera pas mis sur le dépôt car il peut être regénéré à partir des sources.
