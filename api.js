const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();
require('dotenv').config();
const jwt = require('./genAccessToken');
const authen = require('./auth');
const operation = require('./operations');

//when server call back success show some infomation abount api site

const successInfo = {
    author:"Tanlg95",
    status:"success server call back"
}

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/api',router);
app.get('/',(req,res) =>{
    res.json(successInfo)
})

router.use((req,res,next) => {
    console.log('middelware');
    next();
});

// app.post('/register',(req,res,next) => {
//     const body = {...req.body};
//     const token = jwt({userid: body.userid, email: body.email},"5m");
//     res.json({
//         userid: body.userid,
//         password: body.password,
//         token: token
//     })
//     next();
// })

app.post('/login',authen,(req,res)=>{
    res.status(200).send(`welcome to my work space`)
})

//test connect database
router.route('/employee').get(
    (req,res) => {
        operation.getsomeemployee().then(
            data => res.json(data)
        )
    }
)

app.post('/register',(req,res) => {
    const body = {...req.body};
    operation.registerAccount(body).then(
        data => res.status(200).json(data)
    )
    res.json();
})


const port = process.env.PORT || 8888;

app.listen(port,() => {
    console.log(`server is running at port ${port}`);
})



