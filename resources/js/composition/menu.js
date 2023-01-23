/**
 * Пункты меню отображаемые в навигации NavBar возможные типы link и dropdown
 * В route указывается namespace laravel маршрута
 * */
export function useMenu() {
    return [
        {
            type: 'link',
            title: 'Dashboard',
            route: 'dashboard'
        },
        {
            type: 'dropdown',
            title: 'Management',
            child: [
                {
                    title: 'Users',
                    route: 'roles.index'
                },
                {
                    title: 'Roles',
                    route: 'roles.index'
                },
            ]
        }
    ];
}
