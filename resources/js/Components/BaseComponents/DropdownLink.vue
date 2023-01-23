<script setup>
import {computed} from 'vue';
import {Link} from '@inertiajs/inertia-vue3';

const props = defineProps(['active']);

const classes = computed(() =>
    props.active
        ? 'block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out  border-l-4 rounded-l border-indigo-400 dark:border-indigo-600'
        : 'block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out'
);
</script>

<template>
    <Link
        :class="classes">
        <slot/>
    </Link>
</template>
