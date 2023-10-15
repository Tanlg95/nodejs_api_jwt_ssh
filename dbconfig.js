
// mssql connect info
const mssql_connect = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options:{
        trustedconnection: Boolean(process.env.SQL_TRUSTEDCONNECTION),
        enableArithAbort: Boolean(process.env.SQL_ENALBLEARITHABORT),
        trustServerCertificate: Boolean(process.env.SQL_TRUSTSERVERCERTIFICATE),
        instancename: process.env.SQL_INSTANCENAME
    },
    port: Number(process.env.SQL_PORT)
};

module.exports = {
    mssql_connect: mssql_connect
}