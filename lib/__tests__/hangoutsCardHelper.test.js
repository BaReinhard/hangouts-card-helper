const assert = require('assert');
const {
  createParameterArray,
  createParamaterObject,
  createIconKeyValue,
  createButtonWidget,
  createCustomButtonWidget,
  createCards,
  createSections,
  createWidgets,
  singleImageCard,
  createKeyValueWidget,
  createImageWidget
} = require('../index.js');

describe('Rendering', () => {
  it('KeyValue Icon ', () => {
    assert.deepEqual(
      { keyValue: { icon: 'AIRPLANE' } },
      createIconKeyValue('airplane')
    );
  });
  it('KeyValue Custom Icon ', () => {
    let iconUrl = 'https://github.com/favicon.ico';
    assert.deepEqual({ keyValue: { iconUrl } }, createIconKeyValue(iconUrl));
  });
  it('Parameters creation', () => {
    let oneParam = createParamaterObject('bitmojiId', '1234');
    let parameters = createParameterArray(oneParam, oneParam, oneParam);
    let expectedParam = { key: 'bitmojiId', value: '1234' };
    assert.deepEqual(expectedParam, oneParam);
    assert.deepEqual(parameters, [expectedParam, expectedParam, expectedParam]);
  });

  it('Single Image Card', () => {
    let url = 'https://github.com/favicon.ico';
    let card = singleImageCard(url);
    let expectedCard = {
      cards: [{ image: { imageUrl: url } }]
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
    let openUrlButton = createButtonWidget(text2, url);
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
