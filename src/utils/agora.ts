import AgoraRtcEngine from "agora-electron-sdk";

const APPID = process.env["AGORA_APPID"] || "07c87cea43744f39a0ecc0283d07fa75";

interface IinitOptions {
  logpath?: string;
  localVideoContainer: HTMLDivElement;
  onAddUserVideoContiner: Function;
}

interface IjoinChannelOptions {
  token: string;
  channel: string;
  info?: string;
  uid: number;
  remoteVideoContainer?: HTMLDivElement;
}

class Agora {
  public client: null | AgoraRtcEngine = null;
  public localVideoContainer: HTMLDivElement = document.createElement("div");
  public remoteUsers: Array<number> = [];

  constructor(options: IinitOptions) {
    if (global.rtcEngine) {
      global.rtcEngine.release();
      global.rtcEngine = null;
    }
    if (!APPID) {
      alert("Please provide APPID in App.vue");
      return;
    }
    this.client = new AgoraRtcEngine();
    this.client.initialize(APPID);
    this.localVideoContainer = options.localVideoContainer;

    this.client.setLogFile(options.logpath || "./agora.log");

    this.addEvent(options);
  }

  addEvent(options: IinitOptions) {
    if (!this.client) {
      return;
    }
    const { client } = this;
    client.setChannelProfile(1);
    client.setClientRole(1);
    client.enableVideo();

    client.on("joinedChannel", this.onJoinedChannelCallback);
    client.on("error", this.onError);
    client.on("userJoined", this.onUserJoined);

    const oldJoinChannel = this.onJoinChannel;

    this.onJoinChannel = async function(
      joinChanneOptions: IjoinChannelOptions
    ): Promise<boolean> {
      const remoteVideoContainer: HTMLDivElement = await options.onAddUserVideoContiner(
        joinChanneOptions.uid
      );

      this.remoteUsers.push(joinChanneOptions.uid);

      return oldJoinChannel({
        ...joinChanneOptions,
        remoteVideoContainer
      });
    };
  }

  onJoinedChannelCallback(channel: string, uid: number, elapsed: number) {
    console.log("join channel", channel, uid, elapsed);
  }

  onError(err: number, msg: string) {
    console.error("err:", err, msg);
  }

  onUserJoined(uid: number) {
    if (!this.client) {
      return;
    }
    // this.client.subscribe(uid, remoteVideoContainer)
    this.client.setupViewContentMode(uid, 1, undefined);
  }

  onJoinChannel = (options: IjoinChannelOptions): Promise<boolean> =>  {
    if (!this.client) return Promise.reject(false);
    const rt = this.client.joinChannel(
      options.token,
      options.channel,
      options.info || "",
      options.uid
    );
    console.log(rt === 0 ? "成功" : "失败");
    if (rt === 0) {
      this.client.setupLocalVideo(this.localVideoContainer);
      return Promise.resolve(true);
    }
    return Promise.reject(false);
  }
}

export default Agora;
