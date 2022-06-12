const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                type: "OAuth2",
                user: process.env.SMTP_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH,
                accessToken: process.env.ACCESS,
                expires: 3599,
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    async sendActivationMail(to, link){
        return true
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Подтверждение аккаунта в сервисе EnerChest",
            text: "",
            html:
                `
                <center>
                <div style="
                    background-color: #856CA4;
                    border-radius: 20px;
                    padding: 1px;
                ">
                <h1 style="
                    color: #fff;
                    margin: 15px 20px;
                ">Для активации перейдите по ссылке</h1>
                <a href="${link}" style="
                    text-decoration: none;
                    display: inline-block;
                    padding: 10px 30px;
                    margin: 10px 20px;
                    position: center;
                    overflow: hidden;
                    border: 2px solid #fe6637;
                    border-radius: 8px;
                    font-family: 'Montserrat', sans-serif;
                    background: #F3A055;
                    color: #fff;
                ">Подтвердить</a>
                </div>
                </center>
                `
        })
    }

    async sendActivationMail(to, link){
        return true
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Подтверждение аккаунта в сервисе EnerChest",
            text: "",
            html:
                `
                <center>
                <div style="
                    background-color: #856CA4;
                    border-radius: 20px;
                    padding: 1px;
                ">
                <h1 style="
                    color: #fff;
                    margin: 15px 20px;
                ">Для активации перейдите по ссылке</h1>
                <a href="${link}" style="
                    text-decoration: none;
                    display: inline-block;
                    padding: 10px 30px;
                    margin: 10px 20px;
                    position: center;
                    overflow: hidden;
                    border: 2px solid #fe6637;
                    border-radius: 8px;
                    font-family: 'Montserrat', sans-serif;
                    background: #F3A055;
                    color: #fff;
                ">Подтвердить</a>
                </div>
                </center>
                `
        })
    }

    async sendMail(to, text){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Тестовое сообщение",
            text

        })
    }
}

module.exports = new MailService()