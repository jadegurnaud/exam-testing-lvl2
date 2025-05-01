# Questionnaire 

### Objectif des tests unitaires
Quel est l'objectif principal des tests unitaires ?
   - B) Vérifier le comportement d'une unité de code isolée

### Utilisation de Gherkin
Gherkin est principalement utilisé pour :
   - B) Décrire le comportement attendu dans un format compréhensible par tous

### Principe d'isolation
Expliquez en quoi consiste le principe d'isolation dans les tests unitaires et pourquoi il est important.

Le principe d'isolation consiste à tester une unité de code indépendamment de ses dépendances externes. Cela permet d'identifier précisément l'origine des bugs.

### Origine du BDD
Le BDD est une extension du :
   - B) Test Driven Development

### Fonction des tests d'intégration
Les tests d'intégration vérifient principalement :
   - B) L'interaction entre différents composants ou modules

### Structure Gherkin
Expliquez la structure d'un scénario Gherkin et donnez un exemple concret.

Feature : Décrit la fonctionnalité à tester
Scenario : Décrit un cas de test spécifique avec la structure :
    Given (Contexte)
    When (Action effectuée)
    Then (Résultat attendu)


Exemple :

Feature: Authentification
Scenario: Connexion réussie
    Given un utilisateur avec des identifiants valides
    When il saisit son email et mot de passe
    Then il est connecté à son compte



### Mocks en tests unitaires
Dans le contexte des tests unitaires, que sont les "mocks" ?
   - B) Des objets qui simulent le comportement de dépendances réelles

### Objectif des tests end-to-end
Les tests end-to-end visent à :
   - B) Tester l'application de bout en bout du point de vue de l'utilisateur

### Cycle TDD
Expliquez en détail le cycle Red-Green-Refactor du TDD et ce qui se passe à chaque étape.

Red : On écrit un test qui échoue
Green : On écrit le minimum de code pour faire passer le test, le plus simplement possible
Refactor : On améliore le code sans changer le comportement

### Caractéristiques d'un bon test unitaire
Quelle est la caractéristique idéale d'un bon test unitaire ?
    - B) Il doit être rapide à exécuter, isolé et répétable

### Mots-clés de Gherkin
Quels sont les mots-clés principaux de Gherkin ?
    - C) Feature, Scenario, Given, When, Then

### Tests unitaires vs tests d'intégration
Quelles sont les principales différences entre les tests unitaires et les tests d'intégration ?

Les tests unitaires testent une unité de code isolée alors que les tests d'intégration testent l'interaction entre plusieurs composants

### Nom du cycle TDD
Le cycle TDD classique est connu sous le nom de :
    - B) Red-Green-Refactor

### Focus des tests fonctionnels
Les tests fonctionnels se concentrent sur :
    - C) Le comportement du système par rapport aux spécifications

### BDD et communication d'équipe
Comment le BDD peut-il améliorer la communication entre les équipes techniques et les équipes métier ?

Le BDD améliore la communication en utilisant un langage commun compréhensible par tous. Il améliore aussi la communication en documentant les comportements attendus de manière claire. L'écriture des scénarios favorisent la collaboration et conduit à une meilleure compréhension mutuelle.

### Avantage principal du TDD
Quel est l'avantage principal du TDD ?
    - C) Il favorise un design modulaire et des interfaces claires

### Avantages et défis des tests end-to-end
Quels sont les avantages et les défis spécifiques liés aux tests end-to-end par rapport aux autres types de tests ?

Avantages :
    Validation complète du système
    Test du point de vue utilisateur

Défis : 
    Longs à exécuter
    Fragiles aux changements

### Format des scénarios BDD
Quel est le format typique d'un scénario BDD ?
    - B) Étant donné-Quand-Alors

### Avantages et limites des tests unitaires
Décrivez les avantages et les limites des tests unitaires dans un projet de développement logiciel.

Anvantages :
    Détection précoce des bugs
    Facilitent le debugging
    
    Rapides à executer

Limites :
    Ne testent pas les interactions
    Ne garrentissent pas le bon fonctionnement global

### Fonctionnalité de réutilisation dans Gherkin
Quelle est la fonctionnalité de Gherkin qui permet de réutiliser des étapes communes à plusieurs scénarios ?
    - B) Background

### Responsabilité des tests fonctionnels
Qui est généralement responsable de l'écriture et de l'exécution des tests fonctionnels ?
    - C) Les développeurs et les testeurs QA

### Moment d'écriture du code en TDD
Dans le TDD, à quel moment écrit-on le code de production ?
    - C) Après avoir exécuté les tests et constaté leur échec

### Outils pour tests end-to-end
Quel outil est couramment utilisé pour les tests end-to-end d'applications web ?
    - C) Playwright

### Différences entre BDD et TDD
En quoi le BDD diffère-t-il du TDD en termes d'approche et d'objectifs ?

Le BDD se concentre sur le compotement métier tandis que le TDD se concentre sur l'implémentation technique.

L'objectif du TDD est de garantir la qualité du code, de réduire les bug.

L'objectif du BDD est d'assurer la valeur métier et d'améliorer la communication.

### Défis des tests d'intégration
Quels défis sont fréquemment rencontrés lors de la mise en place de tests d'intégration ?
    - D) Toutes les réponses ci-dessus

### Caractéristiques d'un bon test end-to-end
Quelle est la caractéristique d'un bon test end-to-end ?
    - B) Il doit simuler avec précision le comportement réel des utilisateurs

### Défis de l'adoption du TDD
Quels sont les défis couramment rencontrés lors de l'adoption du TDD dans une équipe, et comment pourriez-vous les surmonter ?

### Frameworks de tests unitaires
Lequel de ces frameworks n'est PAS utilisé pour les tests unitaires ?
    - C) Selenium

### Rôles dans le processus BDD
Quels rôles sont généralement impliqués dans le processus BDD ?
    - D) Développeurs, testeurs, product owners et parties prenantes métier

### Maintenance des tests end-to-end
Comment géreriez-vous la maintenance des tests end-to-end pour une application qui évolue rapidement ?

### Inconvénients des tests fonctionnels
Quel est le principal inconvénient des tests fonctionnels ?
    - B) Ils sont généralement lents et coûteux à exécuter

### Intégration de Gherkin en agile
Comment intégreriez-vous Gherkin dans un processus de développement agile ? Quels seraient les avantages ?



### Principes du TDD
Lequel des principes suivants n'est PAS associé au TDD ?
    - D) Écrire tous les tests à la fin du développement

### Différences entre tests fonctionnels et autres tests
En quoi les tests fonctionnels diffèrent-ils des tests unitaires et d'intégration en termes d'approche et d'objectifs ?

Les tests fonctionnels se concentrent sur les comportements métier plutôt que sur l'implémentation technique.

### Approche combinant TDD, BDD et Gherkin
Quelle approche combine naturellement TDD, BDD et Gherkin ?
    - B) Specification By Example

### Organisation des tests fonctionnels
Décrivez comment vous organiseriez les tests fonctionnels pour une application web de e-commerce.

### Pyramide de tests
Quelle est la pyramide de tests classique, du bas vers le haut ?
    - B) Tests unitaires, Tests d'intégration, Tests fonctionnels, Tests E2E

### Stratégie de test optimale
Comment détermineriez-vous la stratégie de test optimale pour un projet, en considérant les différents types de tests abordés dans ce questionnaire ?

Il faut avoir un équilibre entre les différents types de tests.

### Quelle est l'erreur récurente qui peut être faite lors de test end 2 end ? (Je l'ai répété pas mal de fois)

De ne pas mettre d'expect ou d'assert à la fin des tests. Sans cela le test ne vérifie pas réellement les résultats attendus.
