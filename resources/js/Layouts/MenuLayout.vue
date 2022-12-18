<template>
    <template v-for="navLink in MENU">
        <template v-if="navLink.links">
            <Dropdown v-if="checkUserCan(navLink.links, can)"
                      align="left"
                      :class="classItemMenuInDropdown(navLink.links)">
                <template #trigger>
                    <button class="h-full">{{ __(navLink.name) }}</button>
                </template>
                <template #content>
                    <template v-for="link in navLink.links">
                        <DropdownLink v-if="checkUserCan(link.permission, can)"
                                      :href="route(link.routes+'.index')"
                                      :active="routeActive(link.routes)">
                            {{ __('Roles') }}
                        </DropdownLink>
                    </template>
                </template>
            </Dropdown>
        </template>

        <component v-else-if="checkUserCan(navLink.permission, can)"
                   :is="component"
                   :href="route(navLink.route)"
                   :active="route().current(navLink.route)">
            {{ __(navLink.name) }}
        </component>

    </template>
</template>

<script>
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import { MENU } from '@/menu-items';

export default {
    name: "MenuLayout",
    props: ['component', 'can'],
    components: {
        NavLink,
        ResponsiveNavLink,
        Dropdown,
        DropdownLink
    },
    setup(props) {

        /**
         * Компановка стилей элемента меню для тригера Dropdown
         * в зависимости от разрешения экрана и активности маршрута
         */
        const classItemMenuInDropdown = (links) => {
            if (props.component === 'NavLink')
                return routeActive(links) ?
                    'items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out border-b-2 border-indigo-400 dark:border-indigo-600'
                    : 'items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
            if (props.component === 'ResponsiveNavLink')
                return routeActive(links) ?
                    'w-full pl-3 pr-4 py-2 border-l-4 border-indigo-400 dark:border-indigo-600 text-left text-base font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 focus:outline-none focus:text-indigo-800 dark:focus:text-indigo-200 focus:bg-indigo-100 dark:focus:bg-indigo-900 focus:border-indigo-700 dark:focus:border-indigo-300 transition duration-150 ease-in-out'
                    : 'w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out'
        }

        /**
         * Проверка активности маршрута по ключевой основе
         */
        const routeActive = (el) => {
            switch (typeof el) {
                case "object":
                    return el.some((link) => route().current(link.routes+'.index')
                        || route().current(link.routes+'.create')
                        || route().current(link.routes+'.show')
                        || route().current(link.routes+'.edit'))
                case "string":
                    return route().current(el+'.index')
                        || route().current(el+'.create')
                        || route().current(el+'.show')
                        || route().current(el+'.edit')
            }
        }

        const userCan = () => console.log(props.auth)

        return {
            MENU,
            classItemMenuInDropdown,
            routeActive,
            userCan
        }
    }
}
</script>
