<img src="https://avatars2.githubusercontent.com/u/6412038?v=3&s=200" alt="react logo" title="react" align="right" width="64" height="64" />

# react-dnd-touch-backend

[![npm version](https://badge.fury.io/js/react-dnd-touch-backend.svg)](http://badge.fury.io/js/react-dnd-touch-backend)
[![Build Status](https://travis-ci.org/yahoo/react-dnd-touch-backend.svg?branch=master)](https://travis-ci.org/yahoo/react-dnd-touch-backend)
[![Dependency Status](https://david-dm.org/yahoo/react-dnd-touch-backend.svg)](https://david-dm.org/yahoo/react-dnd-touch-backend)
[![devDependency Status](https://david-dm.org/yahoo/react-dnd-touch-backend/dev-status.svg)](https://david-dm.org/yahoo/react-dnd-touch-backend#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/yahoo/react-dnd-touch-backend/badge.svg)](https://coveralls.io/r/yahoo/react-dnd-touch-backend)

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