import {templates, select} from '../settings.js';
import AmountWidget from './amountWidget.js';


class Booking{
  constructor(element){
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidgets();
  }

  render(element){
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    thisBooking.dom.peopleAmount = element.querySelector(select.widgets.booking.peopleAmount);
    thisBooking.dom.hoursAmount = element.querySelector(select.widgets.booking.hoursAmount);
    thisBooking.dom.datePicker = element.querySelector(select.widgets.amount.datePicker.wrapper);
    thisBooking.dom.hourPicker = element.querySelector(select.widgets.amount.hourPicker.wrapper);
    console.log('element:', element);
  } 

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.dom.peopleAmount.addEventListener('updated', function () {

    });
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.dom.hoursAmount.addEventListener('updated', function () {

    });

    //thisBooking.hourPicker = new AmountWidget(thisBooking.dom.hourPicker);
    //thisBooking.datePicker = new AmountWidget(thisBooking.dom.datePicker);
    
  }
}
export default Booking;