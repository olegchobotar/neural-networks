export default class Canvas {
    constructor(element) {
        this.ctx = element.getContext('2d');
        this.ctx.width = 600;
        this.ctx.height = 600;
        this.pixel = 20;
        this.isMouseDown = false;
        this.paintedCells = [];

        element.addEventListener('mousedown', element => {
            this.isMouseDown = true;
            this.ctx.beginPath();
        });

        element.addEventListener('mouseup', element => {
            this.isMouseDown = false;
        });

        element.addEventListener('mousemove', element => {
            if (this.isMouseDown) {
                this.ctx.fillStyle = 'red';
                this.ctx.strokeStyle = 'red';
                this.ctx.lineWidth = this.pixel;

                this.ctx.lineTo(element.offsetX, element.offsetY);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.arc(element.offsetX, element.offsetY, this.pixel / 2, 0, Math.PI * 2);
                this.ctx.fill();

                this.ctx.beginPath();
                this.ctx.moveTo(element.offsetX, element.offsetY);
            }
        });
    };

    drawLine = (x1, y1, x2, y2, color = 'gray') => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineJoin = 'miter';
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = "#cdcdcd";
        this.ctx.stroke();
    };

    drawCell = (x, y, w, h) => {
        this.ctx.fillstyle = 'blue';
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineJoin = 'miter';
        this.ctx.lineWidth = 1;
        this.ctx.rect(x, y, w, h);
        this.ctx.fill();
    };

    clear = () => {
        this.ctx.clearRect(0, 0, 600, 600);
    };

    drawGrid = () => {
        const { width, height, pixel, xStep, yStep } = this.getValues();

        for (let x = 0; x < width; x += xStep) {
            this.drawLine(x, 0, x, height);
        }

        for (let y = 0; y < height; y += yStep) {
            this.drawLine(0, y, width, y);
        }
    };

    calculate = (draw = false) => {
        const { width, height, xStep, yStep } = this.getValues();

        let vector = [];
        let toDrawCoordinates = [];

        for (let x = 0; x < width; x += xStep) {
            for (let y = 0; y < height; y += yStep) {
                const { data } = this.ctx.getImageData(x, y, xStep, yStep);

                let notEmptyPixelsCount = 0;
                for (let i = 0; i < data.length; i += 10) {
                    const isEmpty = data[i] === 0;
                    if (!isEmpty) {
                        notEmptyPixelsCount++;
                    }
                }

                if (notEmptyPixelsCount > 1 && draw) {
                    toDrawCoordinates.push([x, y, xStep, yStep]);
                }

                vector.push(notEmptyPixelsCount > 1 ? 1 : 0);
            }
        }

        if (draw) {
            this.clear();
            this.drawGrid();
            toDrawCoordinates.forEach(item => this.drawCell(item[0], item[1], item[2], item[3]));
        }

        return vector;
    };

    getValues = () => {
        const width = this.ctx.width;
        const height = this.ctx.height;
        const pixel = width / this.pixel;
        const xStep = width / pixel;
        const yStep = height / pixel;
        return {width, height, pixel, xStep, yStep};
    }
}
