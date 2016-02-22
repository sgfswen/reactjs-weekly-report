
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
            <td>{this.props.item.proj}</td>
            <td>{this.props.item.subproj}</td>
            <td>{this.props.item.priority}</td>
            <td>{this.props.item.tech_t}</td>
            <td>{this.props.item.qa_t}</td>
            <td>{this.props.item.pub}</td>
            <td>{this.props.item.leader}</td>
            <td>{this.props.item.qa}</td>
            <td>{this.props.item.prod}</td>
            <td>{this.props.item.note}</td>
            <td><FlatButton onClick={this.handleDelete.bind(this)} label="删除" primary={true} /></td>
        </tr>)
    }
}

export default Trs;
