const sendgrid = require('@sendgrid/mail');

module.exports = async function (context, req) {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        context.res = {
            status: 400,
            body: { message: 'Please provide name, email, and message.' }
        };
        return;
    }

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

    const emailContent = {
        to: 'dmgiangi@gmail.com', // Replace with your receiving email
        from: 'portfolio@dmgiangi.dev',  // Replace with your sender email
        subject: `FROM PORTFOLIO: ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
        html: `<strong>You have received a new message from ${name} (${email}):</strong><p>${message}</p>`
    };

    try {
        await sendgrid.send(emailContent);
        context.res = {
            status: 200,
            body: { message: 'Email sent successfully!' }
        };
    } catch (error) {
        context.log(error);
        context.res = {
            status: 500,
            body: { message: 'Error sending email. Please try again later.' }
        };
    }
};
