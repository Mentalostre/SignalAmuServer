import {validate_email_db, update_user_status_db} from "../models/validate-email.js";

const html_page =  null ;

const email_validator_service = (req, res)=>{
    const user = req.params.user;
    const verificaton_code = req.params.vc;
    validate_email_db(verificaton_code).then(async (result)=>{
        if(!result[0]){
            res.send('impossible de verifier l\'email').end();
        }else {
            let last_name = result[0].last_name;
            if (user !== last_name) res.send('impossible de verifier l\'email').end();
            else {
                await update_user_status_db(verificaton_code);
                res.status(200).send(html);
            }
        }
    }).catch((err)=>{
        console.log(err);
    });
};


const html = '<html>\n' +
    '  <head>\n' +
    '    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">\n' +
    '    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>\n' +
    '  </head>\n' +
    '    <style>\n' +
    '      body {\n' +
    '        text-align: center;\n' +
    '        padding: 40px 0;\n' +
    '        background: #EBF0F5;\n' +
    '      }\n' +
    '        h1 {\n' +
    '          color: #88B04B;\n' +
    '          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;\n' +
    '          font-weight: 900;\n' +
    '          font-size: 40px;\n' +
    '          margin-bottom: 10px;\n' +
    '        }\n' +
    '        p {\n' +
    '          color: #404F5E;\n' +
    '          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;\n' +
    '          font-size:20px;\n' +
    '          margin: 0;\n' +
    '        }\n' +
    '      #lottie {\n' +
    '\n' +
    '        font-size: 100px;\n' +
    '        line-height: 200px;\n' +
    '        margin-left:15px;\n' +
    '        margin-bottom: 15px;\n' +
    '      }\n' +
    '      .card {\n' +
    '        background: white;\n' +
    '        padding: 60px;\n' +
    '        border-radius: 4px;\n' +
    '        box-shadow: 0 2px 3px #C8D0D8;\n' +
    '        display: inline-block;\n' +
    '        margin-top: 10vh;\n' +
    '      }\n' +
    '    </style>\n' +
    '    <body>\n' +
    '      <div class="card">\n' +
    '      <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; ">\n' +
    '        <lottie-player id=\'lottie\' src="https://assets5.lottiefiles.com/packages/lf20_icllnlul.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>\n' +
    '      </div>\n' +
    '        <h1>Success</h1> \n' +
    '        <p>Merci d\'avoir validé votre e-mail.<br/> À très vite sur Signal\'AMU!</p>\n' +
    '      </div>\n' +
    '    </body>\n' +
    '</html>'

export {email_validator_service};