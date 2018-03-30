import {observer} from 'mobx-react';
import React, {Component} from 'react';

@observer
class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                {this.props.store.filePath}
            </div>
        );
    }
}

export default Footer;
