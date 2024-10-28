const multer = require('multer')
const firebaseStorage = require('multer-firebase-storage')
const firebase = require('./firebase.config')


const storage = firebaseStorage({
    credentials: firebase.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        clientId: process.env.FIREBASE_CLIENT_ID,
        authUri: process.env.FIREBASE_AUTH_URI,
        tokenUri: process.env.FIREBASE_TOKEN_URI,
        authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN
    }),
    bucketName: process.env.FIREBASE_BUCKET_NAME,
    unique: true
    
})

const upload = multer({
    storage:storage,
})


module.exports = upload;
