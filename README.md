
![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)
General Assembly, Software Engineering Immersive

# Seeded
 [](http://seeded-1.herokuapp.com/)
 
### MERN Full Stack Application
A Plant Baby Sitting App

## Overview 
This is my third project at General Assembly as a Software Engineer Immersive course's student. We were placed in a group of 4 to worked together to design and develop a MERN full-stack application within 7 days

Seeded is a plant sitting app whereby plants' owners and plants' sitters can communicate with each other to share tips on plants, showcase their plants, look for a plant sitter or make a quick cash.
The app features lots of functionalities such as image uploading and message boards.

### Brief:

* Collaborative development using Git and GitHub
* Build a full-stack application using mongoose, express, react and node.js 
* Use Express API to serve the data from a Mongo database (MongoDB)
* Consume your API with a separate front-end built with React
* Be a complete project with multiple relationships and CRUD functionality 
* Design a visually impressive Front End, with mobile responsiveness as a key element
* Be deploy online and accessible to the public

### Technologies:

* HTML
* Bulma
* SCSS
* JavaScript
* React.js and JSX 
* Express
* Node Package Manager (npm)
* Babel Transpiler
* Webpack
* MongoDB and Mongoose
* Insomnia
* VSCode
* Git 
* GitHub 
* Herokun(Deployment)


## Functionality: 

User should be able to:
* Register and
login into our app.
* Update and delete their account
* Add, update or delete plants in their profile
* Post message on into the 'Pin Board'
* Make comments on message on the 'Pin Board'

## Approach taken:



### Planning 
On the first we discussed the full-stack app we wanted to design and build as a team and then we work through the backend framework together.
We look at different features we wanted the app to have. We had to look into what our Schema might look like for our data.
We also identify on day 1 that we will need an external API for this project, therefore we had to find the API that was able to give us the information required.
Additionally, looked at what CRUD we would like our API to use

Below is a copy of the planning for our backend development we came out with this project.
 
![](https://i.imgur.com/aCunmkx.png)

## Endpoints
Although we had created our own API. We still needed to use other external APIs on our front-end in order to achieve the functionality we wanted such:

1. We use external API from [treffle.io](https://trefle.io/) to fletch the information about the plant.

ENDPOINT from treffle:

https://trefle.io/api/v1/plants/search?token=YOUR_TREFLE_TOKEN&q=strawberry

This is the sample of the data that is retrieved from the endpoint. It returns up to 30 plants in an array 

![](https://i.imgur.com/k8xGLT9.png)



2. We also used the 

### The Backend 

We started developing the backend together through *'Zoom Screenshare'*. Starting with server.js, models (for our data, message and user), router.js and controllers.
For each stage we tested on the ***'terminal'*** and ***'Insomnia'*** to see our codes were written correcting without a bug before moving onto the next task.

Examples of our backend structures, models, router.js and controllers.

![](https://i.imgur.com/nmnFeEPl.png)

Example of the structure of the model/Schema for our data.
![](https://i.imgur.com/LCYIz0el.png)

Example of the routes for adding and editing a plant on the user's profile.
![](https://i.imgur.com/5Pkm0f0l.png) 

Example of how the CRUD functionality is executed on the Backend through the controller.
![](https://i.imgur.com/iNnDxz4m.png)

We call our external API from the Backend
![](https://i.imgur.com/JOFEfX0l.png)

When the user needs to add, update or delete a plant, message or a comment, we created authentication process through ***secure route***. Therefore, a user can only post on the app if they are registered and have logged in on the app and they can only update or delete what they have posted.
Below is the authentication for a user that is logged in.
![](https://i.imgur.com/aWFtlLdl.png)
We used the JSON Web Token (jwt) method to generate authentication.


### The Frontend with React
After creating the fundamental of the Backend, we started working on the Frontend. Because we had initially created a detailed wireframe for this project at the beginning, we were well informed as a team on the functionality we wanted to execute on the frontend.

We briefly went through the components for the frontend and setted it up together through *'Zoom Screenshare'* as shown below.

![](https://i.imgur.com/43hzJtG.png)

We used React hooks, useState and useEffect along with axios to fetch data from our internal API. 

Example of the lines of codes for displaying messages on our message board(*Pin Board*)
![](https://i.imgur.com/OOa80E1l.png)


Example of JSX for mapping the response data for the ***Messages ***

![](https://i.imgur.com/ZujU65ml.png)

We wanted our app to display the location of all the users so that others users is able to see the plant sitter nearby.
For this we use two external APIs:

1. [Postcode.io](https://postcodes.io/) - For grabing the coordinations of the users' locations via their postcode they had provided during the registeration. Below is the code excuted for pulling these coordinates 
 ![](https://i.imgur.com/u5zXhnrl.png)
 
2. [Mapbox](https://www.mapbox.com/) - The location coordination grabed by the [Postcode.io](https://postcodes.io/) is then used by the ***Mapbox*** to renderd on the page as a component with markers to display the users' locations on the map.
![](https://i.imgur.com/WfENjzqm.png)

### Designs and Styling

Styling was an important part in this project as we had to delivered a full-stack application with different functionalities and an impressive design.
We looked at the design for all the features for our app from logo design to colour theme.
Our colleague Enrico providing an excellent design direction for us.

Example of the logo and colour theme design.
![](https://i.imgur.com/ft2vTW5l.png)

## Screenshots
![](https://i.imgur.com/wyTEJrnm.png)
![](https://i.imgur.com/7IMTT8wm.png)

![](https://i.imgur.com/EeRAXGrl.png)
![](https://i.imgur.com/r6qPToBm.png)
![](https://i.imgur.com/aqHwavmm.png)


## Summary


In our group we had to communicate effectively and respect each other's opinions and be supportive as we are all still learning. 
From the beginning we recognised and acknowlegded each other strength, and we worked together effectively, ensuring we communicated regularly about our progress on the project.
Our teams were very professional and by the end of the project, we had put together and deployed an app that I am very proud of. It looks amazing and it is easy to use.
It had been an amazing experience to build our own API and then use it to do so many things on the frontend.


## Contributors


[Rebecca](https://github.com/rebeccaacioadea)

[Laurence](https://github.com/ProDigresser)

[Enrico](https://github.com/bacxhus)

[Rachel](https://github.com/rachel-beale)

