<script setup>
import {useRole} from "@/composition/role"
import {useModal} from "@/composition/modal";

const props = defineProps({
    item: {
        id: {
            type: Number,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
    }
})

const {role, destroy} = useRole(props.item)
const {openModal, closeModal} = useModal()

</script>
<template>
    <Modal :show="openModal" @close="closeModal(route('roles.index'))" position="center">
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100"
                v-html="__('Are you sure you want to delete the role :name? ' +
                 'The rights of all users with this role will be taken away', {name: '<b>'+item.name+'</b>'})"
            >
            </h2>
            <div class="mt-6 flex justify-end">
                <Button classButton="secondary" @click="closeModal(route('roles.index'))">
                    {{ __('Cancel') }}
                </Button>

                <Button
                    classButton="danger"
                    @click="destroy(item.id).then(() => closeModal()).catch(() => {})"
                    :loading="role.processing"
                    :disabled="role.processing"
                >
                    {{ __('Delete') }}
                </Button>
            </div>
        </div>
    </Modal>
</template>
