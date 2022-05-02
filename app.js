const express = require("express");
// for the api call 
const https = require("https");
const bodyParser = require("body-parser")



const app = express();
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req,res){
    res.sendFile(__dirname + '/index.html')
    
})

app.post("/", function(req,res){
    const query = req.body.cityName;
    const unit = 'metric';
    const apiKey = "e17de1fc2f455f7900952aa5e7ea92db";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+",Lagos&appid="+apiKey+"&units="+unit
    
    https.get(url,function(response){
        // console.log(response.statusCode);
        response.on("data", function(data){
            // changing the json to javascript object
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            // console.log(temp)
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            // console.log(icon);
            const ImageUrl ="http://openweathermap.org/img/wn/"+ icon+"@2x.png";

            // console.log(weatherDescription);
            res.write("<h1>The temperature in "+query+ " is " + temp+" degree Celsius</h1>" );
            res.write("<p>The Weather in "+query+ " is " + weatherDescription +"</p>");
            res.write(`<img src=${ImageUrl} alt=:() >`);
            res.send();

        })
    })
    // you only send res once
    // res.send("Server is up and running")


    
})



// const query = 'Ghana';
//     const apiKey = "e17de1fc2f455f7900952aa5e7ea92db";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+",Lagos&appid="+apiKey+"&units="+unit
//     const unit = 'metric';
//     https.get(url,function(response){
//         console.log(response.statusCode);
//         response.on("data", function(data){
//             // changing the json to javascript object
//             const weatherData = JSON.parse(data);
//             const temp = weatherData.main.temp;
//             // console.log(temp)
//             const weatherDescription = weatherData.weather[0].description;
//             const icon = weatherData.weather[0].icon;
//             console.log(icon);
//             const ImageUrl ="http://openweathermap.org/img/wn/"+ icon+"@2x.png";

//             // console.log(weatherDescription);
//             res.write("<h1>The temperature in "+query+ " is " + temp+" degree Celsius</h1>" );
//             res.write("<h1>The Weather in "+query+ " is " + weatherDescription +"</h1>");
//             res.write(`<img src=${ImageUrl} alt=:() >`);
//             res.send();

//         })
//     })
//     // you only send res once
//     // res.send("Server is up and running")


app.listen(3000, function(){
    console.log("Server is running at port 3000")
})



