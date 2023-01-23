<script setup>
import {Inertia} from '@inertiajs/inertia'
import RoleDetails from "@/Pages/Management/RoleAndPermission/RoleDetails.vue";
import RoleConfirmDestroy from "@/Pages/Management/RoleAndPermission/RoleConfirmDestroy.vue";
import {ref} from "vue";

defineProps({
    roles: {
        type: Array,
        required: true
    },
    modal: {
        type: String,
        default: ''
    }
});

const role_to_delete = ref(null)

const columns = {
    id: 'ID',
    name: 'Title',
    created_at: 'Created',
    updated_at: 'Updated'
}
</script>

<template>
    <AuthenticatedLayout title="Roles">

        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ __('Roles') }}
            </h2>
        </template>

        <div class="px-2 md:px-0">
            <Table :data="roles"
                   :columns="columns"
                   actions
                   :title_button_create="__('role')"
                   @create="Inertia.visit(route('roles.create'))"
                   @show="(item) => Inertia.visit(route('roles.show', item.id))"
                   @edit="(item) => Inertia.visit(route('roles.edit', item.id))"
                   @delete="(item) => role_to_delete = item"
            />
        </div>

        <RoleDetails v-if="modal"
                     :permissions="$attrs.permissions"
                     :item="$attrs.role"
        />

        <RoleConfirmDestroy v-if="role_to_delete"
                            :item="role_to_delete"/>

    </AuthenticatedLayout>
</template>
