# House of Games

House of Games provides a front-end to an earlier developed api, contaning a collection of reviews (of in this case board games) with associated comments.

Hosted version: https://gjhouseofgames.netlify.app/

## Using the page

The home page shows a list of all of the reviews present in the database.

Using the links towards the top of the page will cause the display the reviews for that category of game only.

Reviews can be sorted in ascending/descending order and by different criteria by using the drop down boxes just above the reviews.

For demonstration purposes, a default user can log in with the "login" button. When logged in a message is displayed. Being logged in allows the user to post a new review, or comment/vote on existing reviews; and, to post comments, and vote on comments.

Users can delete only their own comments, if they wish.

## Back-end

House of Games is the front-end to https://github.com/gareth5james/GJ-nc-games

## Running locally for testing/development

### Cloning

- create a new local folder

- fork on github and clone into your local folder

> git clone your_forked_repo.git

### Dependencies

> npm install

to install all dependencies.

#### Minimum versions

- Node.js v18.12.1

### Running

> cd nc-games

to move into the project folder.

> npm start

to run a local view of the page at http://localhost:3000
