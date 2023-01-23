<script setup>
import CheckIcon from "@/Components/BaseComponents/SvgIcons/CheckIcon.vue";
import WarningIcon from "@/Components/BaseComponents/SvgIcons/WarningIcon.vue";
import InfoIcon from "@/Components/BaseComponents/SvgIcons/InfoIcon.vue";
import CloseIcon from "@/Components/BaseComponents/SvgIcons/CloseIcon.vue";

const backgroundStyle = {
    success: 'dark:bg-green-600/40 border-green-500/40',
    error: 'dark:bg-red-600/40 border-red-500/40',
}
const textStyle = {
    success: 'text-green-500',
    error: 'text-red-500',
}
</script>

<template>
    <notifications>
        <template #body="props">
            <div class="bg-white/40 border-2 rounded-md py-2 px-3 mr-6 mt-3"
                 :class="backgroundStyle[props.item.type] ?? 'dark:bg-blue-600/40 border-blue-500/40'">
                <div class="grid grid-cols-8 items-center border-b pb-2 pl-3">
                    <div :class="textStyle[props.item.type] ?? 'text-blue-500'">
                        <CheckIcon v-if="props.item.type === 'success'"/>
                        <WarningIcon v-else-if="props.item.type === 'error'"/>
                        <InfoIcon v-else/>
                    </div>
                    <div class="col-span-6 text-sm dark:text-white font-medium">
                        {{ __(props.item.title) ?? '' }}
                    </div>
                    <div class="flex justify-end text-gray-400 hover:text-gray-800 cursor-pointer">
                        <CloseIcon @click="props.close"/>
                    </div>
                </div>
                <div class="text-sm tracking-wide text-gray-500 dark:text-gray-300 mt-1.5">
                    <p v-if="typeof props.item.text === 'object' && props.item.text !== null"
                       v-for="text in props.item.text">
                        {{ __(text) }}
                    </p>
                    <p v-else>
                        {{ __(props.item.text) ?? '' }}
                    </p>
                </div>
            </div>
        </template>
    </notifications>
</template>
