var canvas = document.getElementById('myChart');
var data = {
    labels: ["Amazing", "Moderate", "Unhealthy", "Really Unhealthy", "Stay Inside", "Wear a Mask Past This"],
    datasets: [
        {
            label: "AQI Measurements",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [ 0, 50, 100, 150, 200, 250],
        }
    ]
};
var option = {
animation: {
				duration:5000
}

};


var myBarChart = Chart.Bar(canvas,{
	data:data,
  options:option
});