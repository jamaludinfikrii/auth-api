const db =require('./../database')
const Crypto = require('crypto')
const transporter = require('./../helper/nodemailer')
const verify = require('./../helper/emailer/verify')


module.exports = {
    register : (req,res) => {
        console.log('POST / REGISTER')

        // Check username Availability
        // Post to the database with verified false
        try{
            // req.body = {username , password, email, phone}
            var data = req.body
            data.verified = 'false'
            var sql = `select username
                    from users
                    where username = '${data.username}';`
            db.query(sql , (err,result) => {
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

            })
        }catch(err){
            res.send(err)
        }
    }
}