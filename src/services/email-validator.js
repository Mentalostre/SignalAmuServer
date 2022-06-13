import {validate_email_db, update_user_status_db} from "../models/validate-email.js";

const html_page =  null ;

const email_validator_service = (req, res)=>{
    const user = req.params.user;
    const verificaton_code = req.params.vc;
    validate_email_db(verificaton_code).then(async (result)=>{
        if(!result[0]){
            res.send(htmlInvalid);
        }else {
            let last_name = result[0].last_name;
            if (user !== last_name) res.send(htmlInvalid);
            else {
                await update_user_status_db(verificaton_code);
                res.status(200).send(htmlVerified);
            }
        }
    }).catch((err)=>{
        console.log(err);
    });
};

const htmlVerified = '<html>\n' +
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
    '        margin: auto;\n' +
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
    '      <div style="height:300px; width:350px; margin-bottom: 15px; margin: auto; ">\n' +
    '        <lottie-player id=\'lottie\' src="https://assets5.lottiefiles.com/packages/lf20_icllnlul.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>\n' +
    '      </div>\n' +
    '        <h1>Vérification terminé</h1> \n' +
    '        <p>Merci d\'avoir validé votre e-mail.<br/> À très vite sur Signal\'AMU!</p>\n' +
    '      </div>\n' +
    '    </body>\n' +
    '</html>'

const htmlInvalid = '<html>\n' +
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
    '          color: #FF4646;\n' +
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
    '        margin:auto;\n' +
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
    '      <div style="height:300px; width:350px; margin-bottom: 15px; margin: auto; ">\n' +
    '        <lottie-player id=\'lottie\' src="https://assets10.lottiefiles.com/packages/lf20_uh3ld5hq.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>\n' +
    '      </div>\n' +
    '        <h1>Erreur</h1> \n' +
    '        <p>Impossible de vérifier votre e-mail.<br/> Si le problème persiste, contactez le support</p>\n' +
    '      </div>\n' +
    '    </body>\n' +
    '</html>'


export {email_validator_service};