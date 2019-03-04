class LevelDataItem {
	public answer:string;
	public img:string;
	public word:string;
	public tip:string;
	public content:string;
}

class LevelData {
    private static shared:LevelData;
    public static getInstance() {
        return LevelData.shared || new LevelData();
    }

    // 创建一个数组，用来保存所有的关卡数据
	private items:LevelDataItem[] = [];
	//总关卡数
	public  totalLevels:number;

    public constructor() {
        this.items = RES.getRes("questions_json");
        this.totalLevels = this.items.length;
    }

    public getLevelData(level:number):LevelDataItem {
        return this.items[level];
    }

    public get nowLevel() {
        let nowLevel = egret.localStorage.getItem('nowLevel');
        if (nowLevel == null || nowLevel == '') {
            return 1;
        } else {
            return parseInt(nowLevel);
        }
    }

    public set nowLevel(level:number) {
        egret.localStorage.setItem('nowLevel', level.toString());
    }
}