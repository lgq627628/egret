var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        var _this = this;
        this.bg_sound = new egret.Sound();
        this.bg_sound.load("resource/assets/data/sound/Music.mp3");
        this.bg_sound.addEventListener(egret.Event.COMPLETE, function () {
            _this.playBgMusic();
        }, this);
        this.click_sound = new egret.Sound();
        this.click_sound.load("resource/assets/data/sound/buttonclick.mp3");
        this.right_sound = new egret.Sound();
        this.right_sound.load("resource/assets/data/sound/right.mp3");
        this.wrong_sound = new egret.Sound();
        this.wrong_sound.load("resource/assets/data/sound/wrong.mp3");
        this.tapWord_sound = new egret.Sound();
        this.tapWord_sound.load("resource/assets/data/sound/type_word.mp3");
    }
    SoundManager.getInstance = function () {
        if (!SoundManager.shared) {
            SoundManager.shared = new SoundManager();
        }
        return SoundManager.shared;
    };
    // 播放背景音乐
    SoundManager.prototype.playBgMusic = function () {
        if (this.bg_sound && this.isMusic) {
            this.soundChannel = this.bg_sound.play(0, 0);
            console.log('11111', this.bg_sound, this.isMusic, this.soundChannel);
        }
    };
    // 停止背景音乐
    SoundManager.prototype.stopBgMusic = function () {
        if (this.soundChannel) {
            this.soundChannel.stop();
        }
    };
    // 播放点击按钮音效
    SoundManager.prototype.playClick = function () {
        if (this.isEffect && this.click_sound) {
            this.click_sound.play(0, 1);
        }
    };
    // 播放点击文字音效
    SoundManager.prototype.playTapWord = function () {
        if (this.isEffect && this.tapWord_sound) {
            this.tapWord_sound.play(0, 1);
        }
    };
    // 播放正确音效
    SoundManager.prototype.playRight = function () {
        if (this.isEffect && this.right_sound) {
            this.right_sound.play(0, 1);
        }
    };
    // 播放错误音效
    SoundManager.prototype.playWrong = function () {
        if (this.isEffect && this.wrong_sound) {
            this.wrong_sound.play(0, 1);
        }
    };
    Object.defineProperty(SoundManager.prototype, "isMusic", {
        // 获取背景音乐是否播放
        get: function () {
            var ret = egret.localStorage.getItem("isMusic");
            if (ret == null || ret == "") {
                //如果获取到ret是null或者""说明是程序第一次运行 默认播放声音
                return true;
            }
            else {
                return ret == "1";
            }
        },
        // 设置是否播放背景音乐
        set: function (val) {
            if (val) {
                // 播放
                egret.localStorage.setItem("isMusic", "1");
                this.playBgMusic();
            }
            else {
                egret.localStorage.setItem("isMusic", "0");
                this.stopBgMusic();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "isEffect", {
        get: function () {
            var ret = egret.localStorage.getItem("isSound");
            if (ret == null || ret == "") {
                return true;
            }
            else {
                return ret == "1";
            }
        },
        set: function (val) {
            if (val) {
                egret.localStorage.setItem("isSound", "1");
            }
            else {
                egret.localStorage.setItem("isSound", "0");
            }
        },
        enumerable: true,
        configurable: true
    });
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map