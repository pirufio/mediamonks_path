

document.addEventListener('DOMContentLoaded', function(){


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var response = JSON.parse(xhttp.response);
            window.sliderComponent = new SliderComponent(response.data);
        }
    };
    xhttp.open("GET", "assets/json/data.json", true);
    xhttp.send();

});