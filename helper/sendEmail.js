const nodemailer = require('nodemailer')

const sendEmail = async (reciever_email, subject_str, message) => {
    try {
        var mail = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        var mailOptions = {
            from: process.env.EMAIL,
            to: reciever_email,
            subject: subject_str,
            html: `<p>${message}</p>`
        };

        mail.sendMail(mailOptions, function (error, info) {
            if (error) {
                return ({ code: 400, message: 'something went wrong ! unable to send email', error: error });
            } else {
                return ({ code: 200, message: 'Email Sent successfully' });
            }
        });
    } catch (err) {
        return ({ code: 400, message: err });
    }
}
module.exports = {
    sendEmail
};
