import {observer} from 'mobx-react';
import React, {Component} from 'react';
import { TitleBar } from 'electron-react-titlebar';
import iconPath from '../img/logo.png';

@observer
class TitleBarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render(){
        const menuTemplate = [
            {
                label: 'Settings',
                submenu: [
                    // {
                    //     label: 'Disabled',
                    //     enabled: false,
                    // },
                    // {
                    //     label: 'Not Visiable',
                    //     visiable: false,
                    // },
                    // {
                    //     label: 'Arguments',
                    //     click: (item, win, e) => console.log(item, win, e),
                    // },
                    // {type: 'separator'},
                    {
                        label: 'Open Dev Tools',
                        click: (item, win, e) => {
                            win.openDevTools()
                        },
                    },
                    {
                        label: 'Resizable',
                        type: 'checkbox',
                        checked: true,
                        click: (item, win, e) => remote.getCurrentWindow().setResizable(item.checked),
                    },
                    {
                        label: 'Reload',
                        accelerator: 'CmdOrCtrl+R',
                        click: (item, win, e) => location.reload(),
                    },
                    {
                        label: 'Quit',
                        click: () => {
                            window.close()
                        },
                    },
                ],
            }
        ];

        return(
            <TitleBar menu={menuTemplate} icon={iconPath} />
        )
    }
}
export default TitleBarMenu;
