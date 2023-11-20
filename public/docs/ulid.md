I have a pretty simple react project setup:

```js
import React from 'react'
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'

const markdown = '# Hi, *Pluto*!'

createRoot(document.body).render(<Markdown>{markdown}</Markdown>)
```

    ├── app.js
    ├── components
    │   ├── MainWrapper.js
    │   └── html.js
    ├── package.json
    └── server.js

The application is started by:

    node server.js

Which uses the express server and renders markup for an HtmlComponent in html.js:


    import React from 'react';
    import MainWrapper from './MainWrapper.js'

    class HtmlComponent extends React.Component {
        render() {
            return (
                <html>
                    <head>
                        <meta charSet="utf-8" />
                        <title>My Awesome Site</title>
                        <meta name="viewport" content="width=device-width, user-scalable=no" />
                        <link rel="stylesheet" href="awesome.css" />
                    </head>
                    <body>
                        <div id="root"></div>
                    </body>
                </html>
            )
        }
    }

    export default HtmlComponent;


The goal is to create a Wrapper that will fill the 'root' div.  It's very simple right now:

MainWrapper.js:

    import React from 'react';
    import ReactDOM from 'react-dom';

    var MainWrapper = React.createClass ({
    	render: function() {
    		return (
    			<button>go</button>
    		)
    	}
    });

    React.render(<MainWrapper />, document.getElementById("root"));

When I run node server.js there's an exception:

    /Users/me/Desktop/Simple/components/MainWrapper.js:36
    _react2['default'].render(_react2['default'].createElement(MainWrapper, null), document.getElementById("root"));
                                                                                   ^

    ReferenceError: document is not defined
        at Object.<anonymous> (/Users/me/Desktop/Simple/components/MainWrapper.js:27:31)
        at Module._compile (module.js:425:26)
        at normalLoader (/Users/me/Desktop/Simple/node_modules/babel-core/lib/api/register/node.js:199:5)
        at Object.require.extensions.(anonymous function) [as .js] (/Users/me/Desktop/Simple/node_modules/babel-core/lib/api/register/node.js:216:7)
        at Module.load (module.js:356:32)
        at Function.Module._load (module.js:311:12)
        at Module.require (module.js:366:17)
        at require (module.js:385:17)
        at Object.<anonymous> (/Users/me/Desktop/Simple/components/Html.js:5:26)
        at Module._compile (module.js:425:26)

I do not understand why document is not defined.  It seems it's simple javascript.