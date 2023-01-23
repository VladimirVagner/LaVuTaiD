import {ref} from "vue";
import {Inertia} from "@inertiajs/inertia";

export function useModal() {

    const openModal = ref(true)
    const closeModal = (route = null) => {
        openModal.value = false
        route ? Inertia.visit(route) : ''
    }

    return {
        openModal,
        closeModal
    }
}
