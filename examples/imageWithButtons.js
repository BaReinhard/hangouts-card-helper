const {
  createButtonObject,
  createButtonWidget,
  createImageWidget,
  createWidgets,
  createSectionObject,
  createSections,
  createCardObject,
  createCards
} = require('hangouts-card-help');

let buttonUrl = 'https://github.com/bareinhard/hangouts-card-helper';
let buttonText = 'GITHUB';
let imageUrl =
  'https://github.com/BaReinhard/Hacktoberfest-Mathematics/raw/webpage-build/src/Screenshot%202017-10-04%2009.35.48.png?raw=true';
let linkButton = createButtonObject(buttonText, buttonUrl);
let buttonWidget = createButtonWidget(linkButton, linkButton);
let imageWidget = createImageWidget(imageUrl);
let widgets = createWidgets(buttonWidget, imageWidget);
let section = createSectionObject(widgets);
let sections = createSections(section);
let card = createCardObject(sections);
let message = createCards(card);
res.send(message);
