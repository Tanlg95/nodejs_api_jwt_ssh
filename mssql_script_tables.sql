
IF NOT EXISTS(SELECT 1 FROM SYS.schemas WHERE [name] = 'nodejs_api')
EXEC ('CREATE SCHEMA nodejs_api')

GO

IF OBJECT_ID('nodejs_api.utblempAccount') > 0
DROP TABLE nodejs_api.utblempAccount
GO

CREATE TABLE nodejs_api.utblempAccount(
    keyID UNIQUEIDENTIFIER DEFAULT(NEWSEQUENTIALID()),
    userID NVARCHAR(100),
    email NVARCHAR(100),
    [password] VARCHAR(4000),
    [accesstoken] VARCHAR(4000),
    [refreshtoken] VARCHAR(4000),
    CONSTRAINT cs_pk_nodejsapi_utblempAccount PRIMARY KEY CLUSTERED (userID)
) ON [PRIMARY]

GO