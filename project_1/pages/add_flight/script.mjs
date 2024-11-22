import { SelectOptionsInjector } from '../../utils/selectOptionsInjector.mjs';
import { originsList } from './data/origins.js';

(() => {
  const injector = new SelectOptionsInjector();

  injector.inject({
    select: document.getElementById('origin'),
    options: originsList,
  });
})();
