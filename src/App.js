import {observer} from 'mobx-react';
import React, {Component} from 'react';
import './assets/scss/App.scss';

import {getSiblingImages, getFilename, changeImage} from './tools'

import 'electron-react-titlebar/assets/style.css';
import TitleBarMenu from "./components/TitleBarMenu";
import Footer from "./components/Footer";

const electronLocalshortcut = require('electron').remote.require('electron-localshortcut');


@observer
class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // registerShortcuts
        const thisWindow = require('electron').remote.getCurrentWindow();
        try {
            electronLocalshortcut.unregisterAll(thisWindow);
        } catch (e) {
            console.log(e);
        }
        electronLocalshortcut.register(thisWindow, 'up', () => {
            console.log('You pressed up');
            changeImage(this.props.store, false);

        });
        electronLocalshortcut.register(thisWindow, 'down', () => {
            console.log('You pressed down');
            changeImage(this.props.store, true);
        });
        electronLocalshortcut.register(thisWindow, 'left', () => {
            console.log('You pressed left');
            changeImage(this.props.store, false);

        });
        electronLocalshortcut.register(thisWindow, 'right', () => {
            console.log('You pressed right');
            changeImage(this.props.store, true);
        });

        // handle drag
        const holder = document.getElementById('root');

        holder.ondragover = () => {
            console.log('ondragover');
            return false;
        };

        holder.ondrop = (e) => {
            e.preventDefault();
            console.log('ondrop');

            for (let f of e.dataTransfer.files) {
                console.log('File(s) you dragged here: ', f.path)
                this.props.store.filePath = f.path;
            }

            return false;
        };

        setTimeout(() => {
            window.resizeBy(1, 1);
        }, 300);

        setInterval(() => {
            const filepath = this.props.store.filePath;
            if (filepath) {
                const siblingImages = getSiblingImages(filepath);
                //todo sort
                let position = 0;
                for (let i = 0; i < siblingImages.length; i++) {
                    if (getFilename(filepath) === siblingImages[i]) {
                        position = i;
                        break;
                    }
                }
                this.props.store.position = position;
                this.props.store.siblingImages = siblingImages;
            }
        }, 1000);
    }

    render() {
        let imageDivStyle = {};
        if (this.props.store.filePath) {
            imageDivStyle = {
                backgroundImage: `url("${this.props.store.filePath}")`,
                backgroundSize: `contain`
            };
        }
        return (
            <div style={{height: '100%'}}>
                <TitleBarMenu store={this.props.store}/>
                <div className="main-container" style={imageDivStyle}>
                    <Footer {...this.props}/>
                </div>


            </div>
        );
    }
}

export default App;
