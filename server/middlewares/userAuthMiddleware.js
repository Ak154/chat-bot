const jwt = require("jsonwebtoken");

export default async(req, res, next)=>{
    try {
        const token = req.headers["authorization"].split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, decode)=>{
            if(err){
                return res.status(401).send({ message: "Auth failed", success: false })
            }else{
                req.body.userId = decode.id;
                next();
            }
        })
    } catch (error) {
        return res.status(500).send({ message: "Auth failed", success: false })
    }
}