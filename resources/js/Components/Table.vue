<script setup>
import { useDateFormat } from '@vueuse/core'
import { Link } from '@inertiajs/inertia-vue3'

const props = defineProps({
    data: {
        type: Array,
        default: false,
    },
    head: {
        type: Array,
        default: false
    },
    actions: {
        type: Boolean,
        default: false
    },
    edit_route_name: {
        type: String,
        default: false,
    },
    delete_route_name: {
        type: String,
        default: false,
    },
    rows: {
        type: Array,
        default: false
    },
    date_format: {
        type: String,
        default: 'DD.MM.YYYY HH:mm:ss'
    }
});
const date = (date, format) => {
    let new_date = useDateFormat(date, format)
    return new_date.value
}
const string = (string) => {
    return string
}
const switch_row = (type_row, item, date_format) => {
    switch (type_row) {
        case 'date':
            return date(item, date_format)
        case 'string':
            return string(item)
        default:
            return item

    }
}
</script>

<template>
    <table class="table-auto w-full">
                        <thead v-if="head" class="border-b">
                        <tr>
                            <th v-for="item in head" scope="col" class="text-md text-center text-gray-900 dark:text-gray-300 px-6 py-4 text-left">
                                {{ __(item) }}
                            </th>
                            <th v-if="actions" scope="col" class="text-md text-center text-gray-900 dark:text-gray-300 px-6 py-4 text-left">
                                {{ __('Actions') }}
                            </th>
                        </tr>
                        </thead>
                        <tbody v-if="rows">
                        <tr v-for="(item, key) in data" :key="'table-tr-key-'+key" class="border-b hover:bg-gray-200 dark:hover:bg-gray-800">
                            <td v-for="row in rows" class="text-sm text-center text-gray-900 dark:text-gray-300  font-light px-6 py-4 whitespace-nowrap">
                                {{ switch_row(row.type, item[row.name], date_format) }}
                            </td>
                            <td v-if="actions" class="text-sm text-gray-900 dark:text-gray-300 font-light px-6 py-4 whitespace-nowrap">
                                <div class="flex justify-end">
                                    <Link type="button" v-if="edit_route_name"
                                          class="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                          :href="route(edit_route_name, item.id)"
                                    >
                                        {{ __('Edit') }}
                                    </Link>
                                    <Link type="button" v-if="delete_route_name"
                                          class="py-2 px-3 ml-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                          :href="route(delete_route_name, item.id)"
                                          method="delete"
                                    >
                                        {{ __('Delete') }}
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
</template>
