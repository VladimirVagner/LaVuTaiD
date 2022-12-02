<template>
    <notifications width="350">
        <template #body="props" >
<!--            Нотификация успеха-->
            <template v-if="props.item.type === 'success'">
                <div class="relative flex flex-col sm:flex-row sm:items-center bg-white/40 dark:bg-green-600/40 backdrop-blur-xl border-2 border-green-500/40 shadow rounded-md py-5 pl-6 pr-8 sm:pr-6 mr-2 sm:mr-6 mt-5">
                    <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                        <div class="text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="text-sm dark:text-white font-medium ml-3">{{ props.item.title ?? __('Success') }}</div>
                    </div>
                    <div class="text-sm tracking-wide text-gray-500 dark:text-gray-300 mt-4 sm:mt-0 sm:ml-4">{{ props.item.text ?? '' }}</div>
                    <div @click="props.close" class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                </div>
            </template>

            <!--            Нотификация ошибки-->
            <template v-else-if="props.item.type === 'error'">
                <div class="relative flex flex-col sm:flex-row sm:items-center bg-white/40 dark:bg-red-600/40 border-2 border-red-500/40 backdrop-blur-xl shadow rounded-md py-5 pl-6 pr-8 sm:pr-6 mr-2 sm:mr-6 mt-5">
                    <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                        <div class="text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <div class="text-sm dark:text-white font-medium ml-3">{{ props.item.title ?? __('Error') }}</div>
                    </div>
                    <div class="text-sm tracking-wide text-gray-500 dark:text-gray-300 mt-4 sm:mt-0 sm:ml-4">{{ props.item.text ?? '' }}</div>
                    <div @click="props.close" class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                </div>
            </template>

            <!--            Нотификация информации-->
            <template v-else-if="props.item.type === 'info'">
                <div class="relative flex flex-col sm:flex-row sm:items-center bg-white/40 dark:bg-blue-600/40 border-2 border-blue-500/40 backdrop-blur-xl shadow rounded-md py-5 pl-6 pr-8 sm:pr-6 mr-2 sm:mr-6 mt-5">
                    <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                        <div class="text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>
                        <div class="text-sm dark:text-white font-medium ml-3">{{ props.item.title ?? '' }}</div>
                    </div>
                    <div class="text-sm tracking-wide text-gray-500 dark:text-gray-300 mt-4 sm:mt-0 sm:ml-4">{{ props.item.text ?? '' }}</div>
                    <div @click="props.close" class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                </div>
            </template>

            <!--            Нотификация default-->
            <template v-else>
                <div class="relative flex flex-col sm:flex-row sm:items-center bg-white/40 backdrop-blur-xl shadow rounded-md py-5 pl-6 pr-8 sm:pr-6 mr-2 sm:mr-6 mt-5">
                    <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                        <div class="text-sm dark:text-white font-medium ml-3">{{ props.item.title ?? '' }}</div>
                    </div>
                    <div class="text-sm tracking-wide text-gray-500 dark:text-gray-300 mt-4 sm:mt-0 sm:ml-4">{{ props.item.text ?? '' }}</div>
                    <div @click="props.close" class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                </div>
            </template>
        </template>
    </notifications>
</template>

<script>
export default {
    name: "NotificationGroup",
}
</script>

<style scoped>

</style>
