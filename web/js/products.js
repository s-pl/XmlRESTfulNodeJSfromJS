window.onload = initialize;

function initialize() {
    downloadAllMonuments();
    document.getElementById("form-monument").addEventListener("submit", createMonument);
}

function validateMonument(event) {
    let name = event.target.name.value;
    let address = event.target.address.value;
    let description = event.target.description.value;
    let latitude = event.target.latitude.value;
    let longitude = event.target.longitude.value;

    let error = false;
    

    document.getElementById("error-name").style.display = "none";
    document.getElementById("error-address").style.display = "none";
    document.getElementById("error-description").style.display = "none";
    document.getElementById("error-latitude").style.display = "none";
    document.getElementById("error-longitude").style.display = "none";

    if (!name) {
        document.getElementById("error-name").style.display = "block";
        error = true;
    }

    if (!address) {
        document.getElementById("error-address").style.display = "block";
        error = true;
    }

    if (!description) {
        document.getElementById("error-description").style.display = "block";
        error = true;
    }

    if (!latitude) {
        document.getElementById("error-latitude").style.display = "block";
        error = true;
    }

    if (!longitude) {
        document.getElementById("error-longitude").style.display = "block";
        error = true;
    }

    return !error;
}

function createMonument(event) {
    event.preventDefault();

    if (validateMonument(event)) {
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:1337/monuments', true);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                downloadAllMonuments();
            }
        };
        request.setRequestHeader('Content-Type', 'text/xml');
        request.send('<?xml version="1.0" encoding="UTF-8"?>' +
            '<Monuments>' +
            '<Monument>' +
            '<Name>' + event.target.name.value + '</Name>' +
            '<Address>' + event.target.address.value + '</Address>' +
            '<Description>' + event.target.description.value + '</Description>' +
            '<Coordinates>' +
            '<Latitude>' + event.target.latitude.value + '</Latitude>' +
            '<Longitude>' + event.target.longitude.value + '</Longitude>' +
            '</Coordinates>' +
            '</Monument>' +
            '</Monuments>'
        );
        
      
    }
}

function downloadAllMonuments() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:1337/monuments', true);
    request.onload = function () {

        console.log(this.response);

        // Begin accessing XML data here
        showAllMonuments(this.response);
        document.getElementById("show_all").click();
    }
    request.send();
}

function showAllMonuments(data) {

    let parser = new DOMParser();
    let xmlData = parser.parseFromString(data, "text/xml");

    let xmlMonuments = xmlData.getElementsByTagName("Monument");

    let result = "";

    for (let i = 0; i < xmlMonuments.length; i++) {
        result +=
            '<div class="card mt-2">' +
            '<div class="card-body">' +
            '<h4 class="card-title">' + xmlMonuments[i].getElementsByTagName("Name")[0].textContent + '</h4>' +
            '<p class="card-text">' + xmlMonuments[i].getElementsByTagName("Address")[0].textContent + '</p>' +
            '<p class="card-text">' + xmlMonuments[i].getElementsByTagName("Description")[0].textContent + '</p>' +
            '<p class="card-text">' + xmlMonuments[i].getElementsByTagName("Coordinates")[0].textContent + '</p>' +
            '</div>' +
            '</div>';
    }

    document.getElementById("monuments_show").innerHTML = result;
}
