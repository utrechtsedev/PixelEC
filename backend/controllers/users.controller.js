const { Op } = require('sequelize');
const { sequelize, models } = require('../models');
const bcrypt = require('bcrypt')




exports.login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || password) {return res.status(401).json({error: "No email or password supplied"})}

    const user = await models.User.findOne({where: {email: email}})
    if (!user) {return res.status(401).json({error: "User not found"})}

    const Match = await bcrypt.compare(password, user.password)
    if (!Match) {return res.status(401).json({error: "Email or password incorrect"})}

    req.session.user_id = user.user_id
    res.status(200).json({message: "You have succesfully logged in"})
}

exports.logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(304).json({error: "Already logged out"});
        res.status(200).json({message: "You have succesfully logged out!"})
    })
}