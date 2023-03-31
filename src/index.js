import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;

const refs = {
  inputForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-lis'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputForm.addEventListener('input', debounce(onInputForm, DEBOUNCE_DELAY));

function onInputForm(e) {
  e.preventDefault();
  let inputData = e.target.value.trim();
  console.log(inputData);
  fetchCountries(inputData);
}
