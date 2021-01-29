
window.addEventListener('load', () =>{
    //Selezione elementi HTML da modificare
    
    let città = document.querySelector('.città');
    let aqIndicator = document.querySelector('.indicatore-aqi');
    let avviso = document.querySelector('.avviso');
    let titolo = document.querySelector('.titolo');
   
   
    
    //Geolocalizzazione

    let latitude;
    let longitude;
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            

            //Fetching dei dati utili (aqi e città)
            
            const key = process.env.API_KEY;
            const api = `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${key}`;

            fetch(api)
                .then(data =>{
                    return data.json();
                })
                .then(data =>{
                    const {aqi, city} = data.data;

                    //Cambio paragrafi

                    titolo.textContent = "L'indice di qualità dell'aria a"
                    città.textContent = `${city.name}`;
                    aqIndicator.textContent = aqi;
                    avviso.textContent = "";
                    

                    //Modifica dei colori dello sfondo in base all'AQI
                    if(aqi < 51){
                        document.body.className = "Good";
                    }else if(aqi>50 && aqi<101){
                        document.body.className = "Moderate";
                    }else if(aqi>100 && aqi<151){
                        document.body.className = "Sensitive";
                    }else if(aqi>150 && aqi<201){
                        document.body.className = "Unhealthy";
                    }else if(aqi>200 && aqi<301){
                        document.body.className = "Very";
                    }else{
                        document.body.className = "Hazard";
                    }
                    
                });
        })
    }
});

