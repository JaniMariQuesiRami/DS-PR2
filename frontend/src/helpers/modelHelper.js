export const modelApiCall = async (phrase, model) => {
    const modelEndpoints = {
        CTC: 'ctc',
        Seq2Seq: 'seq2seq',
        Transformer: 'transformer',
    };

    const endpoint = modelEndpoints[model];

    if (!endpoint) {
        throw new Error(`Unknown model: ${model}`);
    }

    try {
        console.log(`Calling backend with phrase: ${phrase} and model: ${ model }`);
        const response = await fetch(`http://127.0.0.1:5000/${endpoint}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ record_id: 'someRecordId', phrase }),
        });

        if (!response.ok) {
            console.log(`Backend returned error: ${response.statusText}`);
            throw new Error(`Backend returned error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.prediction;
    } catch (error) {
        console.error(`Backend call failed: ${error.message}`);
        throw error;
    }
};
  