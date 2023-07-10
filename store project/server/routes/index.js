import Router from 'express';

import { usersRoutes } from './user.routes.js';
import { productRoutes } from './productRoutes.js';
import { cartRoutes  } from './CartRoutes.js';
import { cartItemRoutes } from './CartItemRoutes.js';



const api = Router();

// http://localhost:4242/api/user ....
api.use('/products', productRoutes);
api.use('/user', usersRoutes);


api.use('/carts', cartRoutes );
api.use('/cart-item', cartItemRoutes );

export { api };
