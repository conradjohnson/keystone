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
      images: ['image-1668264965797.jpg', 'image-1668265071468.jpg'],
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
      images: ['image-1668265074930.jpg'],
      forSale: false,
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
      images: ['image-1668265078054.jpg'],
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
      images: ['image-1668265081266.jpg', 'image-1668265084780.jpg'],
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
      images: ['image-1668265090030.jpg'],
      forSale: false,
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
      images: ['image-1668265097351.jpg'],
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
      images: ['image-1668265100852.jpg', 'image-1668265116469.jpg'],
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
      images: ['image-1668265116469.jpg'],
      forSale: false,
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
      images: ['image-1668265121164.jpg'],
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
