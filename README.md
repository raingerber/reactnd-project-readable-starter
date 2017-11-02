# Readable API Server

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Start Developing

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, use Create React App to scaffold out the front-end
    - `create-react-app frontend`
    - `cd frontend`
    - `npm start`

After following the above steps, you can visit the site in your browser. By default, the site runs on port 3001, so if testing locally please visit http://localhost:3001 in your browser.

Note: to view the details of a post, please click the "Comments" button in the bottom right corner (this button also displays the total number of comments that each post has). This will take you to the /:category/:postId route.

After editing a post, you will be redirected to the category page for that post's category. There is no form validation, so it's okay to leave input fields blank when creating posts and comments.

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
