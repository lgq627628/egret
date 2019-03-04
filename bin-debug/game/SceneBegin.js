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
var SceneBegin = (function (_super) {
    __extends(SceneBegin, _super);
    function SceneBegin() {
        return _super.call(this) || this;
    }
    SceneBegin.getInstance = function () {
        if (!SceneBegin.shared) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    };
    SceneBegin.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SceneBegin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init(); // 一般从这里开始写
    };
    SceneBegin.prototype.init = function () {
        SoundManager.getInstance();
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goSceneLevel, this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setSetting, this);
    };
    SceneBegin.prototype.goSceneLevel = function () {
        SoundManager.getInstance().playClick();
        // 为什么要这样写呢
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(SceneLevel.getInstance());
        // this.parent.removeChild(this);
        // this.addChild( SceneLevel.getInstance() );
    };
    SceneBegin.prototype.setSetting = function () {
        SoundManager.getInstance().playClick();
        this.addChild(DlgSetting.getInstance());
    };
    return SceneBegin;
}(eui.Component));
__reflect(SceneBegin.prototype, "SceneBegin", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SceneBegin.js.map