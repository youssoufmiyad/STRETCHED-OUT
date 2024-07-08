const nodemailer = require("nodemailer");
require("dotenv").config();

const sendConfirmationMail = (mail) => {
	console.log(
		`process user : ${process.env.MAIL_USER}, process password : ${process.env.MAIL_PASSWORD}`,
	);
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.MAIL_USER,
		to: mail,
		subject: "Your confirmation link",
		text: "Here is your confirmation link : ",
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log(`Email sent: ${info.response}`);
		}
	});
};

module.exports.sendConfirmationMail = sendConfirmationMail;
