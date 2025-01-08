# Post Job
http POST localhost:3000/v1/job/add \
Authorization:"Bearer your_access_token" \
Content-Type:application/json \
{
    "projectTitle": "Music Project",
    "category": ["category1"],
    "isHaveLyric": true,
    "budget": "1000",
    "timeFrame": "1 month",
    "description": "Project description"
}

# Apply for Job
http POST localhost:3000/v1/job/apply/:jobId \
Authorization:"Bearer your_access_token" \
Content-Type:application/json \
{
    "musicIds": ["musicId1", "musicId2", "musicId3", "musicId4"],
    "message": "Application message"
}

# Update Job
http PUT localhost:3000/v1/job/:jobId \
Authorization:"Bearer your_access_token" \
Content-Type:application/json \
{
    "projectTitle": "Updated Project"
}