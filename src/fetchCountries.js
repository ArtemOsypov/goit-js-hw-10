// const url = 'https://restcountries.com/v3.1/name';
const fetchCountries = function (name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    console.log(fetchCountries());
    if (!response.status === 404) {
      Promise.reject(new Error());
      console.log('Такой страни не існує');
    }
    console.log(response.json());
    return response.json();
  });
};

export { fetchCountries };

// ?fields=name,capital,population,flags,languages
