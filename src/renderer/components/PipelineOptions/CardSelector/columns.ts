export const cardSelectorColumns = [
    {
        name: 'ammount',
        label: 'Ammount',
        sortable: true,
        sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
    },
    { name: 'front', label: 'Front', align: 'center', style: 'width: 20px' },
    { name: 'back', label: 'Back', align: 'center', style: 'width: 20px' },
    { name: 'name', label: 'Name', field: 'name', sortable: true, align: 'end' },
]
