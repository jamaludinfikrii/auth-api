const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { authRouter } = require('./router')
const port = 5000

app.use(cors())
app.use(bodyParser.json())

app.get('/' , (req,res) => {
    res.send('<h1> Selamat Datang di API Nodemailer </h1>')
})

app.use('/auth' , authRouter)

// app.get('/testnodemailer' , (req,res) => {
//     var to = req.query.email
//     var mailOptions = {
//         from : 'Purwadhika <purwadhika@purwadhika.com>' ,
//         to : to ,
//         subject : 'Test Nodemailer' ,
//         html : ' <h1> Klik Link ini untuk mengaktifkan akun </h1> '
//     }
//     if(to){
//         transporter.sendMail(mailOptions, (err,res1) => {
//             if(err) throw err
//             console.log(res1)
//             res.send('Email Berhasil dikirim')
//         })
//     }else{
//         res.send('Alamat Email Belum ada')
//     }

// })


// app.get('/testencrypt', (req,res) => {
//     var password = req.query.password
//     var hasil = cryp.createHmac('sha256', 'diubah').update(password).digest('hex')  
//     console.log(password + ' telah di enkrip menjadi = ' + hasil)
//     console.log('panjang hasil enkrip adalah = ' + hasil.length)
// })



app.listen(port , () => console.log('Berjalan di Port ' + port))




// 