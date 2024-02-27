# Client
```sh
cd client
npm install
npm run build
```

# Server
Zuerst muss der Client Build erstellt werden.

Danach kann die `.env.example` in `.env` umbenannt werden. Die voreingestellten Werte aus dem `.env.example` funktionieren zum testen bereits, sollten aber für eine Produktive umgebung angepasst werden.

```sh
cd server
npm install
docker compose build
docker compose up
```

Danach sollte die Webseite auf `localhost:3000` verfügbar sein.

# Tests
Sowohl auf dem Client als auf dem Server können mit `npm test` alle Tests ausgeführt werden. 

Auf dem Client muss zuerst `new serve [--mode production]` laufen.

Auf dem Client muss zuerst `npm run tsc` ausgeführt werden; ts-jest unterstützt aktuell noch kein top-level await.