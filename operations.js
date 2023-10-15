const mssql = require('mssql');
const dbconfig = require('./dbconfig').mssql_connect;
const crypt = require('bcryptjs'); // encrypt or decrypt password or something else
const gentoken = require('./genAccessToken');
//test connect

async function getsomeemployee()
{
    try{
        const pool = await mssql.connect(dbconfig);
        const respone = await pool.request().query(
            "SELECT * FROM TBLEMPLOYEE"
        );
        return respone.recordset;
    }
    catch(err)
    {
        console.log(err);
    }
}

// register account

async function registerAccount(body)
{
    try{
        const passwordEncrypt = crypt.hashSync(body.password,crypt.genSaltSync(10));
        const pool = await mssql.connect(dbconfig);
        const respone = await pool.request().input(
            "UserID" , mssql.NVarChar(50), body.userid,
        ).input(
            "Email", mssql.NVarChar(50), body.email
        ).input(
            "Password", mssql.NVarChar(8000), passwordEncrypt
        ).input(
            "AToken",mssql.NVarChar(8000), gentoken({
                userid: body.userid,
                email: body.email
            },"15m",1)
        ).input(
            "Rtoken",mssql.NVarChar(8000), gentoken({
                userid: body.userid,
                email: body.email
            },"30d",2))
        .query("INSERT INTO nodejs_api.utblempAccount (UserID,Email,Password,AccessToken,RefreshToken) VALUES(@UserID,@Email,@Password,@Atoken,@Rtoken)");
        return respone.recordset;
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {
    getsomeemployee: getsomeemployee,
    registerAccount: registerAccount
}