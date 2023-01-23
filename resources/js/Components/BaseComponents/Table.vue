<script setup>
import {useDateFormat} from '@vueuse/core'

defineProps({
    data: {
        type: Array,
        required: true,
        default: false,
    },
    actions: {
        type: Boolean,
        default: false
    },
    columns: {
        type: Object,
        required: true,
        default: {
            id: 'ID',
            title: 'Title'
        }
    },
    title_button_create: {
        type: String,
        default: ''
    }
})
defineEmits(['create', 'show', 'edit', 'delete'])

</script>
<template>
    <div class="mx-auto w-fit max-w-full py-6">
        <Button
            classButton="primary"
            @click="$emit('create')">
            {{ __('Create') + ' ' + title_button_create }}
        </Button>

        <div class="overflow-x-auto">
            <table class="table-auto" :columns="Object.keys(columns).length" data="">
                <thead class="border-b">
                <tr>
                    <th v-for="column in columns" scope="col"
                        class="text-md text-center text-gray-900 dark:text-gray-300 px-6 py-4 text-left">
                        {{ __(column) }}
                    </th>
                    <th v-if="actions" scope="col"
                        class="text-md text-center text-gray-900 dark:text-gray-300 px-6 py-4 text-left">
                        {{ __('Actions') }}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item) in data" class="border-b hover:bg-gray-200 dark:hover:bg-gray-800">
                    <td v-for="(column ,key) in columns"
                        class="text-sm text-center text-gray-900 dark:text-gray-300  font-light px-6 py-4 whitespace-nowrap">
                        {{ Date.parse(item[key]) ? useDateFormat(item[key], 'DD MMM YYYY HH:mm').value : item[key] }}
                    </td>
                    <td v-if="actions"
                        class="text-sm text-gray-900 dark:text-gray-300 font-light px-6 py-4 whitespace-nowrap">
                        <div class="flex justify-end">
                            <Button type="button"
                                    classButton="show"
                                    @click="$emit('show', item)"
                            >
                                {{ __('Show') }}
                            </Button>
                            <Button type="button"
                                    classButton="edit"
                                    @click="$emit('edit', item)"
                            >
                                {{ __('Edit') }}
                            </Button>
                            <Button
                                classButton="delete"
                                @click="$emit('delete', item)"
                            >
                                {{ __('Delete') }}
                            </Button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
