const { sign, verify } = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
require('dotenv').config()

const createToken = (result) => {
    let accessToken = '';
    if (result.store_id !== undefined) {
        accessToken = sign(
            { id: result.user_id, email: result.user_email, store_id: result.store_id },
            process.env.App_Secret_Key
        );
    } else {
        accessToken = sign(
            { id: result.user_id, email: result.user_email },
            process.env.App_Secret_Key,
            { expiresIn: '1d' }
        );
    }

    return accessToken;
};

// const refreshToken = (result) => {
//   return sign(
//       {id:result.user_id,email:result.user_email},
//      process.env.App_Secret_Key,
//      {expiresIn: '14d'}
//     );  
// };

// const validateToken = (req, res, next) => {

//    let accessToken= req.get('authorization');
//   if (!accessToken)
//     res.send({ code:501, message: "User not Authenticated!" });
// else{
//   try {
//     accessToken= accessToken.slice(7);
//     decodedToken= jwt_decode(accessToken);

//     const validToken = verify(accessToken, process.env.App_Secret_Key);
//     if (validToken) {
//       req.authenticated = true;
//       return next();
//     }
//   } catch (err) {
//     res.send({ code:501, message: "something went wrong" , error:err });
//   }
// }
// };


module.exports = { createToken };
