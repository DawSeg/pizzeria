import { templates, classNames, select } from "../settings.js";
import utils from "../utils.js";

class HomePage {
  constructor(element) {
    const thisHomePage = this;

    thisHomePage.render(element);
  }

  render(element) {
    const thisHomePage = this;
    
    const generatedHTML = templates.homePage();
    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = element;
    thisHomePage.dom.wrapper.innerHTML = generatedHTML;
    thisHomePage.element = utils.createDOMFromHTML(generatedHTML);

    const elem = document.querySelector(".main-carousel");
    const flkty = new Flickity(elem, {
      cellAlign: "left",
      contain: true,
      autoPlay: 3000,
    });

    thisHomePage.pages = document.querySelector(
      select.containerOf.pages
    ).children;

    thisHomePage.navLinks = document.querySelectorAll(select.nav.links);
    thisHomePage.homeLinks = document.querySelectorAll(select.nav.homeLinks);
    const idFromHash = window.location.hash.replace("#/", "");
    let pageMatchingHash = thisHomePage.pages[0].id;

    for (let page of thisHomePage.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisHomePage.activatePage(pageMatchingHash);

    for (let link of thisHomePage.homeLinks) {
      link.addEventListener("click", function (event) {
        const clickedElement = this;
        event.preventDefault();
        /* get page id from href attribute */
        const id = clickedElement.getAttribute("href").replace("#", "");
        /* run this.App.activatePage with that id */
        thisHomePage.activatePage(id);
        /* change URL hash */
        window.location.hash = "#/" + id;
      });
    }
  }
  activatePage(pageId) {
    const thisHomePage = this;

    /* add class 'active' to matching pages, remove from non-matching */
    for (let page of thisHomePage.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /* add class 'active' to matching links, remove from non-matching */
    for (let link of thisHomePage.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute("href") == "#" + pageId
      );
    }
  }
}

export default HomePage;
