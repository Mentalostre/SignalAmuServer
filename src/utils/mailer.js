import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth:{
        user: process.env.MAIL_USER || 'signalamu@gmail.com',
        pass: process.env.MAIL_PASSWORD || 'nghcdkjbufkvhlpb'
    }
});


/*
    data = {
        to:
        url:
    };
 */
const send_mail = async (data)=>{
    const mailOptions = {
        from: 'SIGNAL\' AMU <signalamu@gmail.com>',
        to: data.mail,
        subject: 'Confirmez votre compte Signal\'AMU ',
        text: 'Executer cette url pour valider votre email : http://localhost:3000/validate-email/' + data.last_name + '/' + data.key,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        return result;
    }catch (err){
        return err;
    }
};

export {send_mail};

