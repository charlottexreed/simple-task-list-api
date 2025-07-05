# Simple Task List Api

A minimal GraphQL API to do basic interactions with tasks

## Features

- Create tasks
- Toggle tasks to completed or not completed
- Get all or a specific task
- Delete tasks
- Extra: Update task title

## Getting the API up and running

1. Clone this repository
2. Install Node.js if you haven't already and type the command:
```
npm install
```
3. Generate the prisma client and pothos types:
```
npx prisma generate
```
4. Migrate the schema to a local SQLite database using whatever name you wish (in place of [migration-name]):
```
npx prisma migrate dev --name [migration-name]
```
5. Run the project:
```
npm run dev
```
6. You can now use your new GraphQL API by accessing:
```
http://localhost:4000/graphql
```

### How would I deal with more complex error scenarios
In order to deal with increased complexity of the app and the errors that come with it I would create different error classes
and throw said errors instead of returning null. I would also log them so it is easier to understand what went wrong where.
