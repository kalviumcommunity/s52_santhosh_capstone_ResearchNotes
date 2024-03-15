const nodeMailer = require('nodemailer')
require('dotenv').config();

const transfer = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.MAILID,
        pass:process.env.PASSWORD
    }
})

function sendOTP(mailid,otp){

    const mailOptions={
        from:process.env.MAILID,
        to:mailid,
        subject:'Your OTP for authentication',
        html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                p {
                    color: #666;
                    font-size: 16px;
                    line-height: 1.6;
                }
                .otp-code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>One Time Password (OTP) for Authentication</h1>
                <p>Your One Time Password (OTP) for authentication is:</p>
                <p class="otp-code">${otp}</p>
                <p>Please use this OTP to proceed with your authentication process.</p>
                <p>If you didn't request this OTP, please ignore this email.</p>
                <div class="footer">
                    <p>This email was sent from ResearchNotes pvt limited.</p>
                </div>
            </div>
        </body>
        </html>        
        `
    }
    
    transfer.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log("Error",err)
            return err
        }else{
            console.log("Email sent successfully,", info.response)
            return info
        }
    })
}

module.exports = {sendOTP}