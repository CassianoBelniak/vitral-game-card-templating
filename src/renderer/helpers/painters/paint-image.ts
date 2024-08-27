import ComponentImage from '../../classes/ComponentImage.js'
import { Rect } from '../../classes/rect.js'
import { imagesStore } from '../../stores/images-store.js'
import resetContext from '../reset-context.js'
import { rotateContext } from '../rotate-context.js'

interface PaintImageOptions {
    ctx: CanvasRenderingContext2D
    component: ComponentImage
    variables: { [key: string]: string }
}

export default async function paintImage({
    ctx,
    component,
    variables,
}: PaintImageOptions) {
    try {
        console.log('painting image')
        const values = await component.getValues(variables)
        console.log(values)
        const rect = new Rect(values)
        const imageData = imagesStore.images[values.name]
        console.log(values)
        rotateContext(ctx, rect, values.rotation)
        Object.assign(ctx, values.context)
        ctx.drawImage(imageData.image, rect.x, rect.y, rect.width, rect.height)
        resetContext(ctx)
    } catch (error) {
        console.log('Error', error)
    }
}
