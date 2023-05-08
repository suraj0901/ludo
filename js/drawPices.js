import { ctx, redImg, unit } from "./global.js"

const drawRedPices = () => {
    ctx.drawImage(redImg, unit * 2 - 22, unit)
    ctx.drawImage(redImg, unit * 4 - 22, unit)
    ctx.drawImage(redImg, unit * 4 - 22, unit * 3)
    ctx.drawImage(redImg, unit * 2 - 22, unit * 3)
}

export default () => {
    drawRedPices()
}