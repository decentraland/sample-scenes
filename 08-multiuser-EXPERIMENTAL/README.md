# Multiuser Scene

This scene enables previewing your scene for multiuser testing. It reuses the interactive door example, except there can be multiple people in the scene at once.

After your CLI is installed, you're ready to first start up your local websocket server, then second, preview your scene.

**Starting the websocket server**

_from the scene directory:_

```
$:  cd server
$:  npm install
# npm will find your dependencies
$:  npm run build
# npm will build the socket server
$:  npm start
# now it's running -- mind the port it starts on
$:  cd ..
# back to the main scene directory
```

NOTE: edit the `scene.json` file to update the _websocket port_ to point at your local server. Probably `8087`.

Then, once the websocket server is up and the scene is pointed properly at it, fire up the preview like normal

_from the scene directory:_

```
$:  dcl preview
```

Any dependencies are installed and then the CLI will open the scene in a new browser tab automatically.
