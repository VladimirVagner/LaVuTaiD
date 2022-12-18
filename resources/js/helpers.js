// Миксины
import {useNotification} from "@kyvg/vue3-notification";

export default {
    methods: {
        /**
         * Локализация перевода полученного ключа
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
        /**
         * Добавление уведомления на экран пользователя
         */
        addNotification(item) {
            useNotification().notify(item)
        },

        /**
         * Проверка может ли пользователь выполнять полученное действие
         */
        checkUserCan(permission, can) {
            if(typeof permission === 'object')
                return permission.some((el) => Object.values(can).includes(el.permission) || !el.permission)
            if (permission)
                return Object.values(can).includes(permission)
            return true
        },
    },
}
