const db = require('./connection');
const { User, Property, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Single Family' },
    { name: 'Land' },
    { name: 'Condo' },
    { name: 'Farm' },
    { name: 'Multi-Family' }
  ]);

  console.log('categories seeded');

  await Property.deleteMany();

  const properties = await Property.insertMany([
    {
      address: '8547 SOUTHWESTERN BLVD',
      address2: '',
      city: 'Dallas',
      state: 'TX',
      zip: '75206',
      value: 1000000,
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      images: ['https://i.imgur.com/AU2PuxD.jpg', 'https://i.imgur.com/JvDPGC7.jpg'],
      forSale: false
    },
    {
      address: '3035 E LEDBETTER DR',
      address2: '',
      city: 'Dallas',
      state: 'TX',
      zip: '75216',
      value: 1200000,
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      images: ['https://i.imgur.com/QPbNaoV.jpg'],
      forSale: true,
      salePrice: 450000
    },
    {
      address: '7300 MILITARY PKWY',
      address2: '',
      city: 'Dallas',
      state: 'TX',
      zip: '75227',
      value: 12000000,
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      images: ['https://i.imgur.com/JZFeETh.jpg'],
      forSale: false
    },
    {
      address: '2200 HOLLYBUSH DR',
      address2: '',
      city: 'Dallas',
      state: 'TX',
      zip: '75228',
      value: 500000,
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      images: ['https://i.imgur.com/wz8Rq38.jpg', 'https://i.imgur.com/bsd5a2l.jpg'],
      forSale: false
    },
    {
      address: '6800 MIMOSA LN',
      address2: '',
      city: 'Dallas',
      state: 'TX',
      zip: '75230',
      value: 1500000,
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      images: ['https://i.imgur.com/kvK8TFq.jpg'],
      forSale: true,
      salePrice: 3500000
    },
    {
      address: '1621 OAK LAWN AVE',
      address2: '',
      city: 'Dallas',
      state: 'TX',
      zip: '75207',
      value: 1500000,
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      images: ['https://i.imgur.com/ObIluPG.jpg'],
      forSale: false
    },
    {
      address: '7300 HOLLY HILL DR',
      address2: '',
      city: 'Dallas',
      state: 'TX',
      zip: '75231',
      value: 2500000,
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      images: ['https://i.imgur.com/hzSlRcD.jpg', 'https://i.imgur.com/FIt1wrd.jpg'],
      forSale: false
    },
    {
      address: '1621 OAK LAWN AVE',
      address2: '',
      city: 'Dallas',
      state: 'TX',
      zip: '75207',
      value: 2200000,
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      images: ['https://i.imgur.com/sh0pot8.jpg'],
      forSale: true,
      salePrice: 2500000
    },
    {
      address: '3115 CRESTVIEW DR',
      address2: '',
      city: 'Dallas',
      state: 'TX',
      zip: '75235',
      value: 3200000,
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      images: ['https://i.imgur.com/TNS7jo0.jpg'],
      forSale: false
    },

   
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    name: 'James Johnson',
    email: 'jj@jjj.com',
    password: '12321',
    properties: [
      properties[0]._id,
      properties[1]._id,
      properties[2]._id, 
      
    ]
  });
  await User.create({
    name: 'Johan Botes',
    email: 'jb@jjj.com',
    password: '12321',
    properties: [
      properties[3]._id,
      properties[4]._id,
      properties[5]._id, 
      
    ]
  });
  await User.create({
    name: 'Jon Kelly',
    email: 'jk@jjj.com',
    password: '12321',
    properties: [
      properties[6]._id,
      properties[7]._id,
      properties[8]._id, 
      
    ]
  });


  console.log('users seeded');

  process.exit();
});
