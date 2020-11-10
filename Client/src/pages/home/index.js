import './style.pcss';
import HTML from './template.html';

export default class MyApp extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = HTML;
  }
   
}
