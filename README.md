# Tasklist application

## Assumptions

- I assumed that in order to remove the idempotency of the api i should find a way to remove the tasks so the api could fetch new ones, so i added a filter in the api to not show the tasks that were completed. Anyway those tasks aren't deleted from the DB unless the delete completed method is called, so a feature that shows the completed tasks could be added later.

- I assumed that when fetching the tasks it will always return the firsts elements in the DB, if there isn't enough elements in the database to reply the number of tasks requested it will query the lorem faker api to create new ones.

## Run the application

To run the application with docker just run the following command:

### `docker-compose up -d`

that will create 3 docker containers (react app, node server and mongo db) and make the application available on port 3000.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you want to run the application without docker-compose, you can run each project separately (front and back) and a mongodb instance (you can either download it locally or run `docker-compose up -d` inside `/mongo-db`). Each project has its own README.md file that indicates how to run the application locally and if there is any modification that has to be done.
