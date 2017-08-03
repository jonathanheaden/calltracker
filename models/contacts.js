var mongoose = require( 'mongoose' );

var contactCallSchema = new mongoose.Schema({
    calledAt: { type: Date },
    notes: { type: String},
    followup: { type: Boolean },
    response: {type: String} //answered? voice mail?
});

var contactSchema = new mongoose.Schema({
    vendor: { type: String, required: true},
    contactname: { type: String }, 
    number: { type: String },
    address: { type: String },
    createdAt: { type: Date },
    description: { type: String},
    trade: { type: String },
    email: { type:String},
    calls: [contactCallSchema] 

})

mongoose.model('Contact', contactSchema);
