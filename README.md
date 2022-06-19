# Navagis Test

A `React`-based single page application that uses `Google Maps API` to display various map data and analytics.

# Dependencies

- `Node 16.15.1` - The LTS version of `Node` the time of writing. A `.tool-versions` file has been
  included for easy integration with [asdf](https://asdf-vm.com).
- [Classic Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

## Local Setup

- Install the dependencies
- Run `yarn install`

### Running the Development Server

- Run `yarn start`

### Run the tests

- Run `yarn test`

# Tech Stack

## React

[src](https://reactjs.org/)

I decided to use `React` since it will be faster to create a dynamic application using it's core libraries and features.

## React Google Maps API

[src](https://github.com/JustFly1984/react-google-maps-api)

This is convenience wrapper around the `Map JavaScript SDK` so that it easily blends in with `React`.

## Use Places Autocomplete

[src](https://github.com/wellyshen/use-places-autocomplete)

I am using this for the `places search` functionality that is needed when a user signs in to the website and must provide a home address.

## Chakra UI

[src](https://chakra-ui.com/)

For easily boostrapping various UI components.

# Testing

All `custom hooks` were _unit tested_ using `Jest`.

# Completed Features

- [x] Plot restaurants across Cebu
- [x] Restaurants have at least one specialty.
- [x] Each restaurant can track the number of customers that visited.
- [x] Customers can get directions to the restaurant from the current location. _(For this one, we are assuming that customers are staying on their home address which is given during sign in)_
- [x] Value adding analytics _(For this project, we can track the approval rate of the restaurants since customers are able to give ratings to their visits)_
- [x] Draw a circle or rectangle on the map and show the number of restaurants within the circle or rectangle. _(For this one, only circles are allowed to be drawn on screen. Intersection was calculated using builtin google api functions concerned with distances between LatLngLiterals)_

# Unfinished Features

- [ ] A layer panel can filter the restaurant type to show. _(An initial function was already implemented for filtering but was not attached to the UI because of time constraints)_

# Application Design

## Map

The base map that this web app uses was customized using Google's own map studio. The modifications
that were made are:

- Colors
- Remove the default icons that renders on the map

## Restaurants

Instead of using the actual `google places` API for fetching the places in `Cebu City`, I decided to
just load my own set of pre-determined imaginary restaurants and render them using the builtin `Marker`
component that the `API` provides.

## Providers

Since this project will be deployed to `github pages` and must be _server less_, I decided to emulate `server-side` API
calls through the use of `React` context and providers. Each provider represents a `service` in a `microservice` architecture.
Persistence was achieved through `localStorage`.

Here are the providers implemented for this web app:

### Users

Handles a _pseudo authentication_ in which there must be a user that is signed in. We are just storing the `username` and
the `home address` of the user.

After _signing in_, you can now use the app features and add your visits to the different places. If you want to sign in as a
different user, just refresh the page. Your previous visits are persisted. A _log out action_ was already implemented but was not
attached to the UI because of time constraints.

### Places

Stores the restaurants and has some search functionalities that we can user in our components.

### Visits

Main provider that handles the different simple analytics related to the visits each restaurant has.

### Circle

Controls the circle that appears in the UI. Ensures that only one `circle` at most can be present at any given time.

# Challenges

- There was an issue with `React.StrictMode` at first that prevents `Markers` from appearing on the map. Disabling
  `StrictMode` fixes this issue.

- Since we are going server less, the only way to hide my `Maps API key` is by using environment variables. But since these variables are still
  bundled during build time, there are still some exploits that can me made to abuse the api key. The solution for this one is to limit the `domain names`
  that can use the `API key`. Thankfully, `Google's console` already handles this.

# Known Bugs

There are some minor bugs discovered, but they don't really affect the core functionality:

- The `InfoMarkers` when closed do not re appear unless the page is refreshed.
