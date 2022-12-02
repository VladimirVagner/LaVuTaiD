// Миксины
import {useNotification} from "@kyvg/vue3-notification";

export default {
    methods: {
        /**
         * Локализация
         * Перевести полученный ключ
         */
        __(key, replace = {}) {
            let translation = this.$page.props.language[key]
                ? this.$page.props.language[key]
                : key

            Object.keys(replace).forEach(function (key) {
                translation = translation.replace(':' + key, replace[key])
            });

            return translation
        },

        addNotification(item) {
            useNotification().notify(item)
        },
    },
}
