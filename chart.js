var canvas = document.getElementById('myChart');
window.defaultBarColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 99, 132, 0.2)",

]
var data = {
    labels: ["Amazing", "Moderate", "Unhealthy", "Really Unhealthy", "Stay Inside", "Wear a Mask Past This"],
    datasets: [
        {
            label: "AQI Measurements",
            // backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [10, 50, 100, 150, 200, 250],
            backgroundColor: defaultBarColors.slice(0),
        }
    ]
};
var option = {
    animation: {
        duration: 5000
    }

};


window.myBarChart = Chart.Bar(canvas, {
    data: data,
    options: option
});

