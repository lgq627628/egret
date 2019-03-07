class Main extends egret.DisplayObjectContainer {
    private stageW: number;
    private stageH: number;
    private snake: Snake;
    private food: Food;
    private foodRadius: number = 10;
    private snakeRadius: number = 20;
    private originAimX: number;
    private originAimY: number;
    private timer: egret.Timer;
    private duration: number = 70;
    private head: egret.Shape;
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }


    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.originAimX = this.stageW - this.snakeRadius;
        this.originAimY = this.stageH / 2;

        // 创建白色背景        
        this.creatBg();
        // 创建随机食物        
        this.createFood();
        // 创建小蛇
        this.snake = new Snake(this.stageW / 2, this.stageH / 2, this.snakeRadius, 0x000000);
        this.addChild(this.snake);
        // 计时器
        this.initTimer();
        // 事件处理
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeTarget, this);


        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.handleMove, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END, this.handleEnd, this);
    }

    private creatBg() {
        let whiteBg = new egret.Shape();
        whiteBg.graphics.beginFill(0xffffff);
        whiteBg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        whiteBg.graphics.endFill();
        this.addChild(whiteBg);
    }

    private createFood() {
        let x = Math.random() * (this.stageW - this.snakeRadius * 4);
        let y = Math.random() * (this.stageH - this.snakeRadius * 4);
        this.food = new Food(x, y, this.foodRadius);
        this.addChild(this.food);
    }

    private removeFood() {
        this.removeChild(this.food);
        this.snake.handleEated(this.food.color, this.snakeRadius);
    }

    private initTimer() {
        this.timer = new egret.Timer(this.duration, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
	}
     
    private onTimer() {
        this.head = this.snake.getHead();
        if (this.isHit(this.head, this.food)) {
            this.removeFood();
            this.createFood();
        }
        this.snake.move(this.originAimX, this.originAimY, this.duration);
    }

    private changeTarget(e: egret.TouchEvent) {
        this.originAimX = e.stageX;
        this.originAimY = e.stageY;
        egret.Tween.removeAllTweens();
    }

    private isHit(a, b) {
        let rectOne = new egret.Rectangle(a.x, a.y, a.width, a.height);
        let rectTwo = new egret.Rectangle(b.x, b.y, b.width, b.height);
        return rectOne.intersects(rectTwo);
    }

    // private handleMove(e: egret.TouchEvent) {
    //     this.moveEvent = e;
    //     if (!this.timer) {
    //         this.timer = new egret.Timer(this.duration * 1000);
    //         this.timer.addEventListener(egret.TimerEvent.TIMER, this.keepMoving, this);
    //         this.timer.start();
    //     }
    // }
    // private handleEnd(e: egret.TouchEvent) {
    //     if (this.timer) {
    //         this.timer.stop();
    //         this.timer = null;
    //     }
    // }
}