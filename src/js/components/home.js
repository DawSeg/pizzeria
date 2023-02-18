
import {templates} from '../settings.js';

class Home{
  constructor(element){
    const thisHome = this;
  
    thisHome.render(element);
  }
  
  render(element){
    const thisHome = this;
  
    /* generate HTML based on template */
    const generatedHTML = templates.homePage();
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    /* create element using utils.createElementFromHTML */
    //thisHome.element = utils.createDOMFromHTML(generatedHTML);
    /* find menu container */
    //const homeContainer = document.querySelector(select.containerOf.homePage);
    /* add element to menu */
    //homeContainer.appendChild(thisHome.element);
  } 
}


export default Home;