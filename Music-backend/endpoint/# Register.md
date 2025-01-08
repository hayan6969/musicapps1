# Register [Done]
http POST localhost:3000/v1/auth/register \
Content-Type:application/json \
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}

# Login [Done]
http POST localhost:3000/v1/auth/login \
Content-Type:application/json \
{
    "email": "john@example.com",
    "password": "password123"
}

# Logout [Done]
http POST localhost:3000/v1/auth/logout \
Content-Type:application/json \
{
    "refreshToken": "your_refresh_token"
}

# Refresh Tokens
http POST localhost:3000/v1/auth/refresh-tokens \
Content-Type:application/json \
{
    "refreshToken": "your_refresh_token"
}

# Forgot Password
http POST localhost:3000/v1/auth/forgot-password \
Content-Type:application/json \
{
    "email": "john@example.com"
}

# Reset Password
http POST localhost:3000/v1/auth/reset-password?token=reset_token \
Content-Type:application/json \
{
    "password": "newpassword123"
}

# Send Verification Email
http POST localhost:3000/v1/auth/send-verification-email \
Authorization:"Bearer your_access_token"

# Verify Email
http POST localhost:3000/v1/auth/verify-email?token=verification_token
