const { headerImageButtonCard } = require('hangouts-card-helper');

let message = headerImageButtonCard(
  'HeaderTitle',
  'HeaderSubTitle',
  'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
  'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg',
  'https://github.com/bareinhard',
  'View',
  'Here are my details:\nFirst Line Here\nSecond Line Here'
);

res.send(message);
