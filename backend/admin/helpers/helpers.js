const nodemailer = require('nodemailer');
// const logo = require("../upload/logo.png").PNG;
// console.log(logo);
console.log(process.env.password,process.env.user);
const transporter =  nodemailer.createTransport({
    TLS : true,
    port: 587,
    host: "smtp.gmail.com",
    auth: {
        user: "prabhakar19@navgurukul.org",
        pass: "NAVGURUKUL",
    },
});

exports.sendForgotPasswordMail =async (values) => {
    const { email,token,userId } = values;
    let mailOptions = {
        from: process.env.user,
        to: email,
        subject: 'Forgot Password',
        text: 'Node.js testing mail for GeeksforGeeks',
        html: `
        <p> your request for reset password</p>
        <h2>click in this  <a href="${process.env.FRONT_LIVE_URL}/${userId}/${token}">link</a> to  reset password</h2>       
         `
    } 
    transporter.sendMail(mailOptions, (error, result) => {
            if (error) {
              console.log(error);
            } else {
              console.log("That's wassup!");
            }
          });
};

exports.sendTenancyAndCreditProofMailFun=async(values)=>{
  console.log(values,"nnnnnnnnnnnnnn  values   ",);

  const transporter =  nodemailer.createTransport({
    TLS : true,
    port: 587,
    host: "smtp.gmail.com",
    auth: {
        user:"prabhakarsarkar.eminence@gmail.com",
        pass:"prabhakar123#",
    },
});

// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user:"prabhakar19@navgurukul.org",
//       pass: "NAVGURUKUL"
//   }
// });
  let mailOptions = {
    from:values.landlorad,
    to: values.tenacnyemail,
    subject: 'Credit proof ',
    text: 'Node.js testing mail for GeeksforGeeks',
    // cc:"gurpreet1.eminence@gmail.com",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Credit proof</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <style type="text/css">
      @media screen {
        
       @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
      }
      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }
      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
    
      img {
        -ms-interpolation-mode: bicubic;
      }
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }
     
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      table {
        border-collapse: collapse !important;
      }
      a {
        color: #1a82e2;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
      </style>
    
    </head>
    <body style="background-color: #ffffff;">
    
      <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
    
        <tr>
          <td align="center" bgcolor="#e9ecef">
          
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                 <tr>
                <td align="center" valign="top" style="padding: 30px 24px;"  bgcolor="#ffffff" style=" border-top: 3px solid #d4dadf;">
                  <a href="#" target="_blank" style="display: inline-block;">
                    <img src=${process.env.BACK_END_LIVE_URL}/logo.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width:200px;">
                  </a>
                </td> 
              </tr>
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 0px 24px 0px; font-family: 'Open Sans', sans-serif;">
                  <h1 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -1px; line-height: 35px;  text-transform: capitalize;" >Hello  ${values.Name},</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#e9ecef">
          
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding:10px 24px 10px 24px; font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">Great News! your current landlord or property manager at ${values.selectProperties}  is offering you the ability to improve your credit with your rent payments.</p>
                </td>
              </tr>
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding:0px 24px 0px 24px; font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;"><b>This is a free, optional, opt-in service provided by your landlord or property manager,</b> facilitated through the  Credit Proof organization</p>
                </td>
              </tr>
            </table>
            
          </td>
        </tr>
         <tr>
          <td align="center" bgcolor="#e9ecef">
          
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 20px 24px 0px;font-family: 'Open Sans', sans-serif;">
                  <h1 style="text-decoration: underline;margin: 0; font-size: 17px; font-weight: 700; letter-spacing: -1px; line-height: 35px;">Build your credit:</h1>
                </td>
              </tr>
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding:0px 24px 0px 24px;font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 24px;">
                  <ul>
                  <li style="margin: 0px 0px 10px 0px;">Each month your rent payment can help improve your Equifax credit report. Whether you have thin credit, low credit or excellent credit this program can assist.</li>
                  <li style="margin: 0px 0px 10px 0px;">Tenants often see their credit score jump 40 points in less than a year.</li>
                  <li style="margin: 0px 0px 10px 0px;">With a higher credit score you can access credit and save money with lower interest rates(e.g auto loans, bank loans, credit cards, and mortgage approvals).</li>
                  </ul>
                </td>
              </tr>
            </table>
            
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#e9ecef">
          
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 20px 24px 0px; font-family: 'Open Sans', sans-serif;">
                  <h1 style="text-decoration: underline;margin: 0; font-size: 17px; font-weight: 700; letter-spacing: -1px; line-height: 35px;">Build a positive Tenant Record:</h1>
                </td>
              </tr>
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding:0px 24px 0px 24px;font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 24px;">
                  <ul>
                  <li style="margin: 0px 0px 10px 0px;">Establish a positive Tenant Record that can be shared with future landlords to receive priority.</li>
                  <li style="margin: 0px 0px 10px 0px;">For tenants with poor credit. but a history of always paying rent. they often find it harder to secure housing. Now they can show potential landlords that despite a low credit score, they deserve priority.</li>
                  </ul>
                </td>
              </tr>
            </table>
            
          </td>
        </tr>
            <tr>
          <td align="center" bgcolor="#e9ecef">
          
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 20px 24px 0px; font-family: 'Open Sans', sans-serif;">
                  <h1 style="text-decoration: underline;margin: 0; font-size: 17px; font-weight: 700; letter-spacing: -1px; line-height: 35px;">Start building your credit and a positive Tenant Record:</h1>
                </td>
              </tr>
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding:0px 24px 30px 24px; font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 24px;">
                  <ol>
                  <li style="margin: 0px 0px 5px 0px;">create your free account: <a href="${process.env.FRONT_LIVE_URL}/tenancy-signup/${values.token}">Learn More</a></li>
                  <li style="margin: 0px 0px 5px 0px;">Review your Tenancy Record</li>
                  <li style="margin: 0px 0px 5px 0px;">Opt-in for the benefits if desired</li>
                  </ol>
                </td>
              </tr>
            </table>
          </td>
        </tr>
         <tr>
          <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
             <tr>
                <td align="left" bgcolor="#ffffff" style="padding:0px 24px 40px 24px; font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">Best Regards,</p>
                   <p style="margin: 0;"> Credit Proof  Support</p>
                    <p style="margin: 0;">E-mail: <a style="color:#a0a0a0;" href="mailto:support@landlordcreditproof.com">support@landlordcreditproof.com</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!-- end body -->
    </body>
    </html>
     `
} 
transporter.sendMail(mailOptions, (error, result) => {
        if (error) {
          console.log(error,"nnnnnnnnnnnnnnnnn");
          return error
        } else {
          console.log("That's wassup!",result);
        }
      });

}