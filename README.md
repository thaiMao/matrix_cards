# Matrix Cards

## Building and running on localhost

First install dependencies:

```sh
yarn
```

To run in hot module reloading mode and start up a mock JSON REST API server:

```sh
yarn start
```

To create a production build:

```sh
yarn run build-prod
```

## Browser Support

Works on latest versions of Chrome, Firefox and Edge browsers (see "browserslist" in package.json),

## Instructions

Clicking on an image will render an overlay with the selected image centered.
Pressing escape will return back to the the list of cards.

Dragging a card on top of a target card will give the user the option to drop a dragged card in place of the target card to re-order the list.

Note when dragging up or down, the dragged card is only dropable when the cursor moves beyond 50% of the height of the target card.
