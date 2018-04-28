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
  createImageWidget,
  createHeaderObject
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
              widgets: [
                {
                  image: {
                    imageUrl: url
                  }
                }
              ]
            }
          ]
        }
      ]
    };
    assert.deepEqual(card, expectedCard);
  });
  it('Custom Image Button', () => {
    let text = 'Next Card';

    let actionMethodName = 'traverse';

    let parameter = createParamaterObject('index', 1);
    let parameters = createParameterArray(parameter);

    let customButton = createCustomButtonWidget(
      text,
      actionMethodName,
      parameters,
      true
    );
    let otherButton = createCustomButtonWidget(
      'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
      actionMethodName,
      parameters,
      true
    );

    let expectedCustom = {
      imageButton: {
        iconUrl: text,
        onClick: {
          action: {
            actionMethodName: actionMethodName,
            parameters: parameters
          }
        }
      }
    };

    assert.deepEqual(expectedCustom, customButton);
    text =
      'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg';
    expectedCustom.imageButton.iconUrl = text;
    assert.deepEqual(expectedCustom, otherButton);
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

  it('Header Object', () => {
    let expectedHeader = {
      title: 'title',
      subtitle: 'subtitle',
      imageUrl:
        'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
      imageStyle: 'IMAGE'
    };
    let header = createHeaderObject(
      'title',
      'subtitle',
      'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
      'IMAGE'
    );
    assert.deepEqual(expectedHeader, header);
  });
  it('Header Object without Image', () => {
    let expectedHeader = {
      title: 'title',
      subtitle: 'subtitle'
    };
    let header = createHeaderObject('title', 'subtitle', '', 'IMAGE');
    let randomHeader = createHeaderObject(
      'title',
      'subtitle',
      null,
      'HODGEPODGE'
    );
    assert.deepEqual(expectedHeader, header);
    assert.deepEqual(expectedHeader, randomHeader);
  });
  it('Button Widget', () => {
    let expectedWidget = {
      buttons: [
        {
          textButton: {
            text: 'Github',
            onClick: {
              openLink: {
                url: 'https://github.com'
              }
            }
          }
        },
        {
          textButton: {
            text: 'Github',
            onClick: {
              openLink: {
                url: 'https://github.com'
              }
            }
          }
        }
      ]
    };
    let expectedWidget1 = {
      buttons: [
        {
          textButton: {
            text: 'Github',
            onClick: {
              openLink: {
                url: 'https://github.com'
              }
            }
          }
        }
      ]
    };
    let buttonWidget = createButtonWidget(
      createButtonObject('Github', 'https://github.com'),
      createButtonObject('Github', 'https://github.com')
    );
    let buttonWidget1 = createButtonWidget(
      createButtonObject('Github', 'https://github.com')
    );
    assert.deepEqual(buttonWidget, expectedWidget);
    assert.deepEqual(buttonWidget1, expectedWidget1);
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

  it('Create Interactive Card', () => {
    let header = createHeaderObject(
      'title',
      'subtitle',
      'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
      'IMAGE'
    );
    let paramsMeta = [
      {
        key: 'url',
        value:
          'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg'
      },
      { key: 'name', value: 'Brett Reinhard' },
      { key: 'currentIndex', value: 0 }
    ];
    let parameters = paramsMeta.map(ob =>
      createParamaterObject(ob.key, ob.value)
    );
    let chooseButton = createCustomButtonWidget('Select', 'choose', parameters);
    let nextButton = createCustomButtonWidget('Next', 'traverse', parameters);
    let buttonWidget = createButtonWidget(chooseButton, nextButton);
    let imageWidget = createImageWidget(
      'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg'
    );
    let widgets = createWidgets(buttonWidget, imageWidget);
    let section = createSectionObject(widgets);
    let sections = createSections(section);
    let cards = createCardObject(sections, header);
    let message = createCards(cards);
    let expectedCard = {
      cards: [
        {
          header: {
            title: 'title',
            subtitle: 'subtitle',
            imageUrl:
              'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
            imageStyle: 'IMAGE'
          },
          sections: [
            {
              widgets: [
                {
                  buttons: [
                    {
                      textButton: {
                        text: 'Select',
                        onClick: {
                          action: {
                            actionMethodName: 'choose',
                            parameters: [
                              {
                                key: 'url',
                                value:
                                  'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg'
                              },

                              { key: 'name', value: 'Brett Reinhard' },
                              { key: 'currentIndex', value: 0 }
                            ]
                          }
                        }
                      }
                    },
                    {
                      textButton: {
                        text: 'Next',
                        onClick: {
                          action: {
                            actionMethodName: 'traverse',
                            parameters: [
                              {
                                key: 'url',
                                value:
                                  'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg'
                              },

                              { key: 'name', value: 'Brett Reinhard' },
                              { key: 'currentIndex', value: 0 }
                            ]
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  image: {
                    imageUrl:
                      'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg'
                  }
                }
              ]
            }
          ]
        }
      ]
    };
    assert.deepEqual(message, expectedCard);
    console.log(JSON.stringify(message));
  });
});
