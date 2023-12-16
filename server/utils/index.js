const jwt = require('jsonwebtoken');
const Token = require('../models/tokenModel');
const nodemailer = require('nodemailer');

exports.signToken = (user_id) => {
  try {
    return jwt.sign({ id: user_id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN || '3d',
    });
  } catch (err) {
    console.log('sign jwt error', err);
  }
};

exports.saveToken = async (account_id, token, expires) => {
  try {
    await Token.create({
      account_id,
      token,
      expiresAt: new Date(
        Date.now() +
          1000 *
            60 *
            60 *
            24 *
            parseInt(process.env.TOKEN_EXPIRES_IN || expires || 3)
      ),
    });
  } catch (err) {
    console.log('save token error', err);
  }
};

exports.forgotPasswordEmailTemplate = (token) => {
  return `
  <!DOCTYPE html>
  <html>
  <body>
    <div
      style="
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        width: 400px;
        text-align: center;
      "
    >
      <h2 style="font-size: 24px; font-weight: bold; color: #333">
        Reset Your Password
      </h2>
      <p style="font-size: 16px; color: #666">Dear [User],</p>
      <p style="font-size: 16px; color: #666">
        We noticed that you recently requested to reset your password for your
        account. If you did not make this request,
        please disregard this email. No changes will be made to your account.
      </p>
      <p style="font-size: 16px; color: #666">
        To reset your password, click the button below. If you're unable to see
        the button, please copy and paste the following URL into your web
        browser:
      </p>
      <a
        href="${token || ''}"
        style="
          display: inline-block;
          padding: 10px 20px;
          margin-top: 10px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s;
        "
        >Reset Password</a
      >

      <p style="font-size: 16px; color: #666">
      ${token || ''}
        For security reasons, this link will expire in [10min], so
        please reset your password promptly.
      </p>
      <p style="font-size: 16px; color: #666">
        If you did make this request, please click the button and follow the
        instructions to set your new password. Your account security is
        important to us, so be sure to choose a strong, unique password.
      </p>
      <p style="font-size: 16px; color: #666">
        Thank you for choosing [Your Company Name]!
      </p>
      <p style="font-size: 16px; color: #666">
        Best Regards,<br />The [Team] Team
      </p>
    </div>
  </body>
</html>
`;
};

exports.sendEmail = async (option) => {
  if (!option.email) {
    throw new Error('Please provide email');
  }
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'website Name'}" <${
      process.env.EMAIL_FROM
    }>`, // sender address
    to: option.email,
    subject: option.subject,
    html: option.message,
  };
  await transporter.sendMail(mailOptions);
};

exports.verifyEmailTemplate = (link) => {
  return `
    <html>
      <head>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f0f0f0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cccccc; padding: 20px;">
          <div style="text-align: center;">
            <img src="^1^" alt="Logo" width="200" height="100">
          </div>
          <div style="font-size: 16px; line-height: 1.5; color: #333333;">
            <h1>Welcome to our website!</h1>
            <p>Thank you for signing up. To complete your registration, please verify your email address by clicking the button below.</p>
            <p><a href="${link}" style="display: inline-block; background-color: #0099ff; color: #ffffff; padding: 10px 20px; text-decoration: none;">Verify Email</a></p>
            <p>If you have any questions or need any help, please contact us at support@website.com.</p>
            <p>Thank you for choosing us!</p>
            <p>The Website Team</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
