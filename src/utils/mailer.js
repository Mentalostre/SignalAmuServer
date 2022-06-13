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

const d = process.env.DOMAIN_API

const send_mail = async (data)=>{
    const mailOptions = {
        from: 'SIGNAL\' AMU <signalamu@gmail.com>',
        to: data.mail,
        subject: 'Confirmez votre compte Signal\'AMU ',
        html: getHtml('http://'+ d +':3000/validate-email/' + data.last_name + '/' + data.key, data.first_name[0].toUpperCase() + data.first_name.substring(1))
    };
    try {
        const result = await transporter.sendMail(mailOptions);
        return result;
    }catch (err){
        return err;
    }
};

const getHtml = (url, nom)=>{
    return '<meta charset="utf-8">\n' +
        '<meta http-equiv="x-ua-compatible" content="ie=edge">\n' +
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
        '<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">\n' +
        '<meta name="color-scheme" content="light dark">\n' +
        '<meta name="supported-color-schemes" content="light dark">\n' +
        '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500&display=swap" rel="stylesheet">'
        +
        '    <style>\n' +
        '      td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Outfit Medium", sans-serif; mso-line-height-rule: exactly;}\n' +
        '    </style>\n' +
        '\n' +
        '<style>\n' +
        '      .hover-bg-primary-700:hover {\n' +
        '        background-color: #ffcc00 !important;\n' +
        '      }\n' +
        '\n' +
        '      .hover-underline:hover {\n' +
        '        text-decoration: underline !important;\n' +
        '      }\n' +
        '\n' +
        '      @media (max-width: 600px) {\n' +
        '        .sm-block {\n' +
        '          display: block !important;\n' +
        '        }\n' +
        '\n' +
        '        .sm-text-5xl {\n' +
        '          font-size: 48px !important;\n' +
        '        }\n' +
        '\n' +
        '        .sm-leading-20 {\n' +
        '          line-height: 20px !important;\n' +
        '        }\n' +
        '\n' +
        '        .sm-leading-48 {\n' +
        '          line-height: 48px !important;\n' +
        '        }\n' +
        '\n' +
        '        .sm-px-16 {\n' +
        '          padding-left: 16px !important;\n' +
        '          padding-right: 16px !important;\n' +
        '        }\n' +
        '\n' +
        '        .sm-px-20 {\n' +
        '          padding-left: 20px !important;\n' +
        '          padding-right: 20px !important;\n' +
        '        }\n' +
        '\n' +
        '        .sm-w-full {\n' +
        '          width: 100% !important;\n' +
        '        }\n' +
        '      }\n' +
        '    </style>\n' +
        '</head>\n' +
        '<body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #303030;">\n' +
        '<table style="width: 100%;" role="presentation">\n' +
        '<tr>\n' +
        '<td align="center" style="background-color: #303030;">\n' +
        '<div class="sm-leading-20" style="line-height: 32px;">&nbsp;</div>\n' +
        '<table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">\n' +
        '<tr>\n' +
        '<td align="center" class="sm-px-20" style="padding-left: 4px; padding-right: 4px;">\n' +
        '<table style="width: 100%;" role="presentation">\n' +
        '<tr>\n' +
        '<td style="background-color: #303030; border-radius: 4px; font-size: 16px; padding: 20px; text-align: left; color: #bdbdbd;">\n' +
        '<div>\n' +
        '<a href="" style="text-decoration: none;">\n' +
        '<img src="https://i.imgur.com/2mxaBIf.png" width="100" alt="Signal\'AMU Logo" style="border: 0; line-height: 100%; max-width: 100%; vertical-align: middle;">\n' +
        '</a>\n' +
        '</div>\n' +
        '<div style="line-height: 20px;">&nbsp;</div>\n' +
        '<h1 class="sm-text-5xl sm-leading-48 text-bf-gradient" style="mso-line-height-alt: 116px; font-weight: 700; font-size: 96px; line-height: 86px; margin: 0; color: #e2e2e2;">\n' +
        '    Bienvenue sur Signal\'AMU\n' +
        '</h1>\n' +
        '<div style="line-height: 40px;">&nbsp;</div>\n' +
        '<p style="line-height: 24px; margin: 0;">Bonjour '+ nom +',</p>\n' +
        '<div style="line-height: 24px;">&nbsp;</div>\n' +
        '<p style="line-height: 24px; margin: 0;">\n' +
        'Vous avez créé un compte sur l\'application Signal\'AMU, veuillez vérifier votre adresse e-mail en cliquant sur le bouton ci-dessous pour accéder au service.\n' +
        '</p>\n' +
        '<div style="line-height: 24px;">&nbsp;</div>\n' +
        '<a href="'+ url +'" class="sm-block sm-px-16 hover-bg-primary-700" style="background-color: #0066cc; border-radius: 4px; display: inline-block; font-weight: 700; font-size: 16px; line-height: 100%; padding-top: 16px; padding-bottom: 16px; padding-left: 32px; padding-right: 32px; text-align: center; color: #ffffff; text-decoration: none;">\n' +
        '<!--[if mso]><i style="letter-spacing: 32px; mso-font-width: -100%; mso-text-raise:30px;">&#8202;</i><![endif]-->\n' +
        '<span style="mso-text-raise: 16px;">Valider mon inscription</span>\n' +
        '<!--[if mso]><i style="letter-spacing: 32px; mso-font-width: -100%;">&#8202;</i><![endif]-->\n' +
        '</a>\n' +
        '<div style="line-height: 40px;">&nbsp;</div>\n' +
        '</tr>\n' +
        '</table>\n' +
        '</td>\n' +
        '</tr>\n' +
        '\n' +
        '<tr>\n' +
        '<td style="font-size: 12px; line-height: 18px; padding-left: 40px; padding-right: 40px; color: #bdbdbd;">\n' +
        '<div style="line-height: 12px;">&nbsp;</div>\n' +
        '<table cellpadding="0" cellspacing="0" role="presentation">\n' +
        '<tr>\n' +
        '<td style="padding-right: 10px; vertical-align: top;" valign="top">\n' +
        '<a href="" style="text-decoration: none;">\n' +
        '<img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" height="40" alt="Download on the Mac App Store" style="border: 0; line-height: 100%; max-width: 100%; vertical-align: middle;">\n' +
        '</a>\n' +
        '</td>\n' +
        '<td style="vertical-align: top;" valign="top">\n' +
        '<a href="" style="text-decoration: none;">\n' +
        '<img src="https://lh3.googleusercontent.com/qF9r3ZjtgG-qyHdmjecArtKiulz1gmwL_xl9R3_fzk6igSeoN0wYbJSKEX5d_fxJRwYZJpHbqcLB3i9atl-9dOfUl9an7U43TfZ9PtQ=s0" height="40" alt="Get it on Google Play" style="border: 0; line-height: 100%; max-width: 100%; vertical-align: middle;">\n' +
        '</a>\n' +
        '</td>\n' +
        '</tr>\n' +
        '</table>\n' +
        '<div style="line-height: 24px;">&nbsp;</div>\n' +
        '<p style="margin: 0;">\n' +
        'Une question? Un problème? Contactez-nous à l\'adresse <a href="mailto:signalamu@gmail.com" class="hover-underline" style="color: #0066CC; text-decoration: none;">signalamu@gmail.com</a>.\n' +
        '</p>\n' +
        '<div style="line-height: 24px;">&nbsp;</div>\n' +
        '<p style="margin: 0;">\n' +
        'Le bouton ne fonctionne pas ? Utilisez le lien suivant <a href="'+ url +'">'+url+'</a>.\n' +
        '</p>\n' +
        '<div class="sm-leading-20" style="line-height: 32px;">&nbsp;</div>\n' +
        '</td>\n' +
        '</tr>\n' +
        '</table>\n' +
        '</td>\n' +
        '</tr>\n' +
        '</table>'
}



export {send_mail};

