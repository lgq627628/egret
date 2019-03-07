var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Snake = (function (_super) {
    __extends(Snake, _super);
    // private stageR: number;
    function Snake(x, y, r, color) {
        var _this = _super.call(this) || this;
        _this.bodyList = [];
        _this.speed = 20;
        _this.angle = 0;
        _this.init(x, y, r, color);
        return _this;
    }
    Snake.prototype.init = function (x, y, r, color) {
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
    };
    Snake.prototype.move = function (tapX, tapY, duration) {
        this.moveBody(duration);
        this.moveHead(tapX, tapY, duration);
    };
    Snake.prototype.moveHead = function (tapX, tapY, duration) {
        var headX = this.bodyList[0].x;
        var headY = this.bodyList[0].y;
        // this.stageR = Math.sqrt(Math.pow(this.stage.stageWidth, 2) + Math.pow(this.stage.stageWidth, 2));
        // let x2 = Math.pow(Math.abs(headX - tapX), 2);
        // let y2 = Math.pow(Math.abs(headY - tapY), 2);
        // if (x2 + y2 <= 20 * 20) {
        // }
        var k = Math.abs((headY - tapY) / (headX - tapX));
        this.angle = Math.atan(k);
        var targetX;
        var targetY;
        if (tapX > headX) {
            targetX = headX + this.speed * Math.cos(this.angle);
        }
        else {
            targetX = headX - this.speed * Math.cos(this.angle);
        }
        if (tapY > headY) {
            targetY = headY + this.speed * Math.sin(this.angle);
        }
        else {
            targetY = headY - this.speed * Math.sin(this.angle);
        }
        // 需要考虑点击蛇头和垂直方向等因素//////////////////////////////////////////////////////////////////////////////////////////
        egret.Tween.get(this.bodyList[0])
            .to({ x: targetX, y: targetY }, duration);
    };
    Snake.prototype.moveBody = function (duration) {
        // 这边的时间和速度很关键，速度要和半径一致
        for (var i = this.bodyList.length - 1; i > 0; i--) {
            egret.Tween.get(this.bodyList[i])
                .to({
                x: this.bodyList[i - 1].x,
                y: this.bodyList[i - 1].y
            }, duration);
        }
    };
    Snake.prototype.handleEated = function (color, radius) {
        var bodyItem = new egret.Shape();
        bodyItem.graphics.beginFill(color);
        bodyItem.graphics.drawCircle(0, 0, radius);
        bodyItem.graphics.endFill();
        bodyItem.x = this.bodyList[this.bodyList.length - 1].x + radius * 0.6;
        bodyItem.y = this.bodyList[this.bodyList.length - 1].y + radius * 0.6;
        this.bodyList.push(bodyItem);
        this.addChild(bodyItem);
    };
    Snake.prototype.getHead = function () {
        return this.bodyList[0];
    };
    return Snake;
}(egret.Sprite));
__reflect(Snake.prototype, "Snake");
//# sourceMappingURL=Snake.js.map