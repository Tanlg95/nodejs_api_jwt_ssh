
IF OBJECT_ID('nodejs_api.usp_postempAccount') > 0
DROP PROCEDURE nodejs_api.usp_postempAccount
GO

CREATE  PROCEDURE nodejs_api.usp_postempAccount 
    @userid VARCHAR(100),
    @email NVARCHAR(100),
    @password VARCHAR(4000),
    @accesstoken VARCHAR(4000),
    @refreshtoken VARCHAR(4000)
AS
BEGIN

    SET NOCOUNT ON;
    INSERT INTO nodejs_api.utblempAccount(userID,email,[password],accesstoken,refreshtoken)
    VALUES (@userid,@email,@password,@accesstoken,@refreshtoken)

END

GO


IF OBJECT_ID('nodejs_api.usp_getbankAccount') > 0
DROP PROCEDURE nodejs_api.usp_getbankAccount 
GO

CREATE PROCEDURE nodejs_api.usp_getbankAccount @employeeID NVARCHAR(100), @enddate DATE
AS
BEGIN 

    SELECT 
        T.* 
    FROM 
        TDS_tblEmpBankAcc  T
    INNER JOIN  
        (

            SELECT 
                employeeID,
                MAX(DateChange) maxdate
            FROM    
                TDS_tblEmpBankAcc
            WHERE
                DateChange <= @enddate
            AND
                employeeID = @employeeID 
            GROUP BY
                employeeID
            
        )Sub ON  T.employeeID = Sub.employeeID AND T.DateChange = sub.maxdate
    -- WHERE   
    --     employeeID = @employeeID 


END

GO

--EXAMPLE: EXEC usp_getbankAccount 'SIV00032','2023-10-10'