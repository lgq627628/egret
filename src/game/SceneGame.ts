class SceneGame extends eui.Component implements  eui.UIComponent {
	public btn_back:eui.Button;
	public img_question:eui.Image;
	public gp_answer:eui.Group;
	public gp_words:eui.Group;

	// win
	public gp_win:eui.Group;
	// 成语解释
	public lab_cyjs:eui.Label;
	// 成语出处
	public lab_cycc:eui.Label;
	// 元宝
	public lab_yb:eui.Label;
	// 下一题按钮
	public btn_next:eui.Button;
	// 记录当前关卡
	public cur_level:number;

	private static shared:SceneGame;
	public static getInstance(){
		if( !SceneGame.shared ){
			SceneGame.shared = new SceneGame();
		}
		return SceneGame.shared;
	}

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	public init() {
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBack, this);
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goNext,this);
	}

	private goBack() {
		SoundManager.getInstance().playClick();
		this.parent.addChild( SceneLevel.getInstance() );
		this.parent.removeChild(this);
	}

	private goNext() {
		this.gp_win.visible = false;
		SceneLevel.getInstance().setLevel(this.cur_level + 1);
		this.initLevelData(this.cur_level + 1);
	}

	public initLevelData(level:number) {
		// 记录当前关卡
		this.cur_level = level;
		// 获取关卡信息
		let curLevelData:LevelDataItem = LevelData.getInstance().getLevelData(level);
		// 设置问题图片
		this.img_question.source = `resource/assets/data/${curLevelData.img}`;
		// 设置候选文学
		let words:string = curLevelData.answer + curLevelData.word;
		while(words.length === 10) {
			let idx = Math.floor(Math.random()*LevelData.getInstance().totalLevels);
			if (idx !== level) {
				let randomLevelData:LevelDataItem = LevelData.getInstance().getLevelData(idx);
				words = words + randomLevelData.answer + randomLevelData.word;				
			}
		}
		let wordsList = words.split('');
		wordsList = this.randomList(wordsList);
		for(let i:number = 0; i < this.gp_words.numChildren; i++) {
			let worItem = <Word>this.gp_words.getChildAt(i);
			worItem.setWordText(wordsList[i]);
			worItem.visible = true;
		}
		// 清空答案文字
		for(let i:number = 0; i < this.gp_answer.numChildren; i++) {
			let answerItem = <AnswerWord>this.gp_answer.getChildAt(i);
			answerItem.setSelectWord(null);
			answerItem.selected_word = null;
			answerItem.visible = true;
		}
	}

	private randomList(list:string[]):string[] {
		let newList = [];
		while(list.length > 0) {
			let i:number = Math.floor(Math.random()*list.length);
			newList.push(list[i]);
			list.splice(i, 1);
		}
		return newList;
	}

	public onTapSelectWord(w:Word) {
		SoundManager.getInstance().playTapWord();

		// 如果答案区有空白则赋值
		let sel:AnswerWord = null;
		for(let i:number = 0; i < this.gp_answer.numChildren; i++) {
			let answerWord = <AnswerWord>this.gp_answer.getChildAt(i);
			if (answerWord.getWordText() === '') {
				sel = answerWord;
				break;
			}
		}
		if (sel) sel.setSelectWord(w);

		// 验证答案
		let answerStr:string = '';
		for(let i:number = 0; i < this.gp_answer.numChildren; i++) {
			let answerItem = <AnswerWord> this.gp_answer.getChildAt(i);
			if (answerItem.getWordText() === '') break;
			answerStr += answerItem.getWordText();
		}
		if (answerStr.length === 4) {
			if (answerStr === LevelData.getInstance().getLevelData(this.cur_level).answer) {
				SoundManager.getInstance().playRight();
				this.showWin();
			} else {
				SoundManager.getInstance().playWrong();
			}
		}
	}

	private showWin() {
		let data:LevelDataItem = LevelData.getInstance().getLevelData(this.cur_level);
		this.lab_cyjs.text = data.tip;
		this.lab_cycc.text = data.content;
		this.gp_win.visible = true;
	}
}