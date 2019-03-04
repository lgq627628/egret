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
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    function SceneGame() {
        return _super.call(this) || this;
    }
    SceneGame.getInstance = function () {
        if (!SceneGame.shared) {
            SceneGame.shared = new SceneGame();
        }
        return SceneGame.shared;
    };
    SceneGame.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SceneGame.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    SceneGame.prototype.init = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBack, this);
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goNext, this);
    };
    SceneGame.prototype.goBack = function () {
        SoundManager.getInstance().playClick();
        this.parent.addChild(SceneLevel.getInstance());
        this.parent.removeChild(this);
    };
    SceneGame.prototype.goNext = function () {
        this.gp_win.visible = false;
        SceneLevel.getInstance().setLevel(this.cur_level + 1);
        this.initLevelData(this.cur_level + 1);
    };
    SceneGame.prototype.initLevelData = function (level) {
        // 记录当前关卡
        this.cur_level = level;
        // 获取关卡信息
        var curLevelData = LevelData.getInstance().getLevelData(level);
        // 设置问题图片
        this.img_question.source = "resource/assets/data/" + curLevelData.img;
        // 设置候选文学
        var words = curLevelData.answer + curLevelData.word;
        while (words.length === 10) {
            var idx = Math.floor(Math.random() * LevelData.getInstance().totalLevels);
            if (idx !== level) {
                var randomLevelData = LevelData.getInstance().getLevelData(idx);
                words = words + randomLevelData.answer + randomLevelData.word;
            }
        }
        var wordsList = words.split('');
        wordsList = this.randomList(wordsList);
        for (var i = 0; i < this.gp_words.numChildren; i++) {
            var worItem = this.gp_words.getChildAt(i);
            worItem.setWordText(wordsList[i]);
            worItem.visible = true;
        }
        // 清空答案文字
        for (var i = 0; i < this.gp_answer.numChildren; i++) {
            var answerItem = this.gp_answer.getChildAt(i);
            answerItem.setSelectWord(null);
            answerItem.selected_word = null;
            answerItem.visible = true;
        }
    };
    SceneGame.prototype.randomList = function (list) {
        var newList = [];
        while (list.length > 0) {
            var i = Math.floor(Math.random() * list.length);
            newList.push(list[i]);
            list.splice(i, 1);
        }
        return newList;
    };
    SceneGame.prototype.onTapSelectWord = function (w) {
        SoundManager.getInstance().playTapWord();
        // 如果答案区有空白则赋值
        var sel = null;
        for (var i = 0; i < this.gp_answer.numChildren; i++) {
            var answerWord = this.gp_answer.getChildAt(i);
            if (answerWord.getWordText() === '') {
                sel = answerWord;
                break;
            }
        }
        if (sel)
            sel.setSelectWord(w);
        // 验证答案
        var answerStr = '';
        for (var i = 0; i < this.gp_answer.numChildren; i++) {
            var answerItem = this.gp_answer.getChildAt(i);
            if (answerItem.getWordText() === '')
                break;
            answerStr += answerItem.getWordText();
        }
        if (answerStr.length === 4) {
            if (answerStr === LevelData.getInstance().getLevelData(this.cur_level).answer) {
                SoundManager.getInstance().playRight();
                this.showWin();
            }
            else {
                SoundManager.getInstance().playWrong();
            }
        }
    };
    SceneGame.prototype.showWin = function () {
        var data = LevelData.getInstance().getLevelData(this.cur_level);
        this.lab_cyjs.text = data.tip;
        this.lab_cycc.text = data.content;
        this.gp_win.visible = true;
    };
    return SceneGame;
}(eui.Component));
__reflect(SceneGame.prototype, "SceneGame", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SceneGame.js.map