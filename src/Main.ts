//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer { // 主场景，也就是启动场景



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
        // this.startAnimation(result);
        // 微信登入获取信息
        await platform.login();
        const userInfo = await platform.getUserInfo();
        platform.showShareMenu();
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

    private radius:number;
    private topX:number;
    private topY:number;
    private bottomX:number;
    private bottomY:number;
    private leftX:number;
    private rightX:number;
    private car:egret.Bitmap;
    private speed:number = 20;
    private arcLen:number = 0; // 弧度长
    private isMoving:boolean = false;
    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this.creatRoad();
        this.creatCar();

        // // 背景图
        // let sky = this.createBitmapByName("bg_jpg");
        // this.addChild(sky);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;

        // // 浅灰色矩形
        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);

        // // 白鹭icon
        // let icon = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;

        // // 竖线
        // let line = new egret.Shape();
        // line.graphics.lineStyle(2, 0xffffff);
        // line.graphics.moveTo(0, 0);
        // line.graphics.lineTo(0, 117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);

        // // 文本
        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);

        // // 变化的文本
        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;


    }

    private creatRoad() {
        // 上圆弧
        let topRoad:egret.Shape = new egret.Shape();
        topRoad.graphics.lineStyle( 10, 0xff0000);
        topRoad.graphics.beginFill( 0xff0000, 0); // 中心填充为空
        topRoad.graphics.drawArc( this.stage.stageWidth/2, this.stage.stageWidth/2-10, this.stage.stageWidth/2-20, 0, Math.PI, true );
        topRoad.graphics.endFill();
        this.addChild( topRoad );
        // 下圆弧 
        let bottomRoad:egret.Shape = new egret.Shape();
        bottomRoad.graphics.lineStyle( 10, 0xff0000);
        bottomRoad.graphics.beginFill( 0xff0000, 0);
        bottomRoad.graphics.drawArc( this.stage.stageWidth/2, this.stage.stageHeight-this.stage.stageWidth/2-10, this.stage.stageWidth/2-20, 0, Math.PI, false );
        bottomRoad.graphics.endFill();
        this.addChild( bottomRoad );
        // 左竖线
        let leftRoad:egret.Shape = new egret.Shape();
        leftRoad.graphics.lineStyle( 10, 0x00ff00 );
        leftRoad.graphics.moveTo( 20, this.stage.stageWidth/2-10 );
        leftRoad.graphics.lineTo( 20, this.stage.stageHeight-this.stage.stageWidth/2-10 );
        leftRoad.graphics.endFill();
        this.addChild( leftRoad );
        // 右竖线
        let rightRoad:egret.Shape = new egret.Shape();
        rightRoad.graphics.lineStyle( 10, 0x00ff00 );
        rightRoad.graphics.moveTo( this.stage.stageWidth-20, this.stage.stageWidth/2-10 );
        rightRoad.graphics.lineTo( this.stage.stageWidth-20, this.stage.stageHeight-this.stage.stageWidth/2-10 );
        rightRoad.graphics.endFill();
        this.addChild( rightRoad );
        // 全局变量
        this.radius = this.stage.stageWidth/2 - 20;
        this.topX = this.stage.stageWidth/2;
        this.topY = this.stage.stageWidth/2 - 10;
        this.bottomX = this.stage.stageWidth/2;
        this.bottomY = this.stage.stageHeight - this.stage.stageWidth/2 - 10;
        this.leftX = 20;
        this.rightX = this.stage.stageWidth -20;
    }

    private creatCar() {
        this.car = new egret.Bitmap();
        this.car.texture = RES.getRes("car_jpeg");
        this.car.width = 40;
        this.car.height = 80;
        this.car.anchorOffsetX = this.car.width/2;
        this.car.anchorOffsetY = this.car.height/2;
        this.car.x = this.stage.stageWidth-20;
        this.car.y = this.stage.stageHeight - this.stage.stageWidth/2 - 10;
        this.addChild( this.car );
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveCar, this);
    }

    private moveCar() {
        if (this.isMoving) {
            this.isMoving = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this); // 添加帧事件
        } else {
            this.isMoving = true;      
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
    }

    private update() {
        if (this.car.y < this.topY) {
            this.runTop();
        } else if (this.car.y > this.bottomY) {
            this.runBottom();
        } else {
            if (this.car.x > this.topX) {
                this.runRight();
            } else {
                this.runLeft();
            }
        }
    }

    private runRight() {
        this.arcLen = 0;
        this.car.y -= this.speed;
    }
    private runLeft() {
        this.arcLen = 0;        
        this.car.y += this.speed;
    }
    private runTop() {
        this.arcLen += this.speed;
        let angle:number = this.arcLen/this.radius;
        if (angle < Math.PI) {
            this.car.rotation = - (angle*180/Math.PI);
            this.car.x = this.topX + Math.cos(angle)*this.radius;
            this.car.y = this.topY - Math.sin(angle)*this.radius;
        } else {
            this.car.rotation = 180;
            this.car.x = this.leftX;
            this.car.y = this.topY;
        }
    }
    private runBottom() {
        this.arcLen += this.speed;
        let angle:number = this.arcLen/this.radius;
        if (angle < Math.PI) {
            this.car.rotation = -(180 + angle*180/Math.PI);
            this.car.x = this.bottomX - Math.cos(angle)*this.radius;
            this.car.y = this.bottomY + Math.sin(angle)*this.radius;
        } else {
            this.car.rotation = 0;
            this.car.x = this.rightX;
            this.car.y = this.bottomY;
        }
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    // private createBitmapByName(name: string) {
    //     let result = new egret.Bitmap();
    //     let texture: egret.Texture = RES.getRes(name);
    //     result.texture = texture;
    //     return result;
    // }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    // private startAnimation(result: string[]) {
    //     let parser = new egret.HtmlTextParser();

    //     let textflowArr = result.map(text => parser.parse(text));
    //     let textfield = this.textfield;
    //     let count = -1;
    //     let change = () => {
    //         count++;
    //         if (count >= textflowArr.length) {
    //             count = 0;
    //         }
    //         let textFlow = textflowArr[count];

    //         // 切换描述内容
    //         // Switch to described content
    //         textfield.textFlow = textFlow;
    //         let tw = egret.Tween.get(textfield);
    //         tw.to({ "alpha": 1 }, 200);
    //         tw.wait(2000);
    //         tw.to({ "alpha": 0 }, 200);
    //         tw.call(change, this);
    //     };

    //     change();
    // }
}