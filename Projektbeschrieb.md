# Awesome HSLU

## Kontext
Awesome HSLU ist eine innovative Plattform, die Studierenden der Hochschule Luzern (HSLU) ermöglicht, ihre eigenen Erfahrungen, lustige Artikel sowie Modulbeschreibungen der Vorlesungen zu lesen, zu schreiben, zu zitieren und zu bewerten. Ziel ist es, das inaktive und veraltete GitHub-Repo von [Struggling At HSLU](https://github.com/struggling-at-hslu/observations/tree/master) zu ersetzen und den Studierenden einen alternativen und unterhaltsamen Einblick ins Studium zu bieten.

Es gibt vier wesentliche Funktionen der App:
- Erfassen von lustigen und überspitzten Modulbeschreibungen
- Erfassen von Artikeln
- Zitieren von Aussagen der Dozierenden
- Bewerten von allen Inhalten

Auf der Startseite werden trendige Inhalte gemäss den kürzlichen positiven Bewertungen angezeigt.

## Anforderungen
### Fachliche Anforderungen
#### User Story 1: Registrieren als Student (Prio 'Must')
Ein Student kann sich mit seiner @stud.hslu.ch E-Mail-Adresse und einem Passwort registrieren. Es gelten spezifische Passwortrichtlinien.

**Akzeptanzkriterien**
* Nur mit einer gültigen Studenten-E-Mail-Adresse kann eine Registrierung erfolgen.
* Das Passwort muss bestimmte Sicherheitskriterien erfüllen (z.B. Länge, Sonderzeichen).

#### User Story 2: Modulbeschreibung schreiben (Prio 'Must')
Als angemeldeter Nutzer kann ich eine Modulbeschreibung erstellen.

**Akzeptanzkriterien**
* Eine Modulbeschreibung muss ein Modulkürzel und eine Beschreibung enthalten.
* Nach der Veröffentlichung wird die Beschreibung unter der Kategorie "Neu" angezeigt.

#### User Story 3: Modulbeschreibungen bewerten (Prio 'Must')
Als anonymer oder angemeldeter Nutzer kann ich Modulbeschreibungen positiv oder negativ bewerten.

**Akzeptanzkriterien**
* Positiv bewertete Modulbeschreibungen werden in der Liste höher angezeigt.
* Nach einer bestimmten Anzahl negativer Bewertungen wird eine Modulbeschreibung aus der Liste entfernt.

#### User Story 4: Anonymer Artikel schreiben (Prio 'Should')
Als angemeldeter Nutzer kann ich beim Erfassen eines Artikels wählen, anonym zu bleiben.

**Akzeptanzkriterien**
* Wird die Option "Anonym bleiben" ausgewählt, wird der Name des Autors nicht angezeigt.

#### User Story 5: Rate Limits (Prio 'Could')
Die Anzahl der Bewertungen, die ein Nutzer abgeben kann, wird beschränkt.

**Akzeptanzkriterien**
* Ein Nutzer darf maximal `X` Bewertungen pro Minute/Stunde abgeben.
* Bei Überschreitung dieser Grenze wird eine Fehlermeldung ausgegeben.

#### User Story 6: Content Filterung (Prio 'Wont')
Die Plattform soll Mechanismen zur Filterung von unangemessenem oder beleidigendem Inhalt implementieren.

**Akzeptanzkriterien**
* Inhalte, die als unangemessen oder beleidigend markiert werden, sollen automatisch zur Überprüfung markiert oder entfernt werden.
* Nutzer sollen die Möglichkeit haben, Inhalte zur Überprüfung zu melden.

#### Nicht-Funktionale Anforderungen
Die Plattform soll sowohl auf Desktop- als auch auf mobilen Endgeräten optimal nutzbar sein und eine schnelle Ladezeit von unter einer Sekunde aufweisen. Änderungen an Einträgen sollen historisiert werden, um Transparenz und Nachvollziehbarkeit zu gewährleisten. Zudem sollen sämtliche Anmeldungen an die Plattform protokolliert werden, um die Sicherheit zu erhöhen und Missbrauch vorzubeugen.

## Technologie Stack
Das Projekt "Awesome HSLU" setzt auf folgenden Technologie Stack:

### Frontend
- **Angular**: Einsatz für die Erstellung der Benutzeroberfläche. Angular Server-Side Rendering (SSR) mit Angular Universal wird für Performance und SEO-Optimierung in Betracht gezogen.

### Backend
- **Node.js und Express**: Verwendung von Node.js als Laufzeitumgebung und Express als Webanwendungsframework für die Entwicklung der Backend-API.

### Datenbank
- **MongoDB mit Mongoose**: MongoDB dient als NoSQL-Datenbanklösung. Mongoose wird als ODM (Object Data Modeling) Framework eingesetzt, um die Interaktion mit der Datenbank zu erleichtern.

### Entwicklungssprache
- **TypeScript**: Durchgängige Verwendung von TypeScript im gesamten Projekt für Frontend und Backend zur Verbesserung der Codequalität und -wartung.

### Potenzielle Erweiterungen
- **Angular SSR/Universal**: Wird möglicherweise für verbesserte Ladezeiten und SEO implementiert.

Diese Technologien bilden die Grundlage für die Entwicklung und den Betrieb der Plattform.

## Architektur
Die Architektur des Projekts "Awesome HSLU" basiert auf einem monolithischen Ansatz, bei dem Frontend, Backend und Datenbankkomponenten in einer einzigen, zusammenhängenden Anwendung integriert sind.