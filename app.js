// instantiate country class
const country = new Country();

class UI{
  showDetail(info){
    let borders = '';
    info.borders.forEach((border) => {
      borders += `
      <div class="col col-6 bg-light border p-2">${border}</div>
      `
    })

    //Getting currencies details
    const currenciesArray = Object.entries(info.currencies).map(([code, details]) => ({
      code, details
    }));

    //Getting Language details
    const langArray = Object.entries(info.languages).map(([code, details]) => ({
      code, details
    }));

    const container = document.querySelector('.outputSearch');

    container.innerHTML = `
    <div class="card card-body mb-2">
    <h2 class="text-center text-primary">${info.name.common}</h2>
    <h3 class="text-center">${info.name.official}</h3>
    <h3 class="text-center">(Capital: ${info.capital})</h3>
    <div class="row mt-2 g-2">
      <div class="col col-12 col-md-6 mx-auto mb-2">
        <h5 class="text-center">National Flag</h5>
        <img src="${info.flags.png}" alt="" class="img-fluid imgFlag">
      </div>
      <div class="col col-12 col-md-6 mx-auto mt-3">
        <h5 class="text-center">Coat of Arm</h5>
        <img src="${info.coatOfArms.png}" alt="" class="img-fluid imgCofArm">
      </div>
    </div>
  </div>
  <div class="card card-body mb-2">
    <h2 class="text-center mt-2">Currency</h2>
    <div class="row g-2 text-center">
      <div class="curr col col-12 col-sm-6">Name: <br>${currenciesArray[0].details.name}</div>
      <div class="curr col col-12 col-sm-6">Symbol: <br>${currenciesArray[0].details.symbol}</div>
    </div>
  </div>
  <div class="card card-body mb-2">
    <h2 class="text-center">Region/Language</h2>
    <div class="row g-2">
      <div class="rl col col-12 col-sm-4 text-center">Region: <br>${info.region}</div>
      <div class="rl col col-12 col-sm-4 text-center">Sub Region: <br>${info.subregion}</div>
      <div class="rl col col-12 col-sm-4 text-center">Language: <br>${langArray[0].details}</div>
    </div>
  </div>
  <div class="card card-body mb-2 text-center">
    <h2 class="text-center">Land Informations</h2>
    <div class="row g-2">
      <div class="col col-12 col-md-3 col-sm-6 bg-light border">Latitude: <br> ${info.latlng[0]}</div>
      <div class="col col-12 col-md-3 col-sm-6 bg-light border">Longtitude: <br> ${info.latlng[1]}</div>
      <div class="col col-12 col-md-3 col-sm-6 bg-light border">Land Mass: <br> ${info.area}</div>
      <div class="col col-12 col-md-3 col-sm-6 bg-light border">Population: <br> ${info.population}</div>
    </div>
  </div>
  <div class="card card-body mb-2 text-center">
    <h2>Countries that shares Border</h2>
    <div class="row g-2">
    ${borders}
    </div>
  </div>
  <div class="card card-body mb-2 text-center">
    <h2>${info.name.common} Map</h2>
    <div class="row" id="map">
    
    </div>
  </div>
    `;
    //Defining latitude and longtitude
    const lat = info.latlng[0]
    const lng = info.latlng[1]
    ui.showMap(lat, lng)
  }
  showAlert(messg, className){
    const container = document.querySelector('.searchContainer');
    const uiform = document.querySelector('#form');
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(messg));
    container.insertBefore(div, uiform);
    setTimeout(() => {
      div.remove();
    }, 2000)
  }

  showMap(latitude, longitude) {
    const apiKey = 'MwOqoMdSSiEbNt20MMSzqeC26dgOxwZD';
    const mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&center=${latitude},${longitude}&size=600,400&zoom=10`;
  
    const mapImage = document.createElement('img');
    mapImage.src = mapUrl;
  
    document.getElementById('map').appendChild(mapImage);
  }
}

//instantiate UI class
const ui = new UI()

// Listen to submit
document.querySelector('#form').addEventListener('submit', (e) => {
  //get country name
  const cname = document.querySelector('#searchInput').value;

  countryD = country.getCountry(cname);
  if(cname === ''){
    ui.showAlert("Search Box cannot be empty", "alert alert-danger")
  }else{
    countryD
      .then((data) => {
        if(data.message === 'Not Found'){
          ui.showAlert('Not a valid Country', 'alert alert-danger');
        }else{
          ui.showDetail(data[0]);
        }
      })
      .catch((err) => {ui.showAlert(`${err.message}`, "alert alert-danger")})
  }
  e.preventDefault();
})
