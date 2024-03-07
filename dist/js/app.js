import { settings, select, classNames } from "./settings.js";
import Product from "./components/product.js";
import Cart from "./components/cart.js";
import Booking from "./components/booking.js";
import HomePage from './components/HomePage.js'

const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    const idFromHash = window.location.hash.replace("#/", "");
    let pageMatchingHash = thisApp.pages[0].id;
    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);
    for (let link of thisApp.navLinks) {
      link.addEventListener("click", function (event) {
        const clicked = this;
        event.preventDefault();
        //get id from href
        const id = clicked.getAttribute("href").replace("#", "");
        //run thisApp.activatePage with thath id
        thisApp.activatePage(id);
        //change URL hash
        window.location.hash = "#/" + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

    //add class active to matching page, remove from non-matching
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    //add class active to matching link, remove from non-matching
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute("href") == "#" + pageId
      );
    }
  },

  initHome: function () {
    // eslint-disable-next-line no-unused-vars
    const thisApp = this;

    const homePage = document.querySelector(select.containerOf.home);
    new HomePage(homePage);


  },

  initBooking: function () {
    // eslint-disable-next-line no-unused-vars
    const thisApp = this;
    
    const bookingWidget = document.querySelector(select.containerOf.booking);
    new Booking(bookingWidget);
  },

  initMenu: function () {
    const thisApp = this;

    for (let productData in thisApp.data.products) {
      new Product(
        thisApp.data.products[productData].id,
        thisApp.data.products[productData]
      );
    }
  },

  initCart: function () {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);
    thisApp.productList = document.querySelector(select.containerOf.menu);
    thisApp.productList.addEventListener("add-to-cart", function (event) {
      app.cart.add(event.detail.product);
    });
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + "/" + settings.db.products;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        //save parsedResponse as thisApp.data.products
        thisApp.data.products = parsedResponse;
        //execute initMenu
        thisApp.initMenu();
      });
  },

  init: function () {
    const thisApp = this;
    
    thisApp.initData();
    thisApp.initCart();
    thisApp.initPages();
    thisApp.initHome();
    thisApp.initBooking();
  },
};
app.init();
