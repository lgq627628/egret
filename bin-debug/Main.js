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
        _this.speed = 20;
        _this.arcLen = 0; // 弧度长
        _this.isMoving = false;
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
                            // 微信登入获取信息
                        ];
                    case 2:
                        result = _a.sent();
                        // this.startAnimation(result);
                        // 微信登入获取信息
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        // this.startAnimation(result);
                        // 微信登入获取信息
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        platform.showShareMenu();
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
    };
    Main.prototype.creatRoad = function () {
        // 上圆弧
        var topRoad = new egret.Shape();
        topRoad.graphics.lineStyle(10, 0xff0000);
        topRoad.graphics.beginFill(0xff0000, 0); // 中心填充为空
        topRoad.graphics.drawArc(this.stage.stageWidth / 2, this.stage.stageWidth / 2 - 10, this.stage.stageWidth / 2 - 20, 0, Math.PI, true);
        topRoad.graphics.endFill();
        this.addChild(topRoad);
        // 下圆弧 
        var bottomRoad = new egret.Shape();
        bottomRoad.graphics.lineStyle(10, 0xff0000);
        bottomRoad.graphics.beginFill(0xff0000, 0);
        bottomRoad.graphics.drawArc(this.stage.stageWidth / 2, this.stage.stageHeight - this.stage.stageWidth / 2 - 10, this.stage.stageWidth / 2 - 20, 0, Math.PI, false);
        bottomRoad.graphics.endFill();
        this.addChild(bottomRoad);
        // 左竖线
        var leftRoad = new egret.Shape();
        leftRoad.graphics.lineStyle(10, 0x00ff00);
        leftRoad.graphics.moveTo(20, this.stage.stageWidth / 2 - 10);
        leftRoad.graphics.lineTo(20, this.stage.stageHeight - this.stage.stageWidth / 2 - 10);
        leftRoad.graphics.endFill();
        this.addChild(leftRoad);
        // 右竖线
        var rightRoad = new egret.Shape();
        rightRoad.graphics.lineStyle(10, 0x00ff00);
        rightRoad.graphics.moveTo(this.stage.stageWidth - 20, this.stage.stageWidth / 2 - 10);
        rightRoad.graphics.lineTo(this.stage.stageWidth - 20, this.stage.stageHeight - this.stage.stageWidth / 2 - 10);
        rightRoad.graphics.endFill();
        this.addChild(rightRoad);
        // 全局变量
        this.radius = this.stage.stageWidth / 2 - 20;
        this.topX = this.stage.stageWidth / 2;
        this.topY = this.stage.stageWidth / 2 - 10;
        this.bottomX = this.stage.stageWidth / 2;
        this.bottomY = this.stage.stageHeight - this.stage.stageWidth / 2 - 10;
        this.leftX = 20;
        this.rightX = this.stage.stageWidth - 20;
    };
    Main.prototype.creatCar = function () {
        this.car = new egret.Bitmap();
        this.car.texture = RES.getRes("car_jpeg");
        this.car.width = 40;
        this.car.height = 80;
        this.car.anchorOffsetX = this.car.width / 2;
        this.car.anchorOffsetY = this.car.height / 2;
        this.car.x = this.stage.stageWidth - 20;
        this.car.y = this.stage.stageHeight - this.stage.stageWidth / 2 - 10;
        this.addChild(this.car);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveCar, this);
    };
    Main.prototype.moveCar = function () {
        if (this.isMoving) {
            this.isMoving = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this); // 添加帧事件
        }
        else {
            this.isMoving = true;
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
    };
    Main.prototype.update = function () {
        if (this.car.y < this.topY) {
            this.runTop();
        }
        else if (this.car.y > this.bottomY) {
            this.runBottom();
        }
        else {
            if (this.car.x > this.topX) {
                this.runRight();
            }
            else {
                this.runLeft();
            }
        }
    };
    Main.prototype.runRight = function () {
        this.arcLen = 0;
        this.car.y -= this.speed;
    };
    Main.prototype.runLeft = function () {
        this.arcLen = 0;
        this.car.y += this.speed;
    };
    Main.prototype.runTop = function () {
        this.arcLen += this.speed;
        var angle = this.arcLen / this.radius;
        if (angle < Math.PI) {
            this.car.rotation = -(angle * 180 / Math.PI);
            this.car.x = this.topX + Math.cos(angle) * this.radius;
            this.car.y = this.topY - Math.sin(angle) * this.radius;
        }
        else {
            this.car.rotation = 180;
            this.car.x = this.leftX;
            this.car.y = this.topY;
        }
    };
    Main.prototype.runBottom = function () {
        this.arcLen += this.speed;
        var angle = this.arcLen / this.radius;
        if (angle < Math.PI) {
            this.car.rotation = -(180 + angle * 180 / Math.PI);
            this.car.x = this.bottomX - Math.cos(angle) * this.radius;
            this.car.y = this.bottomY + Math.sin(angle) * this.radius;
        }
        else {
            this.car.rotation = 0;
            this.car.x = this.rightX;
            this.car.y = this.bottomY;
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
