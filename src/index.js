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

function onInputForm(e) {
  e.preventDefault();
  let countryName = e.target.value.trim();
  console.log(countryName);
  fetchCountries(countryName);
  // .then(data => {
  //   if (data.length > 10) {
  //     console.log('more then 10 countries');
  //   }
  //   console.log('render HTLM code');
  // })
  // .catch(error => {
  //   console.log('clear Form');
  // });
  console.log(fetchCountries(countryName));
}

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (response.status === 404) {
        return Promise.reject();
      }
      // console.log(response.json());
      return response.json();
    })
    .then(country => {
      console.log(country);
      return;
    })
    .catch(error);
}

function error() {
  Notiflix.Notify.failure(`Oops, there is no country with that name`);
}
