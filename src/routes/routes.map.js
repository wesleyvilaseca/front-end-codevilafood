import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Cart from '@/pages/Cart';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import MyOrders from '@/pages/MyOrders';
import DetailOrder from '@/pages/DetailOrder';
import TableCompany from '@/pages/TableCompany';
import PageNotFound from '@/pages/PageNotFound';

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultTemplate'),
        children: [
            {
                path: '/',
                component: Home,
                name: 'home',
                meta: {
                    title: 'Home'
                }
            },
            {
                path: '/loja/:companyFlag',
                component: Products,
                name: 'products',
                props: true,
                meta: {
                    title: 'Loja'
                }
            },
            {
                path: '/carrinho',
                component: Cart,
                name: 'cart',
                meta: {
                    title: 'Carrinho'
                }
            },
            {
                path: '/meus-pedidos',
                component: MyOrders,
                name: 'my.orders',
                meta: {
                    title: 'Pedidos'
                }
            },
            {
                path: '/pedido/:identify',
                component: DetailOrder,
                name: 'detail.order',
                props: true,
                meta: {
                    title: 'Detalhes do pedido'
                }
            },
            {
                path: '/:token_company/:token_table',
                component: TableCompany,
                name: 'table.company',
                props: true,
                meta: {
                    title: 'Table'
                }
            },

        ]
    },

    {
        path: '/',
        component: () => import('@/layouts/AuthTemplate'),
        children: [
            {
                path: '/login',
                component: Login,
                name: 'login',
                meta: {
                    title: 'Login'
                }
            },
            {
                path: '/register',
                component: Register,
                name: 'register',
                meta: {
                    title: 'Registrar'
                }
            }
        ]
    },

    {
        path: '*',
        component: PageNotFound,
        meta: {
            title: '404'
        }
    }
];

export default routes;