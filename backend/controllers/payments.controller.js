// creation sequence: CART -> CARTITEM -> ORDER -> ORDERITEM -> PAYMENT 

exports.initGuestCheckout = async (req, res) => {
    if (req.session.user) {}
}




exports.checkUserExists = async (req, res) => {
    if (req.session.user) {res.send({session: true})}
    else {res.send({session: false})}
}