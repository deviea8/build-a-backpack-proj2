# Build a Backpack (Project Two)

## Application Name: Build a Backpack

A web app that enables organizations to run and manage backpack drives, all online.

[Heroku Link] (https://sleepy-headland-48709.herokuapp.com/)

[GitHub Repo] (https://github.com/deviea8/build-a-backpack-proj2)


## App Overview

Backpack drives are an important and meaningful way to collect donated backpacks and school supplies for students in a community whose families can't afford supplies that equip them to do well in school. 

Companies, schools, and other organizations often run backpack drives, but the typical ask is for participants to take a list of needed supplies, go to the store and purchase the backpacks and supplies independently, then drop off the items in a physical donation box. The problem is, people are busy and forget to purchase supplies due to the time involved. Not to mention the fact that it may be difficult or inconvenient to bring the supplies back to the donation box. Organizers are left trying to coordinate and manage how many supplies they've collected.

Build a Backpack aims to make the process of running a backpack drive simple, by making them digital.

Here's how it works:
1) Organizers create a backpack drive on behalf of their organization
2) Organizers create a 'Drive Manager' account, which gives them access to their organization's backpack drive dashboard
3) Participants sign up, indicating which organization they are a part of
4) Participants build a backpack online, deciding which supplies and quantity of each they want to include. They also select their backpack color and add a personal note to the recipient.
5) Organizers can log in to their account and see an up-to-date list of all participants' backpacks from their organization on their dashboard.
6) Organizers can then purchase all supplies needed for the created backpacks and follow up with participants to collect payment.


## Technologies/Frameworks/Packages used

* HTML5
* CSS
* JavaScript
* jQuery
* Node.js
* Express.js
* MongoDB.js
* Mongoose
* BodyParser
* MethodOverride

## Approach Taken

I began the project really thinking about how to structure my databases and schemas since this app has 3 separate controllers (organizations, users, and backpacks). I wireframed the user flow, carefully considering dependencies at each step. I decided that for ease of use, organizations should be required to be created prior to user signup. This ensures that all users are members of an organization. From there, I started by building the backpack CRUD methods/user flow first ("MVP" version). Then as I added new controllers to the mix, I refactored the prior code to tie everything together. Last, I styled the web app and created a home page.


## Future goals / unsolved features:

* Calculate price dynamically based on backpack contents
* Use authentication to ensure that admins can only view the dashboard for THEIR organization
* Dropdown for backpack color on edit page (currently a text field)
* Require a unique email address during signup (duplicates are currently allowed)
* Incorporate a shopping cart / checkout so that participants can buy the backpacks they've created right then and there
* Put limits on the maximum and minimum number of items that need to be included in each backpack (to ensure that all backpacks have similar value)


## User Stories

[View Trello Board](https://trello.com/b/TUAhdoKR/build-a-backpack)

## Entity Relationship Diagrams (Database Modeling)

[View ERD](https://drive.google.com/file/d/0B9y_Lq3LVbmyNGVaZFVEUXpKaEE/view?usp=sharing)

## Wireframes

[View Wireframes](https://drive.google.com/file/d/0B9y_Lq3LVbmyY1N6RjlCU0RabTA/view?usp=sharing)

## Portfolio Site
My portfolio site has been updated to include a link to Build a Backpack.
[View Portfolio Site](https://htmlpreview.github.io/?https://github.com/deviea8/portfolio-site/blob/master/index.html)


