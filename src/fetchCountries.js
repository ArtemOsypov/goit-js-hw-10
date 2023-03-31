function fetchCountries(name) {
  const url = 'https://restcountries.com/v3.1/name';
  fetch('url / ${ name }')
    .then(response => response.json)
    .then(onResolve)
    .catch(onReject);
}

function onResolve() {
  console.log(response);
}

function onReject() {
  console.log('error');
}
