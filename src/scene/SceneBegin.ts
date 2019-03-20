class SceneBegin extends eui.Component implements  eui.UIComponent {
	public beginBtn:eui.Button;

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
		this.beginBtn.once(egret.TouchEvent.TOUCH_TAP, this.start, this);
	}

	private start() {
		this.parent.addChild(new SceneGame());
		this.parent.removeChild(this);
	}
}