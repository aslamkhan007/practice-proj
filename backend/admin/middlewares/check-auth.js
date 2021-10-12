const jwt = require('jsonwebtoken');
/**
 * @author prabhakar sarkar
 *@description this is jwt verification function 
 * @date 6-8-2021
 */
const checkAuth = async(req, res, next) => {
    try {
        let token = ''
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1]
        }else{
            token = req.headers.authorization
        }
        const decoded = await jwt.verify(token, process.env.SECRETE_KEY);
        req.tokenData = decoded
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized!',
            status: 401
        })
    }
}

const checkRole = roles => async(req, res, next) => {
    if(!roles.includes(req.tokenData.role)){
        return res.status(403).send({
            message: "Access denied!",
            status: 403
        })
    }
    next()
};


module.exports = {
    checkAuth,
    checkRole
}
