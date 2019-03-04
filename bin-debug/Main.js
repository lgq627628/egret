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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.n = 6;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")
                            // this.startAnimation(result);
                        ];
                    case 2:
                        result = _a.sent();
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        // this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
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
    };
    Main.prototype.drawText = function () {
        this.num = new egret.TextField();
        this.num.text = this.n.toString();
        this.num.size = 100;
        this.num.width = this.stage.stageWidth;
        this.num.height = this.stage.stageHeight;
        this.num.textColor = 0x00ff00;
        this.num.textAlign = egret.HorizontalAlign.CENTER;
        this.num.y = 200;
        this.spr.addChild(this.num);
    };
    Main.prototype.drawTip = function () {
        this.tip = new egret.TextField();
        this.tip.text = "\u9ED8\u9ED8\u5012\u6570" + this.n + "\u79D2\uFF0C\u7136\u540E\u8FC5\u901F\u70B9\u51FB\u6587\u5B57";
        this.tip.width = this.stage.stageWidth;
        this.tip.textColor = 0x00ff00;
        this.tip.textAlign = egret.HorizontalAlign.CENTER;
        this.tip.y = 400;
        this.spr.addChild(this.tip);
    };
    Main.prototype.drawBtn = function () {
        this.img = new egret.Bitmap();
        this.img.texture = RES.getRes('btn_start');
        this.img.width = 300;
        this.img.height = 150;
        this.img.x = this.stage.stageWidth / 2 - 150;
        this.img.y = this.stage.stageHeight - 300;
        this.img.touchEnabled = true;
        this.spr.addChild(this.img);
        this.img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapStart, this, true);
    };
    Main.prototype.tapStart = function (e) {
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
    };
    Main.prototype.handleTimerChange = function () {
        console.log(this.n);
        this.n--;
        if (this.n <= 3) {
            this.num.text = '?';
        }
        else {
            this.spr.removeChildren();
            this.drawText();
        }
    };
    Main.prototype.handleTimerEnd = function () {
        if (this.n <= -2) {
            this.drawTip();
            this.tip.text = '别迷糊了，赶紧醒醒吧';
            this.tip.visible = true;
            this.resetStatus();
        }
    };
    Main.prototype.resetStatus = function () {
        this.spr.touchEnabled = false;
        this.spr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapScreen, this, true);
        this.drawBtn();
        this.n = 6;
        this.img.alpha = 1;
        this.timer.reset();
    };
    Main.prototype.tapScreen = function (e) {
        this.date = new Date();
        this.endTime = this.date.getTime();
        this.finalTime = this.endTime - this.startTime;
        console.log(this.finalTime);
        this.num.text = (this.finalTime / 1000 - 6).toFixed(3);
        this.timer.stop();
        this.drawTip();
        switch (Math.floor(Math.abs(this.finalTime / 1000 - 6))) {
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
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map