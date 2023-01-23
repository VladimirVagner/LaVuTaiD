<script setup>
import {computed, ref} from 'vue';

const props = defineProps({
    align: {
        default: 'right',
    },
    width: {
        default: '48',
    },
    contentClasses: {
        default: () => ['py-1', 'bg-white dark:bg-gray-700'],
    },
});

const widthClass = computed(() => {
    return {
        48: 'w-48',
        full: 'w-full',
    }[props.width.toString()];
});

const alignmentClasses = computed(() => {
    if (props.align === 'left') {
        return 'origin-top-left left-0';
    } else if (props.align === 'right') {
        return 'origin-top-right right-0';
    } else {
        return 'origin-top';
    }
});

const openDropdown = ref(false);
</script>

<template>
    <div class="relative">
        <div @click="openDropdown = !openDropdown" class="h-full">
            <slot name="trigger"/>
        </div>

        <!-- Full Screen Dropdown Overlay -->
        <div v-show="openDropdown" class="fixed inset-0 z-40" @click="openDropdown = false"></div>

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div
                v-show="openDropdown"
                class="absolute z-50 mt-2 rounded-md shadow-lg"
                :class="[widthClass, alignmentClasses]"
                style="display: none"
                @click="openDropdown = false"
            >
                <div class="rounded-md ring-1 ring-black ring-opacity-5" :class="contentClasses">
                    <slot name="content"/>
                </div>
            </div>
        </transition>
    </div>
</template>
