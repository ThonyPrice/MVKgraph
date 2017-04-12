# GraphVisualization

I detta repo hittar vi kod för frontend delen som är byggd med hjälp av angular och D3js. Här kommer en liten guide till hur du kan göra för att testa grafen i en lokal utvecklingsmiljö. Du kommer även behöva ett annat git repo för att testa all funktionalitet (se 4. starta databasserver).

Börja med att clona detta repo.

## 1. Rätt versioner av mjukvara

För att kunna testa en hemsida som är byggd i angular behöver den köras på en lokal server. För att få det att fungera kan vi använda node.js och npm. 

Kolla om du har rätt versioner genom att köra `node -v` och `npm -v`:

```
>node -v
v6.10.0
>npm -v
3.10.3
```
> För att köra hemsidan behövs åtminstone node `6.9.x` (se till att inte köra node 7) samt npm `3.x.x`.

## 2. npm install

Använd terminalen och hitta in i mappen för detta repo. Exempelvis `C:\Users\Jonathan\Documents\GitHub\Graph`.

Kör `npm install`. Då skapas en ny mapp med namnet `node_modules`.

## 3. npm start

Nu har vi filerna som behövs för detta repo och kan testa starta en lokal server.

Kör `npm start` eller `ng serve` i projektmappen. Då startas en server som kan nås från [http://localhost:4200](http://localhost:4200).

## 4. starta databasserver

För att kunna testa den mesta av funktionaliteten i produkten behövs även tillgång till databasen. Hur den aktiveras kan du läsa om på det andra git repot som behövs: [teodor/GraphVisualisation](https://github.com/tedodor/GraphVisualization)
