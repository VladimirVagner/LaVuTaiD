<script setup>

import {useForm} from "@inertiajs/inertia-vue3";
import InputLabel from "@/Components/InputLabel.vue"
import InputError from "@/Components/InputError.vue"
import TextInput from "@/Components/TextInput.vue"
import PrimaryButton from "@/Components/PrimaryButton.vue"
import Checkbox from "@/Components/Checkbox.vue"
import {computed, watch} from "vue";

const props = defineProps({
    role: {
        type: Object,
        default: () => {}
    },
    permissions: {
        type: Array,
        default: () => []
    }
});
const permissionType = ['user', 'role']
const emit = defineEmits(['role:touched', 'save:success']);

const permissionsWithCheckRolePermission = computed( () =>
        props.permissions.map((permission) => {
            if (route().current() === 'roles.create')
                return {id: permission.id, name: permission.name, checked: false}
            let checked = props.role.permissions.some(function (el) {
                return permission.id === el.id
            })
            return {id: permission.id, name: permission.name, checked: checked}
        }));
const form = useForm({
    name: props.role ? props.role.name : '' ,
    permissions: permissionsWithCheckRolePermission.value
},);

const submit = () => {
    if (route().current() === 'roles.edit')
        form.patch(route('roles.update', props.role.id), {
            onSuccess: () => emit('save:success'),
        });
    if (route().current() === 'roles.create')
        form.post(route('roles.store'), {
            onSuccess: () => emit('save:success'),
        });
};

watch(form.permissions, () => emit('role:touched'))

</script>

<template>
    <div class="p-3">
        <h3 class="text-3xl p-2 text-center dark:text-gray-100">{{ __('Role Edit') }}</h3>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="name" :value="__('Title')" />
                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full backdrop-blur-sm bg-white/20"
                    v-model="form.name"
                    @update:modelValue="$emit('role:touched', true)"
                    required
                    autofocus
                />
                <InputError class="mt-2" :message="form.errors.name" />
            </div>
            <div class="grid grid-cols-3 gap-3 mt-6" >
                <div v-for="type in permissionType">
                    <h5 class="text-2xl text-gray-800 dark:text-gray-400 font-bold capitalize">{{ __(type) }}</h5>
                    <label class="flex items-center sm:w-fit" v-for="(permission, key) in form.permissions">
                        <div v-if="permission.name.includes(type)">
                            <Checkbox :key="permission.id"
                                      v-model:checked="form.permissions[key].checked"
                            ></Checkbox>
                            <span class="ml-2 text-sm text-gray-800 dark:text-gray-400">{{ __(permission.name) }}</span>
                        </div>
                    </label>
                </div>
            </div>
            <div class="flex items-center justify-end mt-4">

                <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{ route().current() === 'roles.edit' ? __('Edit') : __('Create') }}
                </PrimaryButton>
            </div>
        </form>
    </div>

</template>
