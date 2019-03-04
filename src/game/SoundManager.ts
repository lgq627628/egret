class SoundManager {
	// 背景音乐
	private bg_sound:egret.Sound;
	//点击按钮的声音
	private click_sound:egret.Sound;
	//点击文字的声音
	private tapWord_sound:egret.Sound;
	// 正确的声音
	private right_sound:egret.Sound;
	//错误的声音
	private wrong_sound:egret.Sound;

	//音轨
	private soundChannel:egret.SoundChannel;

	private static shared:SoundManager; // 所有的管理类一般写成单例模式，静态声明
	public static getInstance(){
		if(!SoundManager.shared){
			SoundManager.shared = new SoundManager();
		}
		return SoundManager.shared;
	}

	public constructor() {
		this.bg_sound = new egret.Sound();
		this.bg_sound.load("resource/assets/data/sound/Music.mp3");
		this.bg_sound.addEventListener( egret.Event.COMPLETE,()=>{
			this.playBgMusic();
		},this);

		this.click_sound = new egret.Sound();
		this.click_sound.load("resource/assets/data/sound/buttonclick.mp3");

		this.right_sound = new egret.Sound();
		this.right_sound.load("resource/assets/data/sound/right.mp3");

		this.wrong_sound = new egret.Sound();
		this.wrong_sound.load("resource/assets/data/sound/wrong.mp3");

		this.tapWord_sound = new egret.Sound();
		this.tapWord_sound.load("resource/assets/data/sound/type_word.mp3");
	}
	// 播放背景音乐
	public playBgMusic(){
		if( this.bg_sound && this.isMusic ){
			this.soundChannel = this.bg_sound.play(0,0);
            console.log('11111', this.bg_sound, this.isMusic, this.soundChannel);
		}
	}
	
	// 停止背景音乐
	public stopBgMusic(){
		if( this.soundChannel){
			this.soundChannel.stop();
		}
	}

	// 播放点击按钮音效
	public playClick(){
		if( this.isEffect && this.click_sound ){
			this.click_sound.play(0,1);
		}
	}
	// 播放点击文字音效
	public playTapWord(){
		if( this.isEffect && this.tapWord_sound){
			this.tapWord_sound.play(0,1);
		}
	}
	// 播放正确音效
	public playRight(){
		if( this.isEffect && this.right_sound ){
			this.right_sound.play(0,1);
		}
	}
	// 播放错误音效
	public playWrong(){
		if( this.isEffect && this.wrong_sound ){
			this.wrong_sound.play(0,1);
		}
	}

	// 设置是否播放背景音乐
	public set isMusic(val){
		if(val){
			// 播放
			
			egret.localStorage.setItem("isMusic","1");
			this.playBgMusic();
		}else{
			egret.localStorage.setItem("isMusic","0");
			this.stopBgMusic();
		}
	}
	// 获取背景音乐是否播放
	public get isMusic(){
		let ret = egret.localStorage.getItem("isMusic");
		if(ret == null || ret == ""){
			//如果获取到ret是null或者""说明是程序第一次运行 默认播放声音
			return true;
		}else{
			return ret == "1";
		}

	}

	public set isEffect(val){
		if(val){
			egret.localStorage.setItem("isSound","1");
		}else{
			egret.localStorage.setItem("isSound","0");
		}
	}

	public get isEffect(){
		let ret = egret.localStorage.getItem("isSound");
		if( ret == null || ret == ""){
			return true;
		}else{
			return ret == "1";
		}
	}


}