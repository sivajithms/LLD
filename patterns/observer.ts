
abstract class ISubscriber {
    abstract update(channel: IChannel): void;
}

abstract class IChannel {
    abstract subscribe(subscriber: ISubscriber): void;
    abstract unsubscribe(subscriber: ISubscriber): void;
    abstract notifySubscribers(): void;
}

class Channel extends IChannel {
    private subscribers: ISubscriber[] = [];
    private name: string;
    private latestVideo: string = '';

    constructor(name: string) {
        super();
        this.name = name;
    }

    getName(){
        return this.name;
    }

    subscribe(subscriber: ISubscriber): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
        }
    }

    unsubscribe(subscriber: ISubscriber): void {
        this.subscribers = this.subscribers.filter(sub => sub != subscriber);
    }

    notifySubscribers(): void {
        this.subscribers.forEach(sub => sub.update(this));
    }

    uploadVideo(title: string): void{
        this.latestVideo = title;
        // console.log(this.name, 'uploaded ', title);
        this.notifySubscribers();
    }

    getVideoData(): string {
        return 'checkout '+ this.name + ' new video - ' + this.latestVideo;    
    }
}

class Subscriber extends ISubscriber {
    private name: string;

    constructor(name: string) {
        super();
        this.name = name
    }

    update(channel: Channel) {
        console.log('hey', this.name, channel.getVideoData());
    }
}

const channel = new Channel('fun facts malayalam');

const sub1 = new Subscriber('Sivajith');
const sub2 = new Subscriber('Greeshmar');

channel.subscribe(sub1);
channel.subscribe(sub2);

channel.uploadVideo('enthukondaaanu thummiyappo pearly maani bless you paranjath');

channel.unsubscribe(sub2);

channel.uploadVideo('ningalkkariyaamo')

