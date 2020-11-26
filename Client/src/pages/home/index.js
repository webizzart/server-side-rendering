import './style.pcss';
import HTML from './template.html';
import { CustomElement } from '../../customComponent/customComponent';

export default class MyApp extends CustomElement {

  constructor() {
    super();
    this.innerHTML = HTML;
    this.name = "Hello world";
    this.count = 0;

    this.render(this,{tal:"hello tal",name:"this is name"});
  }
  countUp() {      
    const tal = this.tal;
    tal.innerHTML = "HELLO TAL"
    console.log(tal)
    this.titleElement.innerHTML = "I was clicked" + this.count++;
  }
  connectedCallback() {
  }
}
