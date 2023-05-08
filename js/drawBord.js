import { ctx, partsOfCanvas, unit, BLUE, GREEN, RED, YELLOW } from "./global.js"
// Colors

function drawShape(pos, color) {
    if (color) ctx.fillStyle = color
    ctx.lineWidth = 1
    const [w, x, y, z] = pos
    ctx.strokeRect(w + 0.5, x + 0.5, y, z)
}

function fillShape(pos, color) {
    if (color) ctx.fillStyle = color
    // const [w, x, y, z] = pos
    // ctx.fillRect(w + 0.5, x + 0.5, y - 0.5, z - 0.5)
    ctx.fillRect(...pos)
}


function fillHouseBackGround() {
    ctx.clearRect(unit, unit, unit * 4, unit * 4)
    drawShape([unit, unit, unit * 4, unit * 4])
    houseCircles()
}

function houseCircles() {
    fillCirle([unit * 2, unit * 2])
    fillCirle([unit * 4, unit * 2])
    fillCirle([unit * 2, unit * 4])
    fillCirle([unit * 4, unit * 4])
}

function changeOrigin(origin, callback) {
    ctx.save()
    ctx.translate(...origin)
    callback()
    ctx.restore()
}

function rotate(angle, callback) {
    ctx.save()
    ctx.rotate(angle)
    callback()
    ctx.restore()
}

function fillHouse({ x = 0, y = 0, angle = 0, color = RED }) {
    changeOrigin([unit * 9 * x, unit * 9 * y], () => {
        ctx.fillStyle = color
        fillShape([x, y, unit * 6, unit * 6], color);
        fillHouseBackGround(GREEN);
        changeOrigin([unit * 6 * x, unit * 6 * y], () => rotate(angle, () => fillTails(y ? 0 : 1, x ? 0 : 1)))
    })
}


function fillHouses() {
    fillHouse({})
    fillHouse({ color: GREEN, x: 1, angle: Math.PI / 2 })
    fillHouse({ color: YELLOW, x: 1, y: 1, angle: Math.PI })
    fillHouse({ color: BLUE, y: 1, angle: -Math.PI / 2 })
}

function drawLine(positon) {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(positon[0] + 0.5, positon[1] + 0.5)
    ctx.lineTo(positon[2] + 0.5, positon[3] + 0.5)
    ctx.stroke()
}

function drawLudoLines() {
    ctx.strokeWidth = 10
    for (let x = 0; x <= partsOfCanvas; x++) {
        for (let y = 1; y <= partsOfCanvas - 1; y++) {
            drawLine([unit * x, unit * y, unit * (partsOfCanvas - x), unit * y])
        }
    }
    for (let x = 1; x <= partsOfCanvas - 1; x++) {
        for (let y = 0; y <= partsOfCanvas; y++) {
            drawLine([unit * x, unit * y, unit * x, unit * (partsOfCanvas - y)])
        }
    }
}

function fillCirle(pos, color) {
    if (color) ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(...pos, unit / 2, 0, Math.PI * 2)
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fill()
}

function fillTails(x = 1, y = 1) {
    fillShape([unit + x, unit * 6 + y, unit - 1, unit - 1])
    for (let i = 1; i < 6; i++) {
        fillShape([unit * i + x, unit * 7 + y, unit - 1, unit - 1])
    }
    drawTrangle(x, y)
}

function drawTrangle(x, y) {
    ctx.beginPath()
    ctx.moveTo(unit * 6 + x, unit * 6 + y)
    ctx.lineTo(unit * 7.5, unit * 7.5)
    ctx.lineTo(unit * 6 + x, unit * 9 + y)
    ctx.stroke()
    ctx.fill()
}

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.stroke();

}

function drawStars() {
    drawStar(unit * 5 / 2 + 1, unit * 17 / 2 + 1, 5, unit / 2.4, unit / 6)
    drawStar(unit * 13 / 2 + 1, unit * 5 / 2 + 1, 5, unit / 2.4, unit / 6)
    drawStar(unit * 25 / 2 + 1, unit * 13 / 2 + 1, 5, unit / 2.4, unit / 6)
    drawStar(unit * 17 / 2 + 1, unit * 25 / 2 + 1, 5, unit / 2.4, unit / 6)
}

export default () => {
    drawLudoLines()
    drawStars()
    fillHouses()
}