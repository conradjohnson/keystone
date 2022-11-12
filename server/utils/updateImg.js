// utility that updates the property ID by adding new image to the images array
const { Property } = require('../models');

const updatePropertyPics= async (id, filename)=>{

    console.log ('here!');
    console.log(id + " "+ filename);
    return await Property.findByIdAndUpdate(id, {
        $push: { images: filename },
      })

}

module.exports = {updatePropertyPics};
