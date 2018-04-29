const { singleImageCard } = require('hangouts-card-helper');

let singleCard = singleImageCard(
  'http://images.all-free-download.com/images/graphiclarge/cute_cat_06_hd_picture_170909.jpg'
);

res.send(singleCard);
