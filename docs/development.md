# Development

I have now unified frontend and backend under the same docker-compose.
To launch both, in project root:

`docker compose up --build`

This will make a new database too, for development.

You can shutdown in the terminal by pressing `ctrl + c` and if you want the images to reset, `docker compose down`. Keep in mind that the database will get reset with this.
