import addBaseElements from './addBaseDOMElements';

document.body.onload = addBaseElements;

if (module.hot) {
  module.hot.accept();
}
