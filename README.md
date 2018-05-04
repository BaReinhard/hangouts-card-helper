# hangouts-card-helper [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

>

## Installation

```sh
$ npm install --save hangouts-card-helper
```

## Usage

```js
const {
  createButtonObject,
  createButtonWidget,
  createImageWidget,
  createWidgets,
  createSectionObject,
  createSections,
  createCardObject,
  createCards
} = require('hangouts-card-helper');

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
```

### Output of Example:

![Example Output](https://github.com/BaReinhard/hangouts-card-helper/blob/master/images/readme_example.png?raw=true)

## License

Apache-2.0 © [Brett Reinhard]()

[npm-image]: https://badge.fury.io/js/hangouts-card-helper.svg
[npm-url]: https://npmjs.org/package/hangouts-card-helper
[travis-image]: https://travis-ci.org/BaReinhard/hangouts-card-helper.svg?branch=master
[travis-url]: https://travis-ci.org/BaReinhard/hangouts-card-helper
[daviddm-image]: https://david-dm.org/BaReinhard/hangouts-card-helper.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/BaReinhard/hangouts-card-helper
[coveralls-image]: https://coveralls.io/repos/BaReinhard/hangouts-card-helper/badge.svg
[coveralls-url]: https://coveralls.io/r/BaReinhard/hangouts-card-helper



## Notice:
Testing was performed on a person business account hephaestus.solutions domain.