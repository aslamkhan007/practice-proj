const jwt = require('jsonwebtoken');
/**
 * @author prabhakar sarkar
 *@description this is create jwt function 
 *@date 6-8-2021
 */
const createToken = (data) => {
    return jwt.sign(
        data,
        process.env.SECRETE_KEY
        
    )
}



module.exports = {
    generateToken: createToken,
}


