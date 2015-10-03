# react-dnd-touch-backend
Touch Backend for [react-dnd](https://github.com/gaearon/react-dnd)

## Usage
Follow [react-dnd docs](http://gaearon.github.io/react-dnd/) to setup your app. Then swap out `HTML5Backend` for `TouchBackend` as such:

```js
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

var YourApp = React.createClass(
  /* ... */
);

module.exports = DragDropContext(TouchBackend)(YourApp);
```
## Examples
The `examples` folder has a sample integration. In order to build it, run:
```bash
npm i && gulp example
```
Then, open `examples/index.html` in a mobile browser.

Code licensed under the MIT license. See LICENSE file for terms.