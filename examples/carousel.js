const {
  createParamaterObject,
  createHeaderObject,
  createCustomButtonWidget,
  createButtonWidget,
  createImageWidget,
  createWidgets,
  createSectionObject,
  createSections,
  createCards,
  createCardObject
} = require('hangouts-card-helper');

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
  // Another parameter with other urls can go here to use in traversal (just an idea)
];
let parameters = paramsMeta.map(ob => createParamaterObject(ob.key, ob.value));
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
