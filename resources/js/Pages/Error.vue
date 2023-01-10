<template>
    <div class="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left dark:bg-gray-900">
        <div class="-intro-x lg:mr-20">
            <img alt="Error Image" class="h-48 lg:h-auto" src="@/../images/error-illustration.svg">
        </div>
        <div class="text-white mt-10 lg:mt-0">
            <div class="intro-x text-6xl font-medium">{{ status }}</div>
            <div class="intro-x text-xl lg:text-3xl font-medium">{{ title }}.</div>
            <div class="intro-x text-lg mt-3">{{ description ?? message }}</div>
            <primary-button class="intro-x mt-6" @click="back">{{ __('Back') }}</primary-button>
        </div>
    </div>
</template>

<script>
import PrimaryButton from "@/Components/PrimaryButton.vue";

export default {
    name: 'Error',
    props: {
        status: Number,
        message: String,
    },
    components: ['PrimaryButton'],
    computed: {
        title() {
            return {
                503: 'Сервис недоступен',
                500: 'Ошибка сервера',
                404: 'Страница не найдена',
                403: 'Запрещено',
            }[this.status]
        },
        description() {
            return {
                503: 'Извините, мы проводим техническое обслуживание. Пожалуйста, попробуйте позже.',
                500: 'Упс, что-то пошло не так на наших серверах.',
                403: 'К сожалению, доступ к этой странице запрещен.',
                404: 'Возможно, вы неправильно ввели адрес или страница переместилась.',
            }[this.status]
        },
    },
    methods: {
        back() {
            window.history.back()
        }
    }
}
</script>
