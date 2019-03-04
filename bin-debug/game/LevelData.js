var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelDataItem = (function () {
    function LevelDataItem() {
    }
    return LevelDataItem;
}());
__reflect(LevelDataItem.prototype, "LevelDataItem");
var LevelData = (function () {
    function LevelData() {
        // 创建一个数组，用来保存所有的关卡数据
        this.items = [];
        this.items = RES.getRes("questions_json");
        this.totalLevels = this.items.length;
    }
    LevelData.getInstance = function () {
        return LevelData.shared || new LevelData();
    };
    LevelData.prototype.getLevelData = function (level) {
        return this.items[level];
    };
    Object.defineProperty(LevelData.prototype, "nowLevel", {
        get: function () {
            var nowLevel = egret.localStorage.getItem('nowLevel');
            if (nowLevel == null || nowLevel == '') {
                return 1;
            }
            else {
                return parseInt(nowLevel);
            }
        },
        set: function (level) {
            egret.localStorage.setItem('nowLevel', level.toString());
        },
        enumerable: true,
        configurable: true
    });
    return LevelData;
}());
__reflect(LevelData.prototype, "LevelData");
//# sourceMappingURL=LevelData.js.map