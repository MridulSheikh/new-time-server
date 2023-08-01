const firebaseInitialize = require("../firebase/firebase.init");
const { createImageController } = require("./image.controller");
const { removeImageFromFolderController } = require("./folder.controller");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");

// initialize firebase app
firebaseInitialize();

// Create a root reference
const storage = getStorage();

exports.uploadImagefirebaseController = async (req, res) => {
  try {
    const dateTime = new Date();
    const storageRef = ref(
      storage,
      `files/${req.file.originalname + " " + dateTime}`
    );
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    if (!req.body.data) {
      res.status(401).json({
        errorcode: 401,
        errormessage: "please provide data",
      });
      return;
    }
    const downloadUrl = await getDownloadURL(snapshot.ref);
    if (downloadUrl) {
      const body = {
        imageUrl: downloadUrl,
        name: JSON.parse(req.body.data).name,
        create_by: JSON.parse(req.body.data).create_by,
        folder: JSON.parse(req.body.data).folder,
      };
      createImageController(body, res);
    } else {
      res.status(401).json({
        errorcode: 401,
        errormessage: error.message,
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
    });
  }
};

exports.deleteImagefirebaseController = async (req, res) => {
  try {
    const desertRef = ref(storage, `${req.body.imageUrl}`);
    const snapshot = await deleteObject(desertRef);
    removeImageFromFolderController(req.body.folder, req.params.id, res);
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: "Image not found!",
    });
  }
};
