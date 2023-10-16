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
            "userID" , mssql.NVarChar(50), body.userid,
        ).input(
            "email", mssql.NVarChar(50), body.email
        ).input(
            "password", mssql.VarChar(4000), passwordEncrypt
        ).input(
            "accesstoken",mssql.VarChar(4000), gentoken({
                userid: body.userid,
                email: body.email
            },"30m",1)
        ).input(
            "refreshtoken",mssql.VarChar(4000), gentoken({
                userid: body.userid,
                email: body.email
            },"30d",2))
        .execute("nodejs_api.usp_postempAccount");
        return respone.recordset;
    }
    catch(err)
    {
        console.log(err);
    }
}

// async function getbankAccount()
// {}

module.exports = {
    getsomeemployee: getsomeemployee,
    registerAccount: registerAccount
}