class BaseWidget {
  constructor(wrapperElement, initialValue) {
    const thisWidget = this;

    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrapperElement;
    thisWidget.correctValue = initialValue;
  }

  get value(){
    const thisWidget = this;
    return thisWidget.correctValue;
  }

  set value(value) {
    const thisWidget = this;
    const newValue = thisWidget.parseValue(value);

    /* TODO: Add validation */
    if (thisWidget.correctValue !== newValue && thisWidget.isValid(newValue)) {
      thisWidget.correctValue = newValue;
    }
    thisWidget.renderValue();
    thisWidget.announce();
  }

  parseValue(value) {
    return parseInt(value);
  }

  isValid(value) {
    return (
      !isNaN(value) 
    );
  }

  renderValue() {
    const thisWidget = this;
    thisWidget.dom.wrapper.innerHTML = thisWidget.value;
  }

  announce() {
    const thisWidget = this;
    const event = new CustomEvent("updated", {
      bubbles: true,
    });
    thisWidget.dom.wrapper.dispatchEvent(event);
  }

  setValue(value){
  const thisWidget = this;
  thisWidget.value = value;
  }
}

export default BaseWidget;
