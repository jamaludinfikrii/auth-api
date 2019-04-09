const db =require('./../database')
const Crypto = require('crypto')
const transporter = require('./../helper/nodemailer')
const verify = require('./../helper/emailer/verify')


module.exports = {
    register : (req,res) => {
        console.log('POST / REGISTER')

        // Check username Availability
        // Post to the database with verified false
       
            // req.body = {username , password, email, phone}
            var data = req.body
            data.verified = 'false'
            var sql = `select username
                    from users
                    where username = '${data.username}';`
            db.query(sql , (err,result) => {
                try{
                    if(err) throw {error:true , msg : 'Error in database'}

                    if(result.length > 0) throw {error : true, msg : 'Username has been taken'}

                    var hashPassword = Crypto.createHmac('sha256','secretabc')
                                       .update(data.password).digest('hex')

                    data = {...data , password : hashPassword}
                    var sql = `insert into users set ?`
                    db.query(sql,data, (err,result) => {
                        if(err) throw {error:true , msg : 'Error in database'}
                        var mailOptions = verify(data.username,hashPassword,data.email)
                            transporter.sendMail(mailOptions, (err,res1) => {
                                if(err) throw {error : true , msg : 'Error saat pengiriman email'}
                                res.send('Register Succes, please check your email to verify')                            
                            })
    
                    })
                }catch(err){
                    res.send(err)
                }
              

            })
       
    },
    verification : (req,res) => {
        var username = req.body.username
        var password = req.body.password
        var sql = `update users set verified = 'true' 
                   where username = '${username}' and password = '${password}'`
        db.query(sql, (err,result) => {
            if(err) throw err
            console.log(result)
            res.send('Email Berhasil di Verifikasi')
        })
        // GET USERNAME DAN PASSWORD
        // UPDATE COLUMN VERIFIED MENJADI TRUE
    },
    login : (req,res) => {
        var username = req.body.username
        var password = req.body.password
        hashPassword = Crypto.createHmac('sha256' , 'secretabc')
                       .update(password).digest('hex')
        var sql = `select verified from users where username = '${username}' and password = '${hashPassword}'`
        db.query(sql , (err,result) => {
            if(err) throw err
            if(result ==false){
                res.send('Username or password invalid')
            }else{
                if(result[0].verified == 'false'){
                    res.send('Please verify your email')
                }else{
                    var sql = `select * from users where username = '${username}'`
                    db.query(sql , (err,result) => {
                        if(err) throw err
                        res.send(result)
                    })
                }
            }
        })
        // PASSWORD DI HASH
        // CHECK USERNAME DAN PASSWORD
        // KALO USERNAME DAN PASSWORD SESUAI, GET COLUMN VERIFIED
        // KALO VERIFIED = TRUE, GET ALL DATA DAN KASIH KE FRONT END
    }

}