const verifyEmailTemplate = ({ name, url }) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #444;">Hello, ${name}!</h2>    
        <p>Thank you for registering on <strong>3D Model Marketplace</strong>. Please verify your email to activate your account.</p>  
        <p>Click the button below to verify your email:</p>
        <a href="${url}" style="display: inline-block; padding: 12px 20px; background-color: #ff6600; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; margin-top: 10px;">
            Verify Email
        </a>
        <p>If you did not sign up, please ignore this email.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>3D Model Marketplace Team</strong></p>
    </div>
    `;
};

export default verifyEmailTemplate;
