import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
// import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
  inputForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-lis'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputForm.addEventListener('input', debounce(onInputForm, DEBOUNCE_DELAY));

// fetch(
//   'https://restcountries.com/v3.1/name/sweden?fullText=true&fields=name.official,capital,population,flags.svg,languages'
// )
//   .then(response => {
//     return response.json();
//   })
//   .then(country => {
//     console.log(country);
//   });

function onInputForm(e) {
  e.preventDefault();
  let countryName = e.target.value.trim();
  console.log(countryName);
  fetchCountries(countryName);
  console.log(fetchCountries(countryName));
  //   .then(data => {
  //   console.log(data);
  // });
  // console.log(fetchCountries(countryName));
}

function fetchCountries(name) {
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
}
