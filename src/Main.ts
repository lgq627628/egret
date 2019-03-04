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

class Main extends egret.DisplayObjectContainer {



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

    private spr: egret.Sprite;
    private num: egret.TextField;
    private tip: egret.TextField;
    private img: egret.Bitmap;
    private n: number = 6;
    private timer: egret.Timer;
    private date: Date;
    private startTime: number;
    private endTime: number;
    private finalTime: number;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this.spr = new egret.Sprite();
        this.spr.width = this.stage.stageWidth;
        this.spr.height = this.stage.stageHeight;
        this.addChild(this.spr);
        this.drawText();
        this.drawTip();
        this.drawBtn();
        this.timer = new egret.Timer(1000, 8); // 每1000ms执行一次，共8次
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.handleTimerChange, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.handleTimerEnd, this);
    }

    private drawText() {
        this.num = new egret.TextField();
        this.num.text = this.n.toString();
        this.num.size = 100;
        this.num.width = this.stage.stageWidth;
        this.num.height = this.stage.stageHeight;
        this.num.textColor = 0x00ff00;
        this.num.textAlign = egret.HorizontalAlign.CENTER;
        this.num.y = 200;        
        this.spr.addChild(this.num);
    }

    private drawTip() {
        this.tip = new egret.TextField();
        this.tip.text = `默默倒数${this.n}秒，然后迅速点击文字`;
        this.tip.width = this.stage.stageWidth;
        this.tip.textColor = 0x00ff00;
        this.tip.textAlign = egret.HorizontalAlign.CENTER;
        this.tip.y = 400;
        this.spr.addChild(this.tip);
    }

    private drawBtn() {
        this.img = new egret.Bitmap();
        this.img.texture = RES.getRes('btn_start');
        this.img.width = 300;
        this.img.height = 150;
        this.img.x = this.stage.stageWidth/2 - 150;
        this.img.y = this.stage.stageHeight - 300;
        this.img.touchEnabled = true;
        this.spr.addChild(this.img);
        this.img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapStart, this, true);
    }

    private tapStart(e:egret.TouchEvent) {
        this.spr.removeChildren();
        this.date = new Date();
        this.startTime = this.date.getTime();
        this.img.alpha = 0;
        this.tip.visible = false;
        this.timer.start();
        this.drawText();
        this.num.text = this.n.toString();
        this.spr.touchEnabled = true;
        this.spr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapScreen, this, true);
    }

    private handleTimerChange() {
        console.log(this.n);
        this.n--;
        if (this.n <= 3) {
            this.num.text = '?';
        } else {
            this.spr.removeChildren();
            this.drawText();
        }
    }

    private handleTimerEnd() {
        if (this.n <= -2) {
            this.drawTip();
            this.tip.text = '别迷糊了，赶紧醒醒吧';
            this.tip.visible = true;
            this.resetStatus();
        }
    }

    private resetStatus() {
        this.spr.touchEnabled = false;
        this.spr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapScreen, this, true);
        this.drawBtn();        
        this.n = 6;
        this.img.alpha = 1;
        this.timer.reset();
    }

    private tapScreen(e:egret.TouchEvent) {
        this.date = new Date();
        this.endTime = this.date.getTime();
        this.finalTime = this.endTime - this.startTime;
        console.log(this.finalTime);
        this.num.text = (this.finalTime/1000-6).toFixed(3);
        this.timer.stop();
        this.drawTip();
        switch (Math.floor(Math.abs(this.finalTime/1000-6))) {
        case 0:
            this.tip.text = '你他妈太过专注了';
            break;
        case 1:
            this.tip.text = '不错哦，可以看进去书了';
            break;                
        case 2:
            this.tip.text = '马马虎虎吧';
            break;
        default:
            this.tip.text = '太菜了吧你';
            break;                
        }
        this.resetStatus();
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}