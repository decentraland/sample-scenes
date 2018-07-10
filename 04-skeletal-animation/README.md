# Skeletal Animation

In your scenes, you can load up an interactive GLTF model and trigger its embedded animations. This is an example of how to access those animations.

[![shark swimming in the air](https://img.youtube.com/vi/Xf0D2hROq_g/0.jpg)](https://www.youtube.com/watch?v=Xf0D2hROq_g)

You can learn more about skeletal animation support in our documentation: https://docs.decentraland.org/

**Install the CLI**

Download and install the Decentraland CLI by running the following command

```bash
npm i -g decentraland
```

For a more details, follow the steps in the [Installation guide](https://docs.decentraland.org/documentation/installation-guide/).


**Previewing the scene**


Once you've installed the CLI, download this example and navigate to its directory from your terminal or command prompt.

_from the scene directory:_

```
$:  dcl preview
```

Any dependencies are installed and then the CLI will open the scene in a new browser tab automatically.

**Usage**

The shark constantly moves with the `swim` animation. If you walk up to the shark, point at it and click it, then it will  also start looping the `bite` animation.



