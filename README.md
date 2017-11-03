## Instructions for running the project

* Run these commands in a terminal window:
    - `cd api-server`
    - `npm install`
    - `node server`

* And these commands in a separate terminal window:
    - `cd frontend`
    - `npm install`
    - `npm start`

After following the above steps, you can visit the site in your browser. By default, the site runs on port 3001, so if testing locally please visit http://localhost:3001 in your browser.

Note: to view the details of a post, please click the "Comments" button in the bottom right corner (this button also displays the total number of comments that each post has). This will take you to the /:category/:postId route. If you try to view a post that does not exist, an message will display.

After editing a post, you will be redirected to the category page for that post's category. There is no form validation, so it's okay to leave input fields blank when creating posts and comments.

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
