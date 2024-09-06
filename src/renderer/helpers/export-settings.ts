export const exportTypes = [
    {
        label: 'Individual cards - Single file - TODO',
        value: 'individual-card-single-file',
    },
    {
        label: 'Individual cards - Two files - TODO',
        value: 'individual-card-two-files',
    },
    {
        label: 'Individual cards - Only frontside - TODO',
        value: 'individual-card-ony-frontside',
    },
    {
        label: 'Individual cards - Only backside - TODO',
        value: 'individual-card-ony-backside',
    },
    {
        label: 'Print page - Separated pages for sides - TODO',
        value: 'print-page-separated-pages',
    },
    {
        label: 'Print page - Same page for both sides - TODO',
        value: 'print-page-same-pages',
    },
    {
        label: 'Print page - Only frontside - TODO',
        value: 'print-page-only-frontside',
    },
    {
        label: 'Print page - Only backside - TODO',
        value: 'print-page-only-backside',
    },
]

type OptionVisibilityType = {
    [key: string]: {
        pageSize: boolean
        margin: boolean
        bleeding: boolean
        backsideOffset: boolean
        frontsideOffset: boolean
        cardSideSpacing: boolean
    }
}

export const optionVisibility: OptionVisibilityType = {
    'individual-card-single-file': {
        pageSize: false,
        margin: true,
        bleeding: false,
        backsideOffset: false,
        frontsideOffset: false,
        cardSideSpacing: false,
    },
    'individual-card-two-files': {
        pageSize: false,
        margin: true,
        bleeding: false,
        backsideOffset: false,
        frontsideOffset: false,
        cardSideSpacing: true,
    },
    'individual-card-ony-backside': {
        pageSize: false,
        margin: true,
        bleeding: false,
        backsideOffset: false,
        frontsideOffset: false,
        cardSideSpacing: false,
    },
    'print-page-separated-pages': {
        pageSize: true,
        margin: true,
        bleeding: true,
        backsideOffset: true,
        frontsideOffset: true,
        cardSideSpacing: false,
    },
    'print-page-same-pages': {
        pageSize: true,
        margin: true,
        bleeding: true,
        backsideOffset: true,
        frontsideOffset: true,
        cardSideSpacing: true,
    },
    'print-page-only-frontside': {
        pageSize: true,
        margin: true,
        bleeding: true,
        backsideOffset: false,
        frontsideOffset: true,
        cardSideSpacing: false,
    },
    'print-page-only-backside': {
        pageSize: true,
        margin: true,
        bleeding: true,
        backsideOffset: true,
        frontsideOffset: false,
        cardSideSpacing: false,
    },
}
