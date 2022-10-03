var admin = require("firebase-admin");
 
var serviceAccount = require("../src/config/firebaseKey.json");

const BUCKET = "tudo-bem-autismo.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});
     
const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
    if(!req.file) return next();

    const image = req.file;

    const fileName = Date.now() + "." + image.originalname.split(".").pop();

    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype,
        },
    });

    stream.on("error", (e) => {
        console.error(e);
    })

    stream.on("finish", async () => {
         //Make the file public
        await file.makePublic();

         //Get the public URL
         req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${fileName}`;
         next();
    })

    stream.end(image.buffer);
}

const test = require('@firebase/storage')
const del = () =>{
    const storage =  test.getStorage(admin);

    console.log('jadhfhagsfjak')

    // const storageRef = ref(storage); 
    
    const desertRef = test.ref(storage, 'https://storage.googleapis.com/tudo-bem-autismo.appspot.com/1664826458222.jpeg');
    
    test.deleteObject(desertRef).then(() => {
        console.log('jsdj')
    }).catch((error) => {
        console.log('jhasfdhafs'); 
    });
}

module.exports = {uploadImage, del};