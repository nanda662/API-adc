import mongoose from 'mongoose';
async function connectDatabase() {
    await mongoose.connect(
        'mongodb+srv://izaquemiranda881:cYYeF47sUQaMG2FN@adc-api.f4bal.mongodb.net/?retryWrites=true&w=majority&appName=ADC-api'
    )

}

export default connectDatabase