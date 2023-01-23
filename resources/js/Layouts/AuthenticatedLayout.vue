<script setup>
import NavBar from '@/Components/NavBar.vue';
import {Head} from '@inertiajs/inertia-vue3';

const props = defineProps({
    title: {
        type: String,
        default: false,
    }
});
</script>

<template>
    <Head v-if="title">
        <title>{{ __(title) }}</title>
    </Head>

    <div>
        <div class="min-h-screen transition-colors duration-500 bg-gray-100  dark:bg-gray-900 relative">

            <NavBar/>

            <!-- Page Heading -->
            <header class="bg-white dark:bg-gray-800 transition-colors duration-500 shadow" v-if="$slots.header">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header"/>
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <slot/>
            </main>
        </div>
    </div>

    <Notification/>
</template>
