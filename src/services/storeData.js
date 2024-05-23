const { Firestore } = require('@google-cloud/firestore');


const storeData = async(id, data)=>{
    const db = new Firestore({
        projectId: 'christian-serta-mulia-project',
    });

    const predictionsCollection = db.collection('Predictions');
    return predictionsCollection.doc(id).set(data);
}

module.exports = storeData;