import _ from 'lodash'


 //selezione elementi HTML da modificare
 
 let citySearched = document.querySelector('.searched-city');
 let aqIndicator = document.querySelector('.aqi-indicator');
 let warning = document.querySelector('.warning');
 let title = document.querySelector('.title');
 const cityForm= document.querySelector('.search');
 const cityValue = document.querySelector('.search input');

 //costanti API
 const key = process.env.API_KEY;

window.addEventListener('load', () =>{
    

    let latitude;
    let longitude;
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            

            //Fetching dei dati utili (aqi e città)
            

            const api = `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${key}`;

            fetch(api)
                .then(data =>{
                    return data.json();
                })
                .then(data =>{
                    const aqi = _.get(data, 'data.aqi', 0);
                    const city= _.get(data, 'data.city') 

                    //Cambio paragrafi

                    title.textContent = 'L\'indice di qualità dell\'aria a';
                    citySearched.textContent = `${city.name}`;
                    aqIndicator.textContent = aqi;
                    warning.textContent = '';
                    

                    //Modifica dei colori dello sfondo in base all'AQI
                    if(aqi < 51){
                        document.body.className = 'Good';
                    }else if(aqi>50 && aqi<101){
                        document.body.className = 'Moderate';
                    }else if(aqi>100 && aqi<151){
                        document.body.className = 'Sensitive';
                    }else if(aqi>150 && aqi<201){
                        document.body.className = 'Unhealthy';
                    }else if(aqi>200 && aqi<301){
                        document.body.className = 'Very';
                    }else{
                        document.body.className = 'Hazard';
                    }
                    
                })
        })
    }
});

cityForm.addEventListener('submit', (event)=> {

    
    event.preventDefault(); //evita che si riaggiorni la pagina
    const city = cityValue.value.trim(); //prende il valore dell'input
    cityForm.reset(); //resetta il campo input
    const api = `https://api.waqi.info/feed/${city}/?token=${key}`;

    fetch(api)
        .then(data =>{
            return data.json();
        })
        .then(data =>{
            const aqi = _.get(data, 'data.aqi', 0);
            

           //Cambio paragrafi
           title.textContent = 'L\'indice di qualità dell\'aria a';
           citySearched.textContent = `${city}`;
           aqIndicator.textContent = aqi;
           warning.textContent = '';
           

           //Modifica dei colori dello sfondo in base all'AQI
           if(aqi < 51){
               document.body.className = 'Good';
           }else if(aqi>50 && aqi<101){
               document.body.className = 'Moderate';
           }else if(aqi>100 && aqi<151){
               document.body.className = 'Sensitive';
           }else if(aqi>150 && aqi<201){
               document.body.className = 'Unhealthy';
           }else if(aqi>200 && aqi<301){
               document.body.className = 'Very';
           }else{
               document.body.className = 'Hazard';
           }
          

        })

        
                    
   
})

