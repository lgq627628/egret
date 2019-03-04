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
var DlgSetting = (function (_super) {
    __extends(DlgSetting, _super);
    function DlgSetting() {
        return _super.call(this) || this;
    }
    DlgSetting.getInstance = function () {
        if (!DlgSetting.shared) {
            DlgSetting.shared = new DlgSetting();
        }
        return DlgSetting.shared;
    };
    DlgSetting.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    DlgSetting.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    DlgSetting.prototype.init = function () {
        this.btn_music_dis.visible = !SoundManager.getInstance().isMusic;
        this.btn_effect_dis.visible = !SoundManager.getInstance().isEffect;
        this.gp_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapMusic, this);
        this.gp_effect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapEffect, this);
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapConfirm, this);
    };
    DlgSetting.prototype.tapMusic = function () {
        SoundManager.getInstance().isMusic = !SoundManager.getInstance().isMusic;
        this.btn_music_dis.visible = !SoundManager.getInstance().isMusic;
    };
    DlgSetting.prototype.tapEffect = function () {
        SoundManager.getInstance().isEffect = !SoundManager.getInstance().isEffect;
        this.btn_effect_dis.visible = !SoundManager.getInstance().isEffect;
    };
    DlgSetting.prototype.tapConfirm = function () {
        SoundManager.getInstance().playClick();
        this.parent.removeChild(this);
    };
    return DlgSetting;
}(eui.Component));
__reflect(DlgSetting.prototype, "DlgSetting", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=DlgSetting.js.map