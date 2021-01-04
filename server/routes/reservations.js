const express = require('express');
const router = express.Router();
const { Reservation } = require("../models/Reservation");

router.post("/reservation", (req, res) => {

    const reservation = new Reservation(req.body);

    reservation.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post('/myreservation', (req, res) => {
    Reservation.find({reservationEmail: req.body.reservationEmail}, (err, data) => {
        if(err) res.json({ success: false, err });
        
        return res.status(200).send({
            success: true,
            reservation: data
        });
    })
})

router.post('/cancel', (req, res) => {
    console.log(req.body);

    Reservation.findOne({'_id': req.body._id}, (err, docs) => {
        if(err) return res.status(400).send(err)
        docs.updateOne({'cancelYn': true})
        .exec((err, data) => {
            if(err) return res.statusMessage(401).send(err)
            return res.status(200).json({
                success:true, 
            })
        })
    })
})
module.exports = router;