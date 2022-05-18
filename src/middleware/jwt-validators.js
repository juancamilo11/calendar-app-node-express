const { request, response } = require('express');
const jwt = require("jsonwebtoken");

const jwtValidation = (req=request, res=response, next) => {
    const tokenHeader = req.header("x-token");
    console.error(tokenHeader)

    if(!token) {
        return res.status(401).json({
            ok: false, 
            message: "No hay token"
        })
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        // console.log(payload)
        req.uid = payload.uid;
        req.name = payload.name;


    } catch (error) {
        
    }

    next();
}

module.exports = {
    jwtValidation
}