# Add User Space [Done]
http POST localhost:3000/v1/user-space/add \
Authorization:"Bearer your_access_token" \
Content-Type:application/json \
{
    "firstName": "John",
    "lastName": "Doe",
    "occupation": ["composer"],
    "hiring": true,
    "collaborationLyricsLangs": ["English"],
    "proficientMusicStyles": ["Rock"],
    "skilledInstruments": ["Guitar"],
    "collaboratedSingers": "Singer names",
    "collaboratedPublisher": "Publisher name",
    "companyOrStudio": "Studio name",
    "aboutMe": "About me text",
    "profilePicture": "picture.jpg"
}

# Update User Space [Done]
http PATCH localhost:3000/v1/user-space/update \
Authorization:"Bearer your_access_token" \
Content-Type:application/json \
{
    "firstName": "Updated Name"
}
