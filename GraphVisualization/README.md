# GraphVisualization

I detta repo hittar vi kod för backend som hämtar kursberoenden från kth, parsar texterna, lägger in kurser i databasen och ger möjlighet att köra en server för att hämta information från databasen. Här kommer en liten guide till hur vi får igång databasen så att den kan användas i produkten som hittas på [tedodor/Graph](https://github.com/tedodor/Graph).

Börja med att clona detta repo.

## Installera mjukvaror

För att köra alla delar av backenden behöver vi installera elasticsearch och pyparsing.

### Elasticsearch

Ladda ner version 5.3.0 från [../downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch) och extrahera alla filer.

För att starta databasen körs filen `bin/elasticsearch` (eller `bin/elasticsearch.bat` i windows).

#### Speciellt för windowsanvändare

För att kunna köra filen ovan kan du behöva lägga till en eller två miljövariabel. Jag behövde lägga till 

1. `Variabelnamn: JAVA_HOME`, `Värde: 'path till java' (ex: C:\Program Files (x86)\Java\jdk1.8.0_121)`
2. `Variabelnamn: _JAVA_OPTIONS`, `Värde: -Xmx512M -Xms256M`

### Pythonbibliotek

Vi behöver installera biblioteken pyparsing och elasticsearch till python.

Om du har pip kan du köra `pip install pyparsing` och `pip install elasticsearch`. Annars, installera pip!

För att installera pip sparar du denna [fil](https://bootstrap.pypa.io/get-pip.py) som .py och kör den. 

Är du windowsanvändare kan du efter installation av pip behöva lägga till ett värde till miljövariabeln Path. Redigera den befintliga variabeln Path och lägg till ett nytt värde med address till pip (ex: C:\Users\Jonathan\AppData\Local\Programs\Python\Python35-32\Scripts).

## Fyll databasen

Databasen behöver bara fyllas första gången du ska använda den på datorn eller när du vill uppdatera den. För att fylla din lokala databas med kursinformation behöver du:

1. Starta elasticsearch genom att köra `bin/elasticsearch` (eller `bin/elasticsearch.bat` i windows)
2. Kör filen `execute.py` från detta repo

Det tar en stund att fylla den så ha tålamod. Massa text skrivs ut i terminalen där pythonfilen körs när den är klar.

## Starta databasen

Med en fylld databas (som bara behöver fyllas en gång) kan vi nu göra den tillgänglig för [hemsidan](https://github.com/tedodor/Graph) genom att starta den och servern.

1. Starta elasticsearch genom att köra `bin/elasticsearch` (eller `bin/elasticsearch.bat` i windows)
2. Kör filen `server.py` från detta repo

Servern borde då starta på port 8080 och vi kan använda den från det andra projektet [teodor/Graph](https://github.com/tedodor/Graph)
