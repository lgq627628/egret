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
var Food = (function (_super) {
    __extends(Food, _super);
    function Food(x, y, r) {
        var _this = _super.call(this) || this;
        _this.colorList = [0x70f3ff, 0xff461f, 0x00bc12, 0x21a675, 0x4c221b, 0xbf242a, 0x161823, 0xffa400];
        _this.init(x, y, r);
        return _this;
    }
    Food.prototype.randomColor = function () {
        return this.colorList[Math.round(Math.random() * (this.colorList.length))];
        // return parseInt("0x" + ("000000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6));
    };
    Food.prototype.init = function (x, y, r) {
        this.food = new egret.Shape();
        this.color = this.randomColor();
        this.food.graphics.beginFill(this.color);
        this.food.graphics.drawCircle(0, 0, r);
        this.food.graphics.endFill();
        // this.food.x = r;
        // this.food.y = r;
        this.x = x;
        this.y = y;
        this.addChild(this.food);
    };
    return Food;
}(egret.Sprite));
__reflect(Food.prototype, "Food");
//# sourceMappingURL=Food.js.map