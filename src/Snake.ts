class Snake extends egret.Sprite {
    private head: egret.Shape;
    private bodyList: egret.Shape[] = [];
    private speed: number = 20;
    private angle: number = 0;
    // private stageR: number;

    public constructor(x: number, y: number, r: number, color: number) {
        super();
        this.init(x, y, r, color);
    }

    private init(x: number, y: number, r: number, color: number) {
        // this.stageR = Math.sqrt(Math.pow(this.stage.stageWidth, 2) + Math.pow(this.stage.stageWidth, 2));

        this.head = new egret.Shape();
        this.head.graphics.lineStyle(5, 0xff4777);
        this.head.graphics.beginFill(color);
        this.head.graphics.drawCircle(0, 0, r);
        this.head.graphics.endFill();
        this.head.x = x;
        this.head.y = y;

        this.addChild(this.head);
        this.bodyList.push(this.head); //要先初始化数组为空[]，不然第一次会报错
    }

    public move(tapX: number, tapY: number, duration: number) {
        this.moveBody(duration);
        this.moveHead(tapX, tapY, duration);
    }

    private moveHead(tapX: number, tapY: number, duration) {
        let headX = this.bodyList[0].x;
        let headY = this.bodyList[0].y;

        // this.stageR = Math.sqrt(Math.pow(this.stage.stageWidth, 2) + Math.pow(this.stage.stageWidth, 2));
        // let x2 = Math.pow(Math.abs(headX - tapX), 2);
        // let y2 = Math.pow(Math.abs(headY - tapY), 2);
        // if (x2 + y2 <= 20 * 20) {

        // }
        let k = Math.abs((headY - tapY) / (headX - tapX));
        this.angle = Math.atan(k);

        let targetX;
        let targetY;
        if (tapX > headX) {
            targetX = headX + this.speed * Math.cos(this.angle);
        } else {
            targetX = headX - this.speed * Math.cos(this.angle);
        }
        if (tapY > headY) {
            targetY = headY + this.speed * Math.sin(this.angle);
        } else {
            targetY = headY - this.speed * Math.sin(this.angle);
        }        

        // 需要考虑点击蛇头和垂直方向等因素//////////////////////////////////////////////////////////////////////////////////////////
        egret.Tween.get(this.bodyList[0])
            .to({x: targetX, y: targetY}, duration)
    }

    private moveBody(duration: number) {
        // 这边的时间和速度很关键，速度要和半径一致
        for(let i = this.bodyList.length - 1; i > 0; i--) {
            egret.Tween.get(this.bodyList[i])
                .to({
                    x: this.bodyList[i - 1].x,
                    y: this.bodyList[i - 1].y
                }, duration)
        }
    }

    public handleEated(color: number, radius: number) {
        let bodyItem: egret.Shape = new egret.Shape();
        bodyItem.graphics.beginFill(color);
        bodyItem.graphics.drawCircle(0, 0, radius);
        bodyItem.graphics.endFill();
        bodyItem.x = this.bodyList[this.bodyList.length - 1].x + radius * 0.6;
        bodyItem.y = this.bodyList[this.bodyList.length - 1].y + radius * 0.6;

        this.bodyList.push(bodyItem);
        this.addChild(bodyItem);
    }

    public getHead() {
        return this.bodyList[0];
    }
}