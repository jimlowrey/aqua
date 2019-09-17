'use strict';
const PropTypes = require('prop-types');
const React = require('react');
const Manifest = require('../../../public/pages/asset-manifest.json');


const propTypes = {
    markup: PropTypes.node,
    helmet: PropTypes.object,
    state: PropTypes.object
};


class MainPage extends React.Component {
    render() {

        return (
            <html>
                <head>
                    {this.props.helmet.title.toComponent()}
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    {this.props.helmet.meta.toComponent()}
                    <link rel="stylesheet" href="/public/core.min.css" />
                    <link rel="stylesheet" href="/public/pages/main.min.css" />
                    <link rel="shortcut icon" href="/public/media/favicon.ico" />
                    {this.props.helmet.link.toComponent()}
                </head>
                <body>
                    <div id="app-mount"
                        dangerouslySetInnerHTML={{
                            __html: this.props.markup
                        }}
                    />
                    <script id="app-state"
                        dangerouslySetInnerHTML={{
                            __html: this.props.state
                        }}
                    />

                    {Manifest.entrypoints.main.js.map((i) => <script key={i} src={i}></script>)}
                </body>
            </html>
        );
    }
}


MainPage.propTypes = propTypes;


module.exports = MainPage;
