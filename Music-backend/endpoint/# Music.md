# Upload Music
http POST localhost:3000/v1/music/upload \
Authorization:"Bearer your_access_token" \
Content-Type:multipart/form-data \
{
    "songName": "My Song",
    "uploaderRole": ["composer"],
    "musicCulturalRegion": "region",
    "musicUsage": "usage",
    "musicStyle": "style",
    "musicImage": "@/path/to/image.jpg",
    "musicAudio": "@/path/to/audio.mp3",
    "musicBackground": "@/path/to/background.jpg"
}

# Show list music
http GET http://localhost:3000/v1/music/small-box Authorization:"Bearer <access_token>"

# Comment on Music
http POST localhost:3000/v1/music/comment/:musicId \
Authorization:"Bearer your_access_token" \
Content-Type:application/json \
{
    "comment": "Great song!"
}

# Rate Music
http POST localhost:3000/v1/music/rating/:musicId \
Authorization:"Bearer your_access_token" \
Content-Type:application/json \
{
    "rating": 5
}
