let isGeolocationActive = false; // Variable pour vérifier si la géolocalisation est active

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        isGeolocationActive = true; // Indique que la géolocalisation a été utilisée
    } else {
        document.querySelector("#map").innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const latlon = `${lat},${lon}`; // Format des coordonnées

    const img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=600x400&key=YOUR_API_KEY`;

    // Mettre à jour le champ d'adresse seulement si la géolocalisation est active
    if (isGeolocationActive) {
        document.getElementById("adressePostale").value = latlon;
    }

    // Afficher la carte
    document.querySelector("#map").innerHTML = `
        <img src='${img_url}' style='max-width: 100%; height: auto;'>
    `;

    isGeolocationActive = false; // Réinitialiser l'état après utilisation
}



function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.querySelector("#map").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.querySelector("#map").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.querySelector("#map").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.querySelector("#map").innerHTML = "An unknown error occurred.";
            break;
    }
}
