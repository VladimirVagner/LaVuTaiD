<script setup>
import {useRole} from "@/composition/role";
import {useModal} from "@/composition/modal";

const props = defineProps({
    item: {
        id: Number,
        name: String,
        created_at: Date,
        updated_at: Date,
        permissions: {
            type: Array
        }
    },
    permissions: {
        type: Array,
        default: () => []
    }
});

const permissionType = [
    'user',
    'role'
]

const {role, processing, update, store} = useRole(props.item)
const {openModal, closeModal} = useModal()
const submit = () => {
    if (route().current('roles.create'))
        store(role).then(() => closeModal()).catch(() => {
        })
    if (route().current('roles.edit'))
        update(role).then(() => closeModal()).catch(() => {
        })
};

</script>

<template>
    <Modal :show="openModal" position="left" @close="closeModal(route('roles.index'))">
        <div class="p-3">
            <h3 class="text-3xl p-2 text-center dark:text-gray-100">
                {{ role ? __('Edit role') : __('Create role') }}
            </h3>

            <form @submit.prevent="submit">
                <div>
                    <InputLabel :value="__('Title')" for="name"/>
                    <TextInput
                        id="name"
                        v-model="role.name"
                        :disabled="route().current('roles.show')"
                        autofocus
                        class="mt-1 block w-full backdrop-blur-sm bg-white/20"
                        required
                        type="text"
                    />
                    <InputError :message="role.errors.name" class="mt-2"/>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                    <div v-for="type in permissionType">
                        <h5 class="text-2xl text-gray-800 dark:text-gray-400 font-bold capitalize">
                            {{ __(type) }}
                        </h5>
                        <label v-for="(permission) in permissions" class="flex items-center sm:w-fit">
                            <div v-if="permission.name.includes(type)">
                                <Checkbox :key="permission.id"
                                          v-model:checked="role.permissions"
                                          :disabled="route().current('roles.show')"
                                          :value="permission.id"
                                ></Checkbox>
                                <span class="ml-2 text-sm text-gray-800 dark:text-gray-400">
                                    {{ __(permission.name) }}
                                </span>
                            </div>
                        </label>
                    </div>
                    <InputError :message="role.errors.permissions" class="mt-2"/>
                </div>
                <div class="flex items-center justify-end mt-4">

                    <Button v-show="!route().current('roles.show')"
                            :class="{ 'opacity-25': role.processing }"
                            :disabled="role.processing"
                            :loading="role.processing"
                            class-button="primary">
                        {{ route().current() === 'roles.edit' ? __('Edit') : __('Create') }}
                    </Button>
                </div>
            </form>
        </div>
    </Modal>
</template>
