import { Notify } from 'quasar'

export function notify(message: string, options: { color: string }) {
    Notify.create({
        message,
        position: 'top-right',
        color: options.color,
        actions: [
            {
                label: 'Dismiss',
                handler: () => {},
            },
        ],
    })
}

export function showError(category: string, error: Error) {
    notify(`${category}: ${error.message}`, { color: 'negative' })
}
