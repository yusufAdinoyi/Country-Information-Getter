class Country{
  async getCountry(name){
    const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${name}`);

    const country = await countryResponse.json();

    return country
  }
}
