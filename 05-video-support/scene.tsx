import { Component, createElement } from "metaverse-api";

export default class Video extends Component {
    state = {
        localPlaying: false,
        externalPlaying: false,
        volume: 50
    };

    async componentDidMount() {
        this.initVideoEvents();
    }

    initVideoEvents = () => {
        this.eventSubscriber.on("video-local_click", async (evt: any) => {
            this.toggleLocalVidPlayback();
        });
    };

    toggleLocalVidPlayback() {
        if (this.state.localPlaying) {
            this.state.localPlaying = false;
        } else {
            this.state.localPlaying = true;
        }
    }

    async render() {
        return (
            <a-scene>
                <a-video
                    id="video-local"
                    position={{ x: 2.5, y: 2, z: 1 }}
                    width={4}
                    height={2.5}
                    src="video/big-buck-bunny.mp4"
                    play={this.state.localPlaying}
                    volume={this.state.volume}
                />
            </a-scene>
        );
    }
}
