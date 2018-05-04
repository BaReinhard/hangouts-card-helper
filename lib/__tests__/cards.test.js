const assert = require('assert');
const log = require('../../log');
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
  createHeaderObject,
  headerImageButtonCard
} = require('../index.js');

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
    // log(message);
  });
  it('Create Single Image', () => {
    // log(
    //   singleImageCard(
    //     'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg'
    //   )
    // );
  });
  it('Create Header, details , openUrl button', () => {
    let message = headerImageButtonCard(
      'HeaderTitle',
      'HeaderSubTitle',
      'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
      'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
      'https://github.com/bareinhard',
      'View',
      'Here are my details:\nFirst Line Here\nSecond Line Here'
    );
    let message2 = headerImageButtonCard(
      'HeaderTitle',
      'HeaderSubTitle',
      undefined,
      'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
      'https://github.com/bareinhard',
      'View',
      'Here are my details:\nFirst Line Here\nSecond Line Here'
    );
    let expectedCard = {
      cards: [
        {
          header: {
            title: 'HeaderTitle',
            subtitle: 'HeaderSubTitle',
            imageUrl:
              'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
            imageStyle: 'IMAGE'
          },
          sections: {
            widgets: [
              {
                image: {
                  imageUrl:
                    'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg'
                }
              },
              {
                textParagraph: {
                  text:
                    'Here are my details:\nFirst Line Here\nSecond Line Here'
                }
              },
              {
                buttons: [
                  {
                    textButton: {
                      text: 'View',
                      onClick: {
                        openLink: { url: 'https://github.com/bareinhard' }
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    };
    let expectedCard2 = {
      cards: [
        {
          header: { title: 'HeaderTitle', subtitle: 'HeaderSubTitle' },
          sections: {
            widgets: [
              {
                image: {
                  imageUrl:
                    'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg'
                }
              },
              {
                textParagraph: {
                  text:
                    'Here are my details:\nFirst Line Here\nSecond Line Here'
                }
              },
              {
                buttons: [
                  {
                    textButton: {
                      text: 'View',
                      onClick: {
                        openLink: { url: 'https://github.com/bareinhard' }
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    };
    log('');
    // log(message2);
    assert.deepEqual(expectedCard, message);
    assert.deepEqual(expectedCard2, message2);
  });
});
