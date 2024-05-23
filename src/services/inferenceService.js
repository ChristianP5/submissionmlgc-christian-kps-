const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const predictClassification = async(model, image)=>{

    try{
        const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();

        const label = score >= 0.5? 'Cancer' : 'Non-cancer';

        let suggestion;

        if(label === 'Cancer'){
            suggestion = "Go to Docter!";
        }
        
        if(label === 'Non-cancer'){
            suggestion = "Don't get Cancer."
        }


        return {
            result: label,
            suggestion: suggestion,
        }

    }catch(error){
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }

}


module.exports = predictClassification;