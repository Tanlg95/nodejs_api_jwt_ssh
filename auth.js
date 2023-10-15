const jwt = require('jsonwebtoken');

let isAuth = (req, res, next) =>
{
   try{
    const accesstoken = req.body.accesstoken || req.query.accesstoken || req.headers["x-access-token"] ,
          refreshtoken = req.body.accesstoken || req.query.accesstoken || req.headers["x-refresh-token"];
    if(accesstoken === undefined && refreshtoken === undefined)
    {
        return res.status(400).send('please provide a token for next step');
    }

    const decodeToken = (accesstoken) ? jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SERECT_KEY) : jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SERECT_KEY);
    // ,
    //       decodeTokenF = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SERECT_KEY);
    if(!decodeToken)
    {
        return res.status(401).send('Your access token may be broke, please check it out');
    }
    res.info =  decodeToken;
   } 
   catch(err)
   {
        console.log(err);
        return res.status(400).send('some things were wrong');
   }
   next();
}

module.exports = isAuth; 