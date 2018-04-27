const arrify = require('arrify');
const _ = require('lodash');
const TYPES = require('./allowedTypes');
/**
 * Creates an image widget to be used with hangouts chat widgets
 * @param {String} imageUrl
 * @returns {Object} WidgetObject: an image widget, doc: https://developers.google.com/hangouts/chat/reference/message-formats/cards
 */
function createImageWidget(imageUrl) {
  return { image: { imageUrl } };
}
/**
 * Creates a single key value widget to be used with hangouts chat widgets
 * @param {String} key
 * @param {String} value
 * @returns {Object} WidgetObject : a key value widget, doc: https://developers.google.com/hangouts/chat/reference/message-formats/cards
 */

function createKeyValueWidget(key, value) {
  return {
    keyValue: {
      topLabel: key,
      content: value
    }
  };
}

/**
 * Creates a response card with a single image
 * @param {String} imageUrl
 * @returns {Object} CardObject
 */

function singleImageCard(imageUrl) {
  return;
  createCards(createSections(createWidgets(createImageWidget(imageUrl))));
}

/**
 * Creates a widgets array
 * @param {*} widget, Takes a widget object or an array of widget objects
 * @returns {Array} Array of WidgetObject: an array containing WidgetObjects
 */

function createWidgets(widget) {
  let widgets = arrify(widget);
  return widgets;
}
/**
 * Creates a sections object
 * @param {*} section, takes a section object or an array of section objects
 * @returns {Array} an Array containing a SectionObjects
 */
function createSections(section) {
  let sections = arrify(section);
  return sections;
}
/**
 * Creates a cards object
 * @param {*} card, takes a card object or an array of card objects
 * @returns {Objects} an object containtain a cards property with an array of card
 */
function createCards(card) {
  let cards = arrify(card);
  return { cards };
}

/**
 * Returns a function that creates buttons, based on configuration
 * @param {Boolean} custom
 * @returns {Function} returns a function that allows either custom actionmethod names and passing of params or opens a link on button click
 */
function ButtonCreator(custom = false) {
  if (custom) {
    return function createButtonWidget(text, actionMethodName, parameters) {
      return {
        textButton: {
          text,
          onClick: {
            action: {
              actionMethodName,
              parameters
            }
          }
        }
      };
    };
  } else {
    return function createButtonWidget(text, url) {
      return {
        textButton: {
          text,
          onClick: {
            openLink: {
              url
            }
          }
        }
      };
    };
  }
}

/**
 * Creates a key value pair widget
 * @param {String} icon Must be a link to an icon, or one of the approved icon name https://developers.google.com/hangouts/chat/reference/message-formats/cards
 */
function createIconKeyValue(icon) {
  if (TYPES.includes(icon.toUpperCase())) {
    return {
      keyValue: {
        icon: icon.toUpperCase()
      }
    };
  } else {
    return {
      keyValue: {
        iconUrl: icon
      }
    };
  }
}

/**
 * Creates a parameter object with a key and value
 * @param {String} key
 * @param {String} value
 * @returns {Object} ParameterObject
 */
function createParamaterObject(key, value) {
  return { key, value };
}
/**
 * Create Paramaters Array
 * @param {Array} params an array of ParameterObjects
 * @returns {Array} returns an array of ParamterObjects
 */
function createParameterArray(params) {
  return arrify(params);
}

module.exports = {
  createParameterArray,
  createParamaterObject,
  createIconKeyValue,
  ButtonCreator,
  createCards,
  createSections,
  createWidgets,
  singleImageCard,
  createKeyValueWidget,
  createImageWidget
};
