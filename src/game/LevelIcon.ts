class LevelIcon extends eui.Button implements  eui.UIComponent {
	public lb_level:eui.Label;

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
	}
	
	// 使用了get和set创建了一个属性来标记关卡数字
	public get Level():number {
		return parseInt(this.lb_level.text);
	}

	public set Level(level:number) {
		if(this.lb_level) this.lb_level.text = level.toString();
	}
	
}