<template>
    <div>
        <h1>{{ title }}</h1>
        <div>{{ description }}</div>
    </div>
</template>

<script>
export default {
    name: 'Error',
    props: {
        status: Number,
        message: String,
    },
    computed: {
        title() {
            return {
                503: '503: Сервис недоступен',
                500: '500: Ошибка сервера',
                404: '404: Страница не найдена',
                403: '403: Запрещено',
            }[this.status]
        },
        description() {
            return {
                503: 'Извините, мы проводим техническое обслуживание. Пожалуйста, попробуйте позже.',
                500: 'Упс, что-то пошло не так на наших серверах.',
                403: 'К сожалению, доступ к этой странице запрещен.',
            }[this.status]
        },
    },
}
</script>
