class SceneBegin extends eui.Component implements  eui.UIComponent {
	public beginBtn:eui.Button;

	public static shared:SceneBegin;
	public static getInstance() {
		if (!SceneBegin.shared) {
			SceneBegin.shared = new SceneBegin();
		}
		return SceneBegin.shared;
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

	private init() {
		this.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
	}

	private start() {
		this.release();
		this.parent.addChild(SceneGame.getInstance());
		this.parent.removeChild(this);
	}

	private release() {
		if (this.beginBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
			this.beginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);			
		}
	}
	
}