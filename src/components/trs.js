
import React, { Component } from 'react/addons';

import { FlatButton } from 'material-ui';

class Trs extends Component {

    constructor(props) {
        super(props);
    }

    handleChange( e ) {
        this.props.selectItem(this, e);
    }
    
    handleDelete( e ) {
        this.props.deleteItem(this, e);
    }

    render() {
        return (<tr key={this.props.item.id} onClick={this.handleChange.bind(this)} className={ this.props.isSelected === this.props.item.id ? 'selected' : '' }>
            <td>{this.props.item.name}</td>
            <td>{this.props.item.status}</td>
            <td>{this.props.item.done}</td>
            <td>{this.props.item.online}</td>
            <td>{this.props.item.note}</td>
            <td><FlatButton onClick={this.handleDelete.bind(this)} label="删除" primary={true} /></td>
        </tr>)
    }
}

export default Trs;
