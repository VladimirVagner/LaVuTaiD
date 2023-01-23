export default {
    methods: {
        /**
         * Локализация перевода полученного ключа,
         * если в файле lang/*.js перевод и в config/app.php установлена необходимая локализация
         * Примеры: __('Hello World!') -> Привет мир!
         *          __('Count = :count', {count: 15}) -> Количество = 15
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
    },
}
