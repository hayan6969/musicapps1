# Create User (Admin only)
http POST localhost:3000/v1/users \
Authorization:"Bearer your_access_token" \
Content-Type:application/json \
{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123",
    "role": "user"
}

# Get All Users
http GET localhost:3000/v1/users \
Authorization:"Bearer your_access_token"

# Get User by ID
http GET localhost:3000/v1/users/:userId \
Authorization:"Bearer your_access_token"

# Update User
http PATCH localhost:3000/v1/users/:userId \
Authorization:"Bearer your_access_token" \
Content-Type:application/json \
{
    "name": "Updated Name"
}

# Delete User
http DELETE localhost:3000/v1/users/:userId \
Authorization:"Bearer your_access_token"

# Follow User
http POST localhost:3000/v1/users/:userId/follow \
Authorization:"Bearer your_access_token"

# Get Following List
http GET localhost:3000/v1/users/me/following \
Authorization:"Bearer your_access_token"