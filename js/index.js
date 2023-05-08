import drawLudo from "./drawBord.js";
import drawPices from "./drawPices.js";
import { $, ctx, redImg, tweened, unit } from "./global.js";

const postion = (initialX, initialY) => {
    const x = tweened(initialX, { duration: 100 })
    const y = tweened(initialY, { duration: 100 })
    return {
        get x() {
            return x.get()
        },
        get y() {
            return y.get()
        },
        set x(val) {
            x.set(val)
        },
        set y(val) {
            y.set(val)
        },
        moveNext(val) {
            if (y.get() === 5 && x.get() < 5) x.set(x.get() + 1)
            else if (y.get() === 5 && x.get() === 5) {
                x.set(x.get() + 1)
                y.set(y.get() - 1)
            }
            else if (x.get() === 6 && y.get() <= 9) {
                y.set(y.get() - 1)
            }
        }
    }
}


const pos = postion(1, 5)

const counter = $("counter")
counter.onclick = pos.moveNext

const draw = () => {
    ctx.clearRect(0, 0, 540, 540)
    drawLudo()
    drawPices()
    ctx.drawImage(redImg, (unit * pos.x) - 3, unit * (pos.y + 0.5))
    window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)

