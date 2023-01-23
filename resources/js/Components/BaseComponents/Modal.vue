<script setup>
import {computed, onMounted, onUnmounted, watch} from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    position: {
        type: String,
        default: 'center'
    }
});

const emit = defineEmits(['close']);

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    }
);

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
    }[props.maxWidth];
});

const PositionClass = computed(() => {
    return {
        center: '',
        left: 'lg:mr-20 mt-32',
    }[props.position];
});

const TransformClass = computed(() => {
    return {
        center: 'translate-y-4 sm:translate-y-0',
        left: 'translate-x-full',
    }[props.position];
});
</script>

<template>
    <teleport to="body">
        <transition leave-active-class="duration-200" appear>
            <div v-show="show" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50">
                <transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    appear
                >
                    <div v-show="show" class="fixed inset-0 transform transition-all" @click="close">
                        <div class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"/>
                    </div>
                </transition>

                <transition
                    enter-active-class="ease-out duration-300"
                    :enter-from-class="TransformClass+' opacity-0 sm:scale-95'"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    :leave-to-class="TransformClass+' opacity-0 sm:scale-95'"
                    appear
                >
                    <div
                        v-if="show"
                        class="mb-6 px-4 rounded-lg translate-x backdrop-blur-sm bg-white/70 dark:bg-gray-800/60 overflow-hidden shadow-xl transform transition-all sm:w-full mx-auto"
                        :class="maxWidthClass+' '+PositionClass"
                    >
                        <slot/>
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>
