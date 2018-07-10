import { createElement, ScriptableScene } from "metaverse-api";



export default class HouseScene extends ScriptableScene {
    state = {
        isDoorClosed: false,
        boxPosition: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        buttonState: 1
    };

    sceneDidMount() {
        this.subscribeTo("click", e => {
            console.log(e.pointerId);
            this.setState({ isDoorClosed: !this.state.isDoorClosed });
        });
        this.subscribeTo('positionChanged', e => {
            this.setState({ boxPosition: e.position });
            
           
          });
        this.subscribeTo('rotationChanged', e => {
            this.setState({ rotation: e.rotation});
            this.state.rotation.x +=  90 ;
            console.log(e.quaternion);
          });
        this.subscribeTo("pointerUp", e => {
            console.log("pointer up");
            this.setState({ buttonState: 1});
        });
        this.subscribeTo("pointerDown", e => {
            console.log("pointer down");
            this.setState({ buttonState: 0});
        });

    }

    async render() {
        const doorRotation = {
            x: 0,
            y: this.state.isDoorClosed ? 0 : 90,
            z: 0
        };

        return (
            <scene position={{ x: 5, y: 0, z: 5 }}>
                <entity rotation={doorRotation} transition={{ rotation: { duration: 1000, timing: "ease-in" } }}>
                    <box id="door" scale={{ x: 1, y: 2, z: 0.05 }} position={{ x: 0.5, y: 1, z: 0 }} color="brown" />
                </entity>
                <cone position={{ x: 0, y: 1, z: 2 }} rotation={this.state.rotation}/>
                <box position={this.state.boxPosition} ignoreCollisions />
                <box position={{ x: 2, y: 1, z: 0 }} scale={{ x: 2, y: 2, z: 0.05 }} color="blue" />
                <box position={{ x: -1, y: 1, z: 0 }} scale={{ x: 2, y: 2, z: 0.05 }} color="blue" />
                <box id="button" 
                    position={{ x: 3, y: this.state.buttonState, z: 3 }} 
                    transition={ { position: { duration: 200, timing: "linear" } } } 
                    />
            </scene>
        );
    }
}
