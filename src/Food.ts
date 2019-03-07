class Food extends egret.Sprite {
    private colorList: number[] = [0x70f3ff, 0xff461f, 0x00bc12, 0x21a675, 0x4c221b, 0xbf242a, 0x161823, 0xffa400];
    private food: egret.Shape;
    public color: number;

    public constructor(x:number, y:number, r:number) {
        super();
        this.init(x, y ,r);
    }

    private randomColor(): number {
        return this.colorList[Math.round(Math.random() * (this.colorList.length))];
        // return parseInt("0x" + ("000000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6));
    }

    private init(x:number, y:number, r:number) {
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
    }
}