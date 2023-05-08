export const $ = (name) => document.getElementById(name);

export const canvas = document.createElement("canvas");
canvas.height = 540;
canvas.width = 540;
canvas.classList.add("bg-light-100");

export const container = $("container");
container.append(canvas);

export const ctx = canvas.getContext("2d");
export const canvasHeight = canvas.clientHeight,
    canvasWidth = canvas.clientWidth;
export const partsOfCanvas = 15;
export const unit = canvasHeight / partsOfCanvas;

export const RED = "rgb(255,0,0)";
export const GREEN = "rgb(0,255,0)";
export const BLUE = "rgb(0,100,255)";
export const YELLOW = "rgb(255,255,0)";

export const redImg = new Image();
redImg.src = "icon/red.svg";
export const greenImg = new Image();
greenImg.src = "icon/green.svg";
export const yellowImg = new Image();
yellowImg.src = "icon/yellow.svg";
export const blueImg = new Image();
blueImg.src = "icon/blue.svg";

// animation
export function cubicInOut(progress) {
    return progress < 0.5 ? 2 * progress ** 2 : 1 - 2 * (1 - progress) ** 2;
}

export function tweened(x = 0, { duration = 400 }) {
    let nextVal = null;
    let start = null;
    let currDuration = duration
    const reset = () => {
        nextVal = null;
        start = null;
        currDuration = duration
    }
    return {
        get() {
            if (!start) return x;
            const elapsed = Date.now() - start;
            if (nextVal > x) {
                const newX = x + cubicInOut(elapsed / currDuration) * (nextVal - x);
                if (x - newX > 0 || (newX >= nextVal)) reset()
                x = newX
            }
            else {
                x -= cubicInOut(elapsed / currDuration) * (x - nextVal);
                if ((nextVal >= x)) reset()
            }
            console.log({ x })
            return x;
        },
        set(val, newDuration) {
            nextVal = val;
            start = Date.now();
            if (newDuration) currDuration = newDuration
        },
    };
}
