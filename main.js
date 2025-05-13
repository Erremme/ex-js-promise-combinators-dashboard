/*
In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).
Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
*/

/*
Note del docente
Scrivi la funzione getDashboardData(query), che deve:
Essere asincrona (async).
Utilizzare Promise.all() per eseguire più richieste in parallelo.
Restituire una Promise che risolve un oggetto contenente i dati aggregati.
Stampare i dati in console in un messaggio ben formattato.
Testa la funzione con la query "london"
*/

/*  
Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata. Testa la funzione con la query “vienna” (non trova il meteo).
*/

async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}

async function getDashboardData(query) {
    try{
    const destinationPromise = fetchJson(`http://localhost:5000/destinations?search=${query}`)
    const weatherPromise = fetchJson(`http://localhost:5000/weathers?search=${query}`)
    const airportPromise = fetchJson(`http://localhost:5000/airports?search=${query}`)

    const promises = [destinationPromise, weatherPromise, airportPromise];
    const [destinations ,weathers, airports  ] = await Promise.all(promises)

    const destination = destinations[0]
    const weather = weathers[0]
    const airport = airports[0]

    return {
        city: destinations?.name ?? null,
        country: destinations?.country ?? null,
        temperature: weather?.temperature ?? null,
        weather: weather?.weather_description ?? null,
        airport: airport?.name ?? null
    }

    }catch (error) {
        throw new Error(`Errore nel recupero dei dati: ${error.message}` );
        
       
    }
   

  
}

getDashboardData('london')
    .then(data => {
        let frase = '';
        if (data.city && data.country) {
            frase += `${data.city} is in ${data.country}.\n`;
        }
        if (data.temperature && data.weather) {
            frase += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
        }
        if (data.airport) {
            frase += `The main airport is ${data.airport}.\n`;
        }
        console.log(frase);
    })
    .catch(error => console.error(error));






