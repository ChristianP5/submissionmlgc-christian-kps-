const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

const postPredictHandler = async(request, h)=>{

    console.log('Entered Post Predict Handler');
    const { image } = request.payload;
    const { model } = request.server.app;

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const { result, suggestion } = await predictClassification(model, image);

    const data = {
        id: id,
        result: result,
        suggestion: suggestion,
        createdAt: createdAt,
    }

    await storeData(id, data);

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data: data
    })

    response.code(201);
    console.log('Left Post Predict Handler');
    return response;
}

module.exports = {
    postPredictHandler
}