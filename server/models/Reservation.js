const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    cancelYn: {
        type: Boolean,
        default: false
    },
    displayInfo: {
        type: mongoose.Schema.Types.Mixed
    },
    prices: [
        {
            count: Number,
            productPriceId: Number,
            priceTypeName: String,
            price: Number
        }
    ],
    totalPrice:{
        type: Number
    },
    productId :{
        type: Number
    },
    reservationName: {
        type:String,
        maxlength:50
    },
    reservationEmail: {
        type:String,
        trim:true,
        ref: 'User'
    },
    reservationTelephone: {
        type: String
    },
    reservationYearMonthDay: {
        type: String
    }
}, {timestamps: true})

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = { Reservation }