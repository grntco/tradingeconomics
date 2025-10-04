# Aircraft and Spacecraft Exports Comparer

**Date:** 10-04-25

A web application comparing aircraft and spacecraft exports between two countries with Comtrade data from Trading Economics, built for an application for a web developer role at Trading Economics. 

## Installation and Getting Started

Navigate to the project directory and run `npm install` to install dependencies:

```
cd nodejs/aircraft-exports/
npm install
```

Create a .env file in the project and add a Trading Economics `API_KEY` environment variable. You can optionally add a `PORT` variable as well:

```
touch .env
```

```
# .env file
API_KEY=your_trading_economics_api_key
PORT=3000
```

Run `npm run dev` to start the server and visit [http://localhost:3000/](http://localhost:3000/) in your browser. (You may need to change the port number if you did so in your .env file.) 

On the website, use the form to select two countries to compare their aircraft and spacecraft exports.

## Project Details

This project allows a user to compare the aircraft and spacecraft exports from two countries. There are three sections displaying the following data:

1. Each country's total world exports in this category (a chart)
2. Each country's exports in this category to the other country (a chart)
3. The top 20 countries receiving exports in this category from the two countries selected (a table)

### Tech Stack

I used Node.js/Express to build this project, with EJS for templating. To create the custom charts, I used the [Chart.js](https://www.chartjs.org/). 

### API

Since this is a Node.js project, I was able to use the Trading Economics npm package. I used the method `getCmtCountryByCategory` to retrieve comtrade data by country name, type ('export') and category ('aircraft, spacecraft'). In the page request controller for the webpage, this method is called twice, once for each country to be compared, with a 1 second buffer in between due to the 1-call-per-second API rate limit. The data received from Trading Economics is then normalized into objects the EJS views can interpret.