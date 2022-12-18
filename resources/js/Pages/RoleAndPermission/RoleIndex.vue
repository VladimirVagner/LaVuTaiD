<template>
    <Head :title="__('Roles')" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{{ __('Roles') }}</h2>
        </template>

        <div class=" w-1/2 mx-auto mt-6">
            <Link type="button"
                  class="w-1/2 mx-auto mt-6 py-2 px-3 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  :href="route('roles.create')"
            >
                {{ __('Create') }}
            </Link>

            <Table :data="roles"
                   :head="HeadTable"
                   :rows="RowsTable"
                   date_format="DD MMM YYYY HH:mm"
                   actions
                   edit_route_name="roles.edit"
                   delete_route_name="roles.destroy"
                   class="mt-6"
            />
        </div>

        <ModalCrud :show="ModalCrudRole && modal" @close="closeModalCrud" max-width="4xl">
            <RoleCreateAndEdit :role="role" :permissions="permissions" @role:touched="RoleTouched = true" @save:success="ModalCrudRole = false" />
        </ModalCrud>

<!--
-----------------------------------------------------------------------------------------------------
---------Модальное окно с запросом на подтверждение закрытия без сохранения изменившихся данных-------
------------------------------------------------------------------------------------------------------
--->
        <Modal :show="ModalChanges" :closeable="false">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {{ __('Are you sure you want to continue? All unsaved changes will be lost') }}
                </h2>
                <div class="mt-6 flex justify-end">
                    <SecondaryButton @click="openModalChanges"> {{ __('Cancel') }} </SecondaryButton>

                    <PrimaryButton
                        class="ml-3"
                        @click="closeAllModal"
                    >
                        {{ __('Continue') }}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>

    </AuthenticatedLayout>
</template>

<script>
import { Head } from '@inertiajs/inertia-vue3';
import {onMounted, ref} from "vue";
import RoleCreateAndEdit from "@/Pages/RoleAndPermission/RoleCreateAndEdit.vue";
import { Link } from '@inertiajs/inertia-vue3'

export default {
    props: ['roles', 'role', 'permissions', 'modal'],
    components: {
        RoleCreateAndEdit, Link, Head
    },

    setup(props) {
        const HeadTable = [
            'Title', 'Created', 'Updated'
        ]
        const RowsTable = [
            {name: 'name',type: 'string'},
            {name: 'created_at',type: 'date',},
            {name: 'updated_at',type: 'date'}
        ]
        const ModalCrudRole = ref(false);
        const RoleTouched = ref(false)
        const ModalChanges = ref(false);

        const openModalCrud = () => {
            ModalCrudRole.value = true;
        };
        const closeModalCrud = () => {
            RoleTouched.value ? openModalChanges() : ModalCrudRole.value = false;
        };

        const openModalChanges = () => {
            ModalChanges.value = !ModalChanges.value;
        };
        const closeAllModal = () => {
            ModalCrudRole.value = false
            ModalChanges.value = false;
        };

        onMounted( () => {
            props.modal ? openModalCrud() : ''
        })

        return {
            HeadTable,
            RowsTable,
            ModalCrudRole,
            RoleTouched,
            ModalChanges,
            openModalCrud,
            openModalChanges,
            closeAllModal,
            closeModalCrud
        }
    }
}

</script>
