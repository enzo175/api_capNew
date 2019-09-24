'use strict'


//documentation page below  ↓↓↓
//https://www.weatherbit.io/api/airquality-current

// "https://api.weatherbit.io/v2.0/current"

// apikey for weatherbit: "8103110ef30f43aba760f8b8e90d3ee8"

const apiKey = "8103110ef30f43aba760f8b8e90d3ee8"
const highlightColor = 'rgba(0,0,0,1)'

const searchUrl = "https://api.weatherbit.io/v2.0/current/airquality"


function formatQueryParams(params) {
    const queryItems = $.param(params);
    return queryItems;
}

function updateBarColor(barIndex) {
    //reset to default colors, then highlight the provided barIndex
    window.myBarChart.config.data.datasets[0].backgroundColor = window.defaultBarColors.slice(0)
    window.myBarChart.config.data.datasets[0].backgroundColor[barIndex] = highlightColor
    window.myBarChart.update()
}


function displayResults(responseJson) {
    console.log(responseJson)
    $('#js-aqiResults').empty();
    $('#js-aqiResults').append(`
    <h2>${responseJson.city_name}</h2>`)

    let barIndex
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#js-aqiResults').append(
            `<p>${responseJson.data[i].aqi}</p>`)
        let aqiNum = `${responseJson.data[i].aqi}`
        $("#js-wordResponse").empty()
        if (aqiNum <= 50) {
            barIndex = 0
            $("#js-wordResponse").html("Good");

        } else if (aqiNum >= 51, aqiNum < 100) {
            barIndex = 1
            $("#js-wordResponse").html('Moderate');
        }
        else if (aqiNum >= 100, aqiNum < 150) {
            barIndex = 2
            $("#js-wordResponse").html("Unhealthy")
        }
        else if (aqiNum >= 150, aqiNum < 200){
            barIndex = 3
            $("#js-wordResponse").html('Really Unhealthy')
        }
        else {
            barIndex = 4
            $("#js-wordResponse").html('Stay Inside')
        }
    }
    updateBarColor(barIndex)
}


function getAir(query) {
    const params = {
        postal_code: query,
        key: apiKey,
    };

    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString

    console.log(url)


    $('#js-aqiResults').html('<p>Checking particles in the air...</p>')
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-aqiResults').empty()
            $('#js-error').text(`something went wrong: ${err.message}`);
        })
}
//show the chart.js
function formEffect() {
    $("form").submit(event => {
        event.preventDefault();
        $(".js-wrapper").fadeIn("slow");
    })
}
// jquery animations
function sliding() {
    $(".container").animate({ width: "250px" }, 2000)
    let flag = true;
    $('form').submit(event => {
        $(".result-wrapper").animate({ width: "250px" }, 2000)
        $('.hidden').fadeIn(2000)
        if (flag){
        if (window.innerWidth > 700) {
             $('canvas').animate({ marginTop: "-=450px", maxHeight: "450px" }, 3500);
             flag = false;
        }}
    })
}
// about us page
function aboutUsButton(){
    $('#js-aboutUs').on('click', event =>{
        event.preventDefault();
        $('.js-whole-wrapper').empty();
        $('.js-whole-wrapper').append(`
        <h1>About Us</h1>
        <section class="us"> <h2> This page is dedicated to keeping you informed on
        the latest Air quality information so you can always be in the know about 
        what is going in and out of your lungs. Always check the AQI levels
        before stepping out and remmeber to try and keep your air clean.</h2></section>\
        <h2>Ways to prevent air pollution</h2>
       <ul id="ways-to-prevent"> 
       <li>Reduce the number of trips you take in your car. Walking and biking isn't so
       bad, actually it's good for the environment's health and yours</li>
       <li>Keep your vechile's engines properly maintained at all times</li>
       <li>Avoid buring trash leaves or other materials</li> 
       <li>Take good care of your wood stove or fireplace</li>
       <li>Grow your own food, it is healthy for you and the environment</li> </ul>
       <img src="https://cff2.earth.com/uploads/2016/11/03135030/clean-air-pollution_1big_stokc.jpg" alt="unraveling clean air">
       `)
    })
}
//run all the functions
function watchForm() {
    aboutUsButton();
    sliding();
    $('form').submit(event => {
        event.preventDefault()
        const searchTerm = $("#zip-code").val();
        getAir(searchTerm);
    })
}

$(watchForm)