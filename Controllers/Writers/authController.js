const { models, sequelize } = require('../../models/index')
// const Sequelize = require('sequelize')
// const { Op } = require('sequelize')
// const Coupons = models .coupons
const bcrypt = require('bcrypt');
const { createToken } = require('../../middlewares/jwt');
// const { createToken, refreshToken, validateToken } = require('../../middlewares/jwt')
// const dotEnv = require('dotenv').config()
// const jwt = require('jsonwebtoken');
const Writer = models.writers


module.exports = {

    register: async (req, res) => {
        const {
            writer_id, writer_userName, writer_fullname, writer_email, password, writer_phone, writer_country, writer_city, writer_zip, profile_image, status, is_agreed
        } = req.body;

        const oldUserName = await Writer.findOne({ where: { writer_userName } })
        const oldEmail = await Writer.findOne({ where: { writer_email } })

        if (oldUserName) {
            return res.send({ status_code: 400, message: "This User Name Is Already Registered. Please Use New" });
        }
        else if (oldEmail) {
            return res.send({ status_code: 400, messsage: "This Email Address Is Already Registered. Please Use New" });
        }
        const writer_password = bcrypt.hashSync(password, 10);

        let insData = { writer_id, writer_userName, writer_fullname, writer_email, writer_password, writer_phone, writer_country, writer_city, writer_zip, profile_image, status, is_agreed };

        let writerCreated = await Writer.create(insData);

        const token = createToken({
            user_id: writerCreated.writer_id,
            user_email: writer_email,
            store_id: writer_userName
        });

        // let sendEmailResult = await emailHelper.sendEmail(vendor_email, "Email Verification", `click here <a href="${process.env.WEB_URL}/vendor/verify_email?token=${token}" target="_blank">Click Here To Verify Your Email</a>`)
        // res.send({ status_code: 200, message: "Registration Successfull And A Verification Link Has Been Sent To Your Email Id, Please Verify Your Email" });

        res.send({ status_code: 200, message: "Vendor Registration Successfull" });
    },

    // login: async (req, res) => {


    //     const { username, password } = req.body;
    //     let vendor = await Vendors.findOne({ where: { status: 1, [Op.or]: [ { vendor_email: username }] } })
    //     if (vendor && bcrypt.compareSync(password, vendor.vendor_password)) {
    //         const token = createToken({
    //             user_id: vendor.vendor_id,
    //             user_email: vendor.vendor_email,
    //             store_id:vendor.store_id
    //         });
    //         const refToken = refreshToken(vendor);
    //         storeDetails = await Stores.findByPk(vendor.store_id)
    //         planDetails = await VendorPlan.findOne({ where: { store_id: vendor.store_id }, order: sequelize.literal('id DESC') })
    //         res.send({ status_code: 200, message: "login successfull", accessToken: token, refreshToken: refToken, data: vendor, storeDetails, planDetails });
    //     } else {
    //         return res.send({ status_code: 400, message: "Invalid Credentials" });
    //     }
    // },

    // tokenRefresh: async (req, res) => {
    //     const token = req.headers['authorization']?.split(' ')[1];
    //     if (!token) return res.status(404).json({ message: 'Invalid Token' });
    //     const data = jwt.verify(token, process.env.App_Secret_Key);
    //     delete data.iat;
    //     delete data.exp;
    //     return res.json({ token: jwt.sign(data, process.env.App_Secret_Key, { expiresIn: '1d' }) });
    // },


    // updateProfile: async (req, res) => {

    //     let file = req.file;
    //     let password = req.body.vendor_password;
    //     let vendor_id = decodedToken.id ? decodedToken.id : 0;
    //     let vendor_contact = req.body.vendor_contact ? req.body.vendor_contact : '';
    //     let vendor_email = req.body.vendor_email ? req.body.vendor_email : '';
    //     // const oldContact = await Vendors.findOne({ where: { vendor_contact } })
    //     // const oldEmail = await Vendors.findOne({ where: { vendor_email } })
    //     // if (oldContact) {
    //     //     return res.send({ status_code: 400, messsage: "This Phone No Is Already Registered. Please Use New" });
    //     // }
    //     // else if (oldEmail) {
    //     //     return res.send({ status_code: 400, messsage: "This Email Id Is Already Registered. Please Use New" });
    //     // }
    //     if (file !== undefined) {
    //         req.body.profile_image = file.location
    //     }
    //     if (password !== undefined) {
    //         req.body.vendor_password = bcrypt.hashSync(password, 10);
    //     }
    //     const result = Vendors.update(req.body, { where: { vendor_id: vendor_id } })
    //     if (result) {
    //         let data = await Vendors.findByPk(vendor_id);
    //         data.vendor_password = undefined;
    //         res.send({ status_code: 200, message: "profile updated successfully", data: data })
    //     } else {
    //         res.send({ status_code: 400, message: "unable to update profile" })
    //     }

    // }

}