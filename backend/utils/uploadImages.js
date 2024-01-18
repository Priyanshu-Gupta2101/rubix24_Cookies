const cloudinary = require("../utils/cloudinary.js");
// Image Uploader
exports.uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (err, res) => {
      if (res && res.secure_url) {
        return resolve(res.secure_url);
      }
      return reject({ message: err.message });
    });
  });
};
