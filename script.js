window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperaturedescription = document.querySelector(".description");
    let temperaturedegree = document.querySelector(".degree");
    let zone = document.querySelector(".location_time");
    let tempsection = document.querySelector(".degree_section");
    let span = document.querySelector(".degree_section span")

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/5084abf40924e87e06c634999010361b/${lat},${long}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temperature,summary,icon} = data.currently;
                    temperaturedegree.textContent = temperature;
                    temperaturedescription.textContent = summary;
                    zone.textContent = data.timezone;
                    iconsetting(icon,icon1);
                    let cel = (temperature - 32) * (5/9);

                                       
                    tempsection.addEventListener('click',() =>{
                        if(span.textContent === 'F'){
                            span.textContent = 'C';
                            temperaturedegree.textContent = Math.floor(cel);
                        }else{
                            span.textContent = 'F';
                            temperaturedegree.textContent = temperature;
                        }
                    });

                });

        });
    }

    function iconsetting(icon,id){

        const skycons = new Skycons({color: "white"});
        const curricon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(id,Skycons[curricon]);
    }

});