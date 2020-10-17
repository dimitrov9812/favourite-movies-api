## Favourite Movies API

This is an api for the movie application wich I am building right now. Currently I've setup the user login and register which will make each user's movie choises unique.

The database is ###MongoDb and for validation i use ###Joi to validate the user model. After successfull validation the user's password is being hashed with ###bcryptjs and the user is being pushed to the database.

For the login we have only 2 fields which after successfull validation we make sure that the user is unique and the hashed password is equal to the request body's password. If there are no errors the user is logged in and then on the front we can controll the movie search and the user movie list's.