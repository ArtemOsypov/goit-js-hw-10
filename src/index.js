import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
  inputForm: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputForm.addEventListener('input', debounce(onInputForm, DEBOUNCE_DELAY));

function onInputForm(e) {
  e.preventDefault();
  let countryName = e.target.value.trim();
  // console.log(countryName);
  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        clearTemplate();
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
        return;
      }
      // console.log('render HTLM code');
      renderTemplate(data);
    })
    .catch(error => {
      // console.log('clear Form');
      clearTemplate();
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
}

function renderTemplate(elements) {
  let template = '';
  let refsTemplate = '';
  clearTemplate();

  if (elements.length === 1) {
    template = createTemplateItem(elements);
    refsTemplate = refs.countryInfo;
  } else {
    template = createTemplateItemList(elements);
    refsTemplate = refs.countriesList;
  }

  drawTemplate(refsTemplate, template);
}

function createTemplateItem(element) {
  return element.map(
    ({ name, capital, population, flags, languages }) =>
      `
      <img
        src="${flags.svg}" 
        alt="${name.official}" 
        width="120" 
        height="80">
      <h1 class="country-info__title">${name.official}</h1>
      <ul class="country-info__list">
          <li class="country-info__item">
          <span>Capital:</span>
        ${capital}
          </li>
          <li class="country-info__item">
          <span>Population:</span>
          ${population}
          </li>
          <li class="country-info__item">
          <span>Lenguages:</span>
          ${Object.values(languages)}
          </li>
      </ul>
  `
  );
}

function createTemplateItemList(elements) {
  return elements
    .map(
      ({ name, flags }) => `
      <li class="country-list__item">
        <img class="country-list__img" 
          src="${flags.svg}" 
          alt="${name.official}" 
          width="60" 
          height="40">
        ${name.official}
      </li>`
    )
    .join('');
}

function clearTemplate() {
  refs.countryInfo.innerHTML = '';
  refs.countriesList.innerHTML = '';
}

function drawTemplate(refs, markup) {
  refs.innerHTML = markup;
}
