const assert = require('assert');
const {
  createParameterArray,
  createParamaterObject,
  createIconKeyValueWidget,
  createButtonWidget,
  createCustomButtonWidget,
  createCards,
  createCardObject,
  createSections,
  createSectionObject,
  createWidgets,
  singleImageCard,
  createKeyValueWidget,
  createButtonObject,
  createImageWidget
} = require('../index.js');

describe('Rendering', () => {
  it('KeyValue Icon ', () => {
    assert.deepEqual(
      { keyValue: { icon: 'AIRPLANE' } },
      createIconKeyValueWidget('airplane')
    );
  });
  it('KeyValue Custom Icon ', () => {
    let iconUrl = 'https://github.com/favicon.ico';
    assert.deepEqual(
      { keyValue: { iconUrl } },
      createIconKeyValueWidget(iconUrl)
    );
  });
  it('Parameters creation', () => {
    let oneParam = createParamaterObject('bitmojiId', '1234');
    let parameters = createParameterArray(oneParam, oneParam, oneParam);
    let expectedParam = { key: 'bitmojiId', value: '1234' };
    assert.deepEqual(expectedParam, oneParam);
    assert.deepEqual(parameters, [expectedParam, expectedParam, expectedParam]);
  });
  // Need to create more test cases of usage and make a post to test

  it('Single Image Card', () => {
    let url = 'https://github.com/favicon.ico';
    let card = singleImageCard(url);
    let expectedCard = {
      cards: [
        {
          sections: [
            {
              widgets: [{ image: { imageUrl: url } }]
            }
          ]
        }
      ]
    };
    assert.deepEqual(card, expectedCard);
  });
  it('Custom Button', () => {
    let text = 'Next Card';

    let actionMethodName = 'traverse';

    let parameter = createParamaterObject('index', 1);
    let parameters = createParameterArray(parameter);

    let customButton = createCustomButtonWidget(
      text,
      actionMethodName,
      parameters
    );

    let expectedCustom = {
      textButton: {
        text: text,
        onClick: {
          action: {
            actionMethodName: actionMethodName,
            parameters: parameters
          }
        }
      }
    };

    assert.deepEqual(expectedCustom, customButton);
  });
  it('Open Link Button', () => {
    let text2 = 'Github';
    let url = 'https://github.com';
    let openUrlButton = createButtonObject(text2, url);
    let expectedButton = {
      textButton: {
        text: text2,
        onClick: {
          openLink: {
            url
          }
        }
      }
    };
    assert.deepEqual(expectedButton, openUrlButton);
  });

  it('Key Value Widget', () => {
    let kvWidget = createKeyValueWidget('name', 'Brett Reinhard');
    assert.deepEqual(
      { keyValue: { topLabel: 'name', content: 'Brett Reinhard' } },
      kvWidget
    );
  });
});

describe('Create card from scratch', () => {
  it('Create Card', () => {
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
    console.log(JSON.stringify(message));
  });
});
