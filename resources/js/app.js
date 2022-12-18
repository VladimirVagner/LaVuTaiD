import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import helpers from "./helpers";
import Notifications from '@kyvg/vue3-notification'
import Modal from "@/Components/Modal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue"
import PrimaryButton from "@/Components/PrimaryButton.vue"
import Table from '@/Components/Table.vue';
import ModalCrud from '@/Components/ModalCrud.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, app, props, plugin }) {

        const VueApp = createApp({ render: () => h(app, props) });

        VueApp.config.globalProperties.$appName = `${appName}`;
        VueApp.config.globalProperties.$tbpHost = 'https:\\\\tovarbezpereplat.ru';

        VueApp.use(plugin)
            .use(ZiggyVue)
            .use(Notifications)
            .mixin(helpers)
            .component('AuthenticatedLayout', AuthenticatedLayout)
            .component('Modal', Modal)
            .component('SecondaryButton', SecondaryButton)
            .component('PrimaryButton', PrimaryButton)
            .component('Table', Table)
            .component('ModalCrud', ModalCrud)
            .mount(el);

        return VueApp;

    },
});

InertiaProgress.init({ color: '#4B5563' });
