/* eslint-env node, es6 */

const express = require('express');
const app = express();
const nodemailer = require('nodemailer')

const PORT = 5000;

const generatePage = require('./pages/index-get.js')

app.use(express.static('public'))
app.use(express.json())

app.get('/', async (req, res) => {
    const indexPage = await generatePage();

    res.send(indexPage)
})

app.post('/', (req, res) => {

    const contact = req.body;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jg.resume.server@gmail.com',
            pass: ''
        }
    });

    const mailOptions = {
        from: contact.email,
        to: 'julesgautherin@gmail.com',
        subject: `Contact Message from ${contact.email}: ${contact.subject}`,
        text: `From ${contact.name} \n${contact.message} \n\nPerson Contact Details: \nName: ${contact.name} \nEmail: ${contact.email} \nTel: ${contact.tel}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(`Error while sending the mail: ${error}`)
            console.log(`\n Mail informations: ${contact}`)
            res.send('error')
        }else{
            console.log(`Email sent: ${info.response}`)
            res.send('success')
        }
    })

})



app.listen(PORT, () => {
    console.log('Server started, port: ' + PORT)
})
