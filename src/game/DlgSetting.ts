class DlgSetting extends eui.Component implements  eui.UIComponent {
	public btn_confirm:eui.Button;
	public gp_music:eui.Group;
	public btn_music:eui.Button;
	public btn_music_dis:eui.Image;
	public gp_effect:eui.Group;
	public btn_effect:eui.Button;
	public btn_effect_dis:eui.Image;


	private static shared:DlgSetting;
	public static getInstance(){
		if( !DlgSetting.shared){
			DlgSetting.shared =  new DlgSetting();
		}
		return DlgSetting.shared;
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
		this.btn_music_dis.visible = !SoundManager.getInstance().isMusic;
		this.btn_effect_dis.visible = !SoundManager.getInstance().isEffect;

		this.gp_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapMusic, this)
		this.gp_effect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapEffect, this)
		this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapConfirm, this)
	}

	private tapMusic() {
		SoundManager.getInstance().isMusic = !SoundManager.getInstance().isMusic;
		this.btn_music_dis.visible = !SoundManager.getInstance().isMusic;
	}

	private tapEffect() {
		SoundManager.getInstance().isEffect = !SoundManager.getInstance().isEffect;
		this.btn_effect_dis.visible = !SoundManager.getInstance().isEffect;
	}

	private tapConfirm() {
		SoundManager.getInstance().playClick();
		this.parent.removeChild(this);
	}
}