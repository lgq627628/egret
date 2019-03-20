class SceneGame extends eui.Component implements  eui.UIComponent {
	// 盒子场景面板
	public blockPanel: eui.Group;
	// 小人
	public player: eui.Image;
	// 方块资源
	private blockSourceNames: Array<string> = [];
	// 按下的音频
	private pushVoice: egret.Sound;
	// 按下音频的 SoundChannel 对象
	private pushSoundChannel: egret.SoundChannel;
	// 弹跳的音频
	private jumpVoice: egret.Sound;
	// 舞台中的方块数组
	private blockArr: Array<eui.Image> = [];
	// 回收的方块数组
	private reBackBlockArr: Array<eui.Image> = [];
	// 当前的盒子（最新出现的盒子，就是准备要跳过去的目标盒子）
	private currentBlock: eui.Image;
	// 下一个的盒子方向（1靠右侧出现，-1靠左侧出现）
	public direction: number = 1;
	// 随机盒子的最大最小水平距离
	private minDistance = 220;
	private maxDistance = 320;
	// tanθ角度值
	public tanAngle: number = 0.556047197640118;

	// 跳的距离，这里指的是x轴方向的距离
	public jumpDistance: number = 0;
	// 判断是否是按下状态
	private isReadyJump = false;
	// 落脚点
	private targetPos: egret.Point;
	// 左侧跳跃点
	private leftOrigin = { "x": 180, "y": 350 };
	// 右侧跳跃点
	private rightOrigin = { "x": 505, "y": 350 };
	// 游戏中得分（数字）
	private score = 0;
	// 显示的得分（字符串）
	public scoreLabel: eui.Label;
	// 跳跃距离根据当前按压时间来确定
	private time:number = 0;

	// 游戏结束场景
	public overPanel: eui.Group;
	public overScoreLabel: eui.Label;
	public restartBtn: eui.Button;

	public static shared:SceneGame;
	public static getInstance() {
		if (!SceneGame.shared) {
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
	
	private init() {
		// 所以盒子资源
		this.blockSourceNames = ["block1_png", "block2_png", "block3_png"];
		// 按下和跳跃的声音
		this.pushVoice = RES.getRes('push_mp3');
		this.jumpVoice = RES.getRes('jump_mp3');
		// 初始化场景（方块和小人）
		this.initBlock();
		// 添加触摸事件
		this.blockPanel.touchEnabled = true;
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapDown, this);
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapUp, this);
		// 心跳计时器（计算按的时长，推算出跳的距离）
		egret.startTick(this.computeDistance, this);
	}

	private computeDistance(timeStamp:number):boolean {
		let now = timeStamp;
		let time = this.time;

		let pass = now - time;
		pass /= 1000;
		if (this.isReadyJump) {
			this.jumpDistance += 300 * pass; // 就是 s = vt，需要注意的是这里算的是横坐标位移而不是斜线位移
		}
		this.time = now;
		return true;
	}

	private onTapDown() {
		// 播放按下音效
		this.pushSoundChannel = this.pushVoice.play(0, 1);

		// 使小人变矮做出积蓄能量的效果
		egret.Tween.get(this.player).to({scaleY: 0.5}, 3000);

		this.isReadyJump = true;
	}

	private onTapUp() {
		if (!this.isReadyJump) return;
		if (!this.targetPos) this.targetPos = new egret.Point();

		// 一松手小人就该起跳，此时应该禁止点击屏幕，并切换声音
		this.blockPanel.touchEnabled = false;
		this.pushSoundChannel.stop();
		this.jumpVoice.play(0, 1);

		// 清除所有动画
		egret.Tween.removeAllTweens();
		this.isReadyJump = false;

		// 计算落点坐标
		this.targetPos.x = this.player.x + this.direction * this.jumpDistance;
		this.targetPos.y = this.player.y + this.direction * this.jumpDistance * (this.currentBlock.y - this.player.y) / (this.currentBlock.x - this.player.x);

		// 执行跳跃动画
		egret.Tween.get(this).to({ factor: 1 }, 400).call(() => { // 这表示贝塞尔曲线，在 400 毫秒内，this 的 factor 属性将会缓慢趋近1这个值，这里的 factor 就是曲线中的 t 属性，它是从 0 到 1 的闭区间。
			this.player.scaleY = 1;
			this.jumpDistance = 0;
			// 判断跳跃是否成功
			this.checkResult();
		});
		// 执行小人空翻动画，先处理旋转中心点
		this.player.anchorOffsetY = this.player.height / 2;
		egret.Tween.get(this.player)
			.to({ rotation: this.direction > 0 ? 360 : -360 }, 200)
			.call(() => { this.player.rotation = 0 })
			.call(() => { this.player.anchorOffsetY = this.player.height - 20; });
	}

	// 添加一个方块
	private addBlock() {
		// 随机一个方块
		let blockNode = this.createBlock();
		// 设置位置
		let distance = this.minDistance + Math.random() * (this.maxDistance - this.minDistance);
		if (this.direction > 0) {
			blockNode.x = this.currentBlock.x + distance;
			blockNode.y = this.currentBlock.y - distance * this.tanAngle;
		} else {
			blockNode.x = this.currentBlock.x - distance;
			blockNode.y = this.currentBlock.y - distance * this.tanAngle;
		}
		this.currentBlock = blockNode;
	}

	// 创建一个方块
	private createBlock(): eui.Image {
		var blockNode = null;
		if (this.reBackBlockArr.length) {
			// 回收池里面有,则直接取
			blockNode = this.reBackBlockArr.splice(0, 1)[0];
		} else {
			// 回收池里面没有,则重新创建
			blockNode = new eui.Image();
		}
		// 使用随机背景图
		let n = Math.floor(Math.random() * this.blockSourceNames.length);
		blockNode.source = this.blockSourceNames[n];
		this.blockPanel.addChildAt(blockNode, 1);
		// 设置方块的锚点
		blockNode.anchorOffsetX = 222;
		blockNode.anchorOffsetY = 78;
		blockNode.touchEnabled = false;
		// 把新创建的block添加进入blockArr里
		this.blockArr.push(blockNode);
		return blockNode;
	}

	private checkResult() {
		let err = Math.pow(this.player.x - this.currentBlock.x, 2) + Math.pow(this.player.y - this.currentBlock.y, 2)
		const MAX_ERR_LEN = 90 * 90;
		if (err <= MAX_ERR_LEN) {
			// 更新分数
			this.score++;
			this.scoreLabel.text = this.score.toString();
			// 要跳动的方向
			this.direction = Math.random() > 0.5 ? 1 : -1;
			
			// 当前方块要移动到相应跳跃点的距离
			let blockX, blockY;
			blockX = this.direction > 0 ? this.leftOrigin.x : this.rightOrigin.x;
			blockY = this.stage.stageHeight / 2 + this.currentBlock.height;
			// 小人要移动到的点
			let diffX = this.currentBlock.x - blockX;
			let diffY = this.currentBlock.y - blockY;
			let playerX, playerY;
			playerX = this.player.x - diffX;
			playerY = this.player.y - diffY;
			// 更新页面，更新所有方块位置
			this.updateAll(diffX, diffY);
			// 更新小人的位置
			egret.Tween.get(this.player).to({
				x: playerX,
				y: playerY
			}, 800).call(() => {
				// 开始创建下一个方块
				this.addBlock();
				// 让屏幕重新可点;
				this.blockPanel.touchEnabled = true;
			})
		} else {
			this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reset, this);
			this.overPanel.visible = true;
			this.overScoreLabel.text = this.score.toString();
		}
	}

	private updateAll(x, y) {
		egret.Tween.removeAllTweens();
		for (var i: number = this.blockArr.length - 1; i >= 0; i--) {
			var blockNode = this.blockArr[i];
			// 盒子的中心点（不是图片的中心点）在屏幕左侧 或者在 屏幕右侧 或者在 屏幕下方
			if (blockNode.x + blockNode.width - 222 < 0 || blockNode.x - this.stage.stageWidth - 222 > 0 || blockNode.y - this.stage.stageHeight - 78 > 0) {
				// 方块超出屏幕,从显示列表中移除 ////////////////////////////////////////////////////////////////////////////////////////////////////////
				if (blockNode) this.blockPanel.removeChild(blockNode);
				this.blockArr.splice(i, 1);
				// 添加到回收数组中
				this.reBackBlockArr.push(blockNode);
			} else {
				// 没有超出屏幕的话,则移动
				egret.Tween.get(blockNode).to({
					x: blockNode.x - x,
					y: blockNode.y - y
				}, 800)
			}
		}
	}

	private reset() {
		this.score = 0;
		this.scoreLabel.text = this.score.toString();

		// 清空舞台
		this.blockPanel.removeChildren();
		this.blockArr = [];
		this.reBackBlockArr = [];

		// 进行初始化
		this.initBlock();

		this.blockPanel.touchEnabled = true;
		this.overPanel.visible = false;
	}

	private initBlock() {
		// 初始化第一个方块
		this.currentBlock = this.createBlock();
		this.currentBlock.x = this.leftOrigin.x;
		this.currentBlock.y = this.stage.stageHeight - this.currentBlock.height - 110;
		this.blockPanel.addChild(this.currentBlock);
		// 初始化小人
		this.player.y = this.currentBlock.y;
		this.player.x = this.currentBlock.x;
		this.player.anchorOffsetX = this.player.width / 2;
		this.player.anchorOffsetY = this.player.height - 20;
		this.blockPanel.addChild(this.player);
		// 初始化得分
		this.blockPanel.addChild(this.scoreLabel);
		// 初始化方向
		this.direction = 1;
		// 添加下一个盒子
		this.addBlock();
	}

	// 添加 factor 的 set、get 方法，注意用 public
	public get factor():number {
		return 0;
	}
	// 计算方法参考二次贝塞尔公式：https://blog.csdn.net/korekara88730/article/details/45743339
	// 这里的 getter 使 factor 属性从 0 开始，结合刚才 tween 中传入的 1，使其符合公式中的 t 的取值区间。
	// 而重点是这里的 setter，里面的 player 对象是我们要应用二次贝塞尔曲线的显示对象，而在 setter 中给 player 对象的 xy 属性赋值的公式正是之前列出的二次贝塞尔曲线公式。
	// 这里的 P0 点是(100,100)，P1 点是(300,300)，P2 点是(100,500)。
	public set factor(t:number) {
		this.player.x = (1 - t) * (1 - t) * this.player.x + 2 * t * (1 - t) * (this.player.x + this.targetPos.x) / 2 + t * t * (this.targetPos.x);
		this.player.y = (1 - t) * (1 - t) * this.player.y + 2 * t * (1 - t) * (this.targetPos.y - 300) + t * t * (this.targetPos.y);
	}
}