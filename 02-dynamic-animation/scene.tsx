import { Component, createElement } from "dcl-sdk";

const networkHz = 6;
const interval = 1000 / networkHz;

// The Component class is a React-style component.
export default class RollerCoaster extends Component<any, { time: number }> {
    state = { time: 0 };

    timeout = setInterval(() => {
        // As with React, we are tracking state changes and
        // telling the SDK when it's time to re-render
        this.setState({
            time: performance.now() * 0.0001
        });
    }, interval);

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    async render() {
        const { time } = this.state;

        const size = 2;

        // Here, we're just running some fun, wave animations
        const x = Math.cos(time) * Math.cos(time) * size;
        const y = Math.cos(time) * Math.sin(time) * size;
        const z = Math.sin(time) * size;

        // This is the API's secret sauce:  JSX Data Binding
        return (
            <a-scene>
                <a-entity position={{ x: 5, y: 4, z: 5 }}>
                    <a-entity
                        id="train"
                        position={{ x, y, z }}
                        rotation={{
                            x: Math.cos(time) * 40,
                            y: Math.sin(time) * 40,
                            z: 0
                        }}
                        transition={{
                            position: { duration: interval },
                            rotation: { duration: interval }
                        }}
                    >
                        <a-box position={{ x: 0, y: -1, z: 0 }} color="black" scale={{ x: 3, y: 0.4, z: 5 }} />
                        <a-box position={{ x: 1.5, y: 0, z: 0 }} color="red" scale={{ x: 0.2, y: 1, z: 5 }} />
                        <a-box position={{ x: -1.5, y: 0, z: 0 }} color="yellow" scale={{ x: 0.2, y: 1, z: 5 }} />
                        <a-box position={{ x: 0, y: 0, z: 2.5 }} color="green" scale={{ x: 3, y: 1, z: 0.2 }} />
                        <a-box position={{ x: 0, y: 0, z: -2.5 }} color="blue" scale={{ x: 3, y: 1, z: 0.2 }} />
                    </a-entity>
                </a-entity>
            </a-scene>
        );
    }
}
