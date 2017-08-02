var mongoose = require( 'mongoose' );

var contactCallSchema = new mongoose.Schema({
    calledAt: { type: Date },
    notes: { type: String},
    followup: { type: Boolean },
    response: {type: String} //answered? voice mail?
});

var contactSchema = new mongoose.Schema({

    name: { type: String, required: true }, 
    number: { type: Number },
    address: { type: String },
    createdAt: { type: Date },
    description: { type: String},
    trade: { type: String },
    email: { type:String},
    calls: [contactCallSchema] 

})

mongoose.model('Contact', contactSchema);
