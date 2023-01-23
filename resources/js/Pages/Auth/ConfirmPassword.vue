<script setup>
import {Head, useForm} from '@inertiajs/inertia-vue3';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => form.reset(),
    });
};
</script>

<template>
    <GuestLayout>
        <Head :title="__('Confirm Password')"/>

        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {{ __('This is a secure area of the application.Please confirm your password before continuing.') }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="password" :value="__('Password')"/>
                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                    autofocus
                />
                <InputError class="mt-2" :message="form.errors.password"/>
            </div>

            <div class="flex justify-end mt-4">
                <Button class-button="primary"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        :loading="form.processing">
                    {{ __('Confirm') }}
                </Button>
            </div>
        </form>
    </GuestLayout>
</template>
