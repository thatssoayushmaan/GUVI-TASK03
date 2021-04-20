var rq = new XMLHttpRequest()
rq.open('GET','https://restcountries.eu/rest/v2/all',true)
rq.send()
rq.onload = function(){
    var country = JSON.parse(this.response)
    for (var i in country){
        try{
            var cname = country[i].name
            var latlong = country[i].latlng
            //console.log(country[i].latlng)
            if (latlong === 0) {throw new Error("Latitude and Longitude not found")}
            weatherData(cname, ...latlong)

        }
        catch(e){
            console.log("Invalid Coordinates" + cname + ' ' + e.message)
        }
    }
}

var weatherData = function(name,lat,lng){
    var URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=15d5db89456466b90d2c3b9c9bf070e6`
    var rq1 = new XMLHttpRequest()
    rq1.open('GET',URL,true)
    rq1.send()
    rq1.onload = function(){
        var data = JSON.parse(this.response)
        console.log(`${name} : ${data.main.temp}`)
    }
}