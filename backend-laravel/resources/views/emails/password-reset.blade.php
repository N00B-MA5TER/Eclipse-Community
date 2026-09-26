<!DOCTYPE html>
<html>
<head>
    <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #fcfbf9; padding: 20px; color: #0c111d;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border: 2px solid #0c111d;">
        <h1 style="text-transform: uppercase; border-bottom: 2px solid #0c111d; padding-bottom: 10px;">ECLIPSE TECH COMMUNITY</h1>
        <h2 style="font-size: 20px; text-transform: uppercase; margin-top: 20px;">Reset Your Password</h2>
        
        <p>Hello,</p>
        <p>You are receiving this email because we received a password reset request for your Eclipse Community account.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ $resetUrl }}" style="display: inline-block; background-color: #0c111d; color: #ffffff; text-decoration: none; padding: 15px 25px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border: 2px solid #0c111d;">
                Reset Password
            </a>
        </div>

        <p style="word-break: break-all; font-size: 13px; color: #555;">
            Or copy and paste this URL into your browser:<br>
            <a href="{{ $resetUrl }}" style="color: #f59e0b;">{{ $resetUrl }}</a>
        </p>

        <p>This password reset link will expire in 60 minutes.</p>
        <p>If you did not request a password reset, no further action is required. You can safely ignore this email.</p>
        
        <br>
        <p>Regards,<br><strong>Eclipse Tech Community Team</strong></p>
    </div>
</body>
</html>
