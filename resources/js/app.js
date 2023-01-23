import './bootstrap';
import '../css/app.css';

import {createApp, h} from 'vue';
import {createInertiaApp} from '@inertiajs/inertia-vue3';
import {InertiaProgress} from '@inertiajs/progress';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from '../../vendor/tightenco/ziggy/dist/vue.m';
import Notifications from '@kyvg/vue3-notification'
import localization from "@/localization";

import ApplicationLogo from '@/Components/BaseComponents/ApplicationLogo.vue';
import ThemeButton from '@/Components/ThemeButton.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputLabel from '@/Components/BaseComponents/InputLabel.vue';
import InputError from '@/Components/BaseComponents/InputError.vue';
import TextInput from '@/Components/BaseComponents/TextInput.vue';
import ResponsiveNavLink from "@/Components/BaseComponents/ResponsiveNavLink.vue";
import NavLink from "@/Components/BaseComponents/NavLink.vue";
import Button from '@/Components/BaseComponents/Button.vue';
import Checkbox from '@/Components/BaseComponents/Checkbox.vue';
import Dropdown from '@/Components/BaseComponents/Dropdown.vue';
import DropdownLink from '@/Components/BaseComponents/DropdownLink.vue';
import Modal from "@/Components/BaseComponents/Modal.vue";
import Table from "@/Components/BaseComponents/Table.vue";
import Notification from "@/Components/BaseComponents/Toaster.vue";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({el, app, props, plugin}) {

        const VueApp = createApp({render: () => h(app, props)});

        VueApp.config.globalProperties.$appName = `${appName}`;

        VueApp.use(plugin)
            .use(ZiggyVue)
            .use(Notifications)
            .mixin(localization)
            .component('ApplicationLogo', ApplicationLogo)
            .component('ThemeButton', ThemeButton)
            .component('GuestLayout', GuestLayout)
            .component('AuthenticatedLayout', AuthenticatedLayout)
            .component('InputLabel', InputLabel)
            .component('TextInput', TextInput)
            .component('InputError', InputError)
            .component('NavLink', NavLink)
            .component('ResponsiveNavLink', ResponsiveNavLink)
            .component('Button', Button)
            .component('Checkbox', Checkbox)
            .component('Dropdown', Dropdown)
            .component('DropdownLink', DropdownLink)
            .component('Modal', Modal)
            .component('Table', Table)
            .component('Notification', Notification)
            .mount(el);

        return VueApp;

    },
});

InertiaProgress.init({color: '#4B5563'});
