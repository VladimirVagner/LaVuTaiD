<script setup>
import {computed} from 'vue';
import {Head, Link, useForm} from '@inertiajs/inertia-vue3';

const props = defineProps({
    status: String,
});

const form = useForm();

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <GuestLayout>
        <Head :title="__('Email Verification')"/>

        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {{
                __('Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.')
            }}
        </div>

        <div class="mb-4 font-medium text-sm text-green-600 dark:text-green-400" v-if="verificationLinkSent">
            {{ __('A new verification link has been sent to the email address you provided during registration.') }}
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <Button class-button="primary"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        :loading="form.processing">
                    {{ __('Resend Verification Email') }}
                </Button>

                <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="ml-2.5 underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >{{ __('Log Out') }}
                </Link
                >
            </div>
        </form>
    </GuestLayout>
</template>
