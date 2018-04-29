function arrify(val) {
  if (Array.isArray(val)) {
    return val;
  } else {
    return [val];
  }
}
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
  let imageWidget = createImageWidget(imageUrl);
  let widgets = createWidgets(imageWidget);
  let sectionObject = createSectionObject(widgets);
  let section = createSections(sectionObject);
  let cardObject = createCardObject(section);
  let cards = createCards(cardObject);
  return cards;
}

/**
 * Creates a widgets array
 * @param {*} widget, Takes a widget object or an array of widget objects
 * @returns {Array} Array of WidgetObject: an array containing WidgetObjects
 */

function createWidgets(...widget) {
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

function createSectionObject(section) {
  return { widgets: arrify(section) };
}
/**
 * Creates a cards object
 * @param {*} card, takes a card object or an array of card objects
 * @returns {Objects} an object containtain a cards property with an array of card
 */
function createCards(...card) {
  let cards = arrify(card);
  return { cards };
}

function createCardObject(sections, header) {
  let obj = {};
  if (header) {
    obj = { header, sections };
  } else {
    obj = { sections };
  }
  return obj;
}
/**
 * A custom button widget, that is configurable with params and action method name
 * @param {String} text Text display on button or iconUrl if imageButton is set to true
 * @param {String} actionMethodName what action should be sent on button click
 * @param {Array} parameters what parameres should be sent on button click
 * @param {Boolean} imageButton a boolean flag that is set to use an imageButton in place of Text
 */
function createCustomButtonWidget(
  text,
  actionMethodName,
  parameters,
  imageButton = false
) {
  let obj = {};
  if (imageButton) {
    if (!text.includes('http')) {
      console.warn(
        'ImageButton is set to true, text should be set to an iconUrl'
      );
    }
    obj = {
      imageButton: {
        iconUrl: text,
        onClick: {
          action: {
            actionMethodName,
            parameters
          }
        }
      }
    };
  } else {
    obj = {
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
  }
  return obj;
}
/**
 * A basic button that opens a url link
 * @param {String} text Text to be displayed on button
 * @param {String} url url to be opened on button click
 */
function createButtonObject(text, url) {
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
}

/**
 * Takes a button or several button objects and returns a widget with buttons
 * @param {*} buttons
 */
function createButtonWidget(...buttons) {
  return { buttons: arrify(buttons) };
}
/**
 * Creates a key value pair widget
 * @param {String} icon Must be a link to an icon, or one of the approved icon name https://developers.google.com/hangouts/chat/reference/message-formats/cards
 */
function createIconKeyValueWidget(icon) {
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
  return { key, value: value.toString() };
}
/**
 * Create Paramaters Array
 * @param {Array} params an array of ParameterObjects
 * @returns {Array} returns an array of ParamterObjects
 */
function createParameterArray(...args) {
  return arrify(args);
}
/**
 * Creates a Header Object that is used inside a card Object
 * @param {String} title
 * @param {String} subtitle
 * @param {String} imageUrl
 * @param {String} imageStyle
 */
function createHeaderObject(title, subtitle, imageUrl, imageStyle = 'IMAGE') {
  let obj = {};
  if (!imageUrl) {
    obj = {
      title,
      subtitle
    };
  } else {
    obj = {
      title,
      subtitle,
      imageUrl,
      imageStyle
    };
  }
  return obj;
}
/**
 * Creates a card object with
 * @param {String} headerTitle
 * @param {String} headerSubtitle
 * @param {String} imageUrl
 * @param {String} buttonUrl
 * @param {String} buttonText
 * @param {String} text
 */
function headerImageButtonCard(
  headerTitle,
  headerSubtitle,
  headerImageUrl = '',
  imageUrl,
  buttonUrl,
  buttonText,
  text
) {
  if (!headerImageUrl) {
    headerImageUrl = '';
  }
  return createCards(
    createCardObject(
      createSectionObject(
        createWidgets(
          createImageWidget(imageUrl),
          createTextWidget(text),
          createButtonWidget(createButtonObject(buttonText, buttonUrl))
        )
      ),
      createHeaderObject(headerTitle, headerSubtitle, headerImageUrl)
    )
  );
}
function createTextWidget(text) {
  return { textParagraph: { text } };
}
module.exports = {
  createParameterArray,
  createParamaterObject,
  createIconKeyValueWidget,
  createCustomButtonWidget,
  createButtonWidget,
  createButtonObject,
  createCards,
  createSections,
  createWidgets,
  singleImageCard,
  createKeyValueWidget,
  createImageWidget,
  createSectionObject,
  createCardObject,
  createHeaderObject,
  headerImageButtonCard
};
