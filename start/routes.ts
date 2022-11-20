/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/auth/login', 'AuthController.doLogin');
  Route.get('/auth/logout', 'AuthController.doLogout').middleware('auth')
  Route.group(() => {
    Route.get('/', 'CategoriesController.getAll')
    Route.post('/', 'CategoriesController.store')
    Route.put('/:id', 'CategoriesController.update')
    Route.delete('/:id', 'CategoriesController.delete')
  }).prefix('category')
  Route.group(() => {
    Route.get('/', 'MastersController.getAll')
    Route.post('/', 'MastersController.store')
    Route.get('/:id', 'MastersController.show')
    Route.put('/:id', 'MastersController.update')
    Route.delete('/:id', 'MastersController.delete')
  }).prefix('master')
}).prefix('api/v1')
