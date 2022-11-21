# RoverMars
Api to resolve Mars Exploration using rovers

#Use cases:
1. Full Move Rover: create plateau to be explored by rover, create and deploy rover on plateau and move following instructions inputed.
2. Move rover(new): select rover by Id and move using instructions inputed.
3. Deploy Rover(new): create and deploy rover in already created plateau, besides that, move rover.
4. Get plateau data(new): get plateau and rover data include.

#How run tests:
1. npm install
2. npx jest (run unit and integration tests)

#How run project:
1. npm install
2. npm knex:migrate (run migrations to build plateau and rover tables on SQLite DB.)
3. npm run dev (run API)
4. send request to API
5. connect to SQLite
