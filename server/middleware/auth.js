import jwt from "jsonwebtoken";

// wants to like a post

// click the like button =>auth middleware (next)=>like controller ...

const auth = async(req, res, next) => {
    console.log("in middleware");
    console.log(req.headers);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomeAuth = token.length < 500;
        let decodedData;
        if (token && isCustomeAuth) {
            decodedData = jwt.verify(token, "test");
            req.userId = decodedData.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;