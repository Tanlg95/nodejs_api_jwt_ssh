const jwt = require('jsonwebtoken');
//isopt 
// 1 => gen ra token access 
// 2 => gen ra token refress

let gentoken = (datainput, timeExpr,isopt) => {
        
    try{
        let token = '';
        if(isopt === 1)
        {
            token = jwt.sign(
                datainput,
                process.env.ACCESS_TOKEN_SERECT_KEY,
                {expiresIn:timeExpr}
            );
        
        }
        if(isopt === 2)
        {
            token = jwt.sign(
                datainput,
                process.env.REFRESH_TOKEN_SERECT_KEY,
                {expiresIn:timeExpr}
            );
        }
        if(!token)
        {
            console.log(`some things were wrong`);
        }
        return token;
    }
    catch(err)
    {
        console.log(err);
    }
   
};


module.exports  = gentoken;