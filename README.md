# memorize-cards

This project was developed as a technical challenge using Next.js.

## Demo

You can visit [this link](https://memorize-cards.vercel.app/) to try a live demo deployed on Vercel.

## How to run (dev)

Start your shell.

Make sure you installed the node packages with
`npm install`

Start development server with
`npm run dev`

## Tests

To execute tests run
`npm run test`

## About

Developed by **Luis Barrientos Fajardo** using
- Next.js 14.0.4
- React 18.2
- Typescript 5.3
- Node 20.9
- Jest 29.7
- testing-library/react 14.1

## Considerations

* DDD architecture.
* CSS Modules pattern.
* Repository pattern.
* ObjectMother test pattern to generate mocks.
* I decided to use only Jest, making unit-tests (components) and integration-tests (pages). Also, I added some tests for domain and infrastructure layer.
* All my code is on `src` folder. `app` and `pages` folders are outside `src` because they belongs to Next.js configuration and routing.
* Images and Fonts are optimized by Nextjs.
* I consider that some React performance features like useMemo, useCallback and Lazy components are unnecessary at this level.
* I consider that UI libraries like Tailwind, Material or Bootstrap are unnecesary because all components are hand-crafted.
* I prefer the use of Typescript over Javascript Vanilla beacuse typing provides me more security to develop robust and scalable software.

## Posible improvements

* Difficulty-selector screen (changes number images received from API).
* Highscore-by-name screen.
* Add multiple language support.
* Better error handling.
* Better alt names for card images (screen reading).
* Better card-back image.
* Add storybook for components documentation.
* Add more validations on domain layer (example: url or uuid format)
* More UI details (hints, animations, better texts)
* Improve ESLint configuration.
* Maybe add sound effects.
