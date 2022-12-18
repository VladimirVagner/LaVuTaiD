/**
 * Если указан параметр links, то меню создается с Dropdown элементом
 * В routes передается корень REST маршрутов GET laravel
 * (например для маршрутов routes.index routes.edit, routes.show, routes.create корнем является routes)
 * подробнее см функцию routeActive в MenuLayout.vue
 * Для ограничения отображения пунктов меню используются разрешения laravel, которые пробрасываются в переменную can
 * необходимо добавить значение permission на маршруте равное разрешению, на dropdown меню разрешения смотрятся по детям
 */
export const MENU = [
    {
        name: 'Dashboard',
        route: 'dashboard',
    },
    {
        name: 'Management',
        links: [
            {
                name: 'Roles',
                routes: 'roles',
                permission: 'role-list'
            },
        ]
    },
]
