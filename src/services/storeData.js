const { Firestore } = require('@google-cloud/firestore');


const storeData = async(id, data)=>{
    const db = new Firestore({
        projectId: 'submissionmlgc-christian-kps',
    });

    const predictionsCollection = db.collection('predictions');
    return predictionsCollection.doc(id).set(data);
}

module.exports = storeData;