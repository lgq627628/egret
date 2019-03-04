class SceneBegin extends eui.Component implements  eui.UIComponent {
	public btn_begin:eui.Button;
	public btn_setting:eui.Button;

	// 被static修饰的变量和方法类似于全局变量和全局方法
	private static shared:SceneBegin;
	public static getInstance(){
		if( !SceneBegin.shared){
			SceneBegin.shared =  new SceneBegin();
		}
		return SceneBegin.shared;
	}
	public constructor() {
		super();
		// this.skinName = "src/Game/SceneBeginSkin.exml";
		// this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goSceneLevel, this)		
	}

	protected partAdded(partName:string,instance:any):void // 添加皮肤的时候自动调用该函数
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void // 组件加载完毕之后调用该函数
	{
		super.childrenCreated();
		this.init(); // 一般从这里开始写
	}

	private init() {
		SoundManager.getInstance();
		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goSceneLevel, this)
		this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setSetting, this)
	}
	
	private goSceneLevel() {
		SoundManager.getInstance().playClick();
		// 为什么要这样写呢
		// let parent:egret.DisplayObjectContainer = this.parent;
		// parent.removeChild(this);
		// parent.addChild( SceneLevel.getInstance() );
		this.parent.addChild( SceneLevel.getInstance() );
		this.parent.removeChild(this);
	}

	private setSetting() {
		SoundManager.getInstance().playClick();
		this.addChild( DlgSetting.getInstance() );
	}
}