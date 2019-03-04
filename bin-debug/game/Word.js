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
var Word = (function (_super) {
    __extends(Word, _super);
    function Word() {
        return _super.call(this) || this;
    }
    Word.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Word.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    Word.prototype.init = function () {
        this.lab_word.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickWord, this);
    };
    Word.prototype.clickWord = function () {
        SceneGame.getInstance().onTapSelectWord(this);
    };
    Word.prototype.setWordText = function (val) {
        this.lab_word.text = val;
    };
    Word.prototype.getWordText = function () {
        return this.lab_word.text;
    };
    return Word;
}(eui.Component));
__reflect(Word.prototype, "Word", ["eui.UIComponent", "egret.DisplayObject"]);
var AnswerWord = (function (_super) {
    __extends(AnswerWord, _super);
    function AnswerWord() {
        var _this = _super.call(this) || this;
        _this.selected_word = null;
        return _this;
    }
    //重写点击事件
    AnswerWord.prototype.clickWord = function () {
        SoundManager.getInstance().playClick();
        //如果点击的答案区有文字内容
        if (this.selected_word) {
            this.setWordText("");
            this.selected_word.visible = true;
            this.selected_word = null;
        }
    };
    AnswerWord.prototype.setSelectWord = function (w) {
        if (w) {
            this.setWordText(w.getWordText());
            w.visible = false;
        }
        else {
            this.setWordText("");
        }
        this.selected_word = w;
    };
    return AnswerWord;
}(Word));
__reflect(AnswerWord.prototype, "AnswerWord");
window["Word"] = Word;
window["AnswerWord"] = AnswerWord;
//# sourceMappingURL=Word.js.map