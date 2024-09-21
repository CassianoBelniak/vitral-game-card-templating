import { ComponentImage } from '../../classes/component-image.js'
import { Rect } from '../../classes/rect.js'
import { imagesStore } from '../../stores/images-store.js'
import resetContext from '../reset-context.js'
import { rotateContext } from '../rotate-context.js'

interface PaintImageOptions {
    ctx: CanvasRenderingContext2D
    component: ComponentImage
    variables: { [key: string]: string }
}

export default async function paintImage({ ctx, component, variables }: PaintImageOptions) {
    try {
        const values = await component.getValues(variables)
        const imageData = imagesStore.images[values.name]
        if (!values.name || !imageData) return
        const rect = new Rect(values)
        rotateContext(ctx, rect, values.rotation)
        Object.assign(ctx, values.context)
        ctx.drawImage(imageData.image, rect.x, rect.y, rect.width, rect.height)
        resetContext(ctx)
    } catch (error) {
        console.log('Error', error)
    }
}
