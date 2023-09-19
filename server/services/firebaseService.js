const { doc, setDoc, getDoc } = require("firebase/firestore");
const { db } = require("../firebase-config");

exports.retrieveDEKfromFirebase = async (fileName, email) => {
  const docRef = doc(db, "users", email);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return docSnapshot.data()[fileName];
  } else {
    console.error("No DEK found for file:", fileName);
    return null;
  }
};

exports.storeDEKInFirebase = async (filename, DEK, email) => {
  const docRef = doc(db, "users", email);
  await setDoc(
    docRef,
    {
      [filename]: DEK,
    },
    { merge: true }
  );
};
