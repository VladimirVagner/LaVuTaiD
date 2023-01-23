import {notify} from "@kyvg/vue3-notification";
import {useForm} from "@inertiajs/inertia-vue3";

/**
 * Crud запросы ролей пользователей
 * */
export function useRole(props) {

    const role = useForm({
        id: props && props.id ? props.id : '',
        name: props && props.name ? props.name : '',
        permissions: props && props.permissions ? props.permissions.map((item) => {
            return item.id
        }) : [],
    })
    const store = () => {
        return new Promise((resolve, reject) => {
            role.post(route('roles.store'), {
                onSuccess: () => {
                    notify({
                        title: 'Success',
                        text: 'Role created',
                        type: 'success'
                    })
                    resolve()
                },
                onError: (err) => {
                    notify({
                        title: 'Error',
                        text: err,
                        type: 'error'
                    })
                    reject(err)
                },
                onFinish: () => {}
            });
        })
    }

    const update = () => {
        return new Promise((resolve, reject) => {
            role.patch(route('roles.update', role.id), {
                onSuccess: () => {
                    notify({
                        title: 'Success',
                        text: 'Role edited',
                        type: 'success'
                    })
                    resolve()
                },
                onError: (err) => {
                    notify({
                        title: 'Error',
                        text: err,
                        type: 'error'
                    })
                    reject(err)
                },
                onFinish: () => {}
            });
        })
    }

    const destroy = (id) => {
        return new Promise((resolve, reject) => {
            role.delete(route('roles.destroy',id), {
                onSuccess: () => {
                    notify({
                        title: 'Success',
                        text: 'Role deleted',
                        type: 'success'
                    })
                    resolve()
                },
                onError: (err) => {
                    notify({
                        title: 'Error',
                        text: err,
                        type: 'error',
                    })
                    reject(err)
                },
                onFinish: () => {}
            })
        })
    }

   return { role, store, update, destroy }
}
