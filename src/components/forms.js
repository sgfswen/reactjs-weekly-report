
import React, { Component } from 'react/addons';

import {
    RaisedButton,
    TextField
} from 'material-ui';

class Forms extends Component {

    constructor(props) {
        super(props);
    }
    
    handleSubmit( e ) {
        this.props.handleSubmit(e, this);
    }

    handleChange( e ) {
        this.props.handleChange(e, this);
    }

    render() {

        var items_inputs = this.props.inputs.map(function( item, i ){
            // if (item.type == 'textarea') {
            //     return <TextField multiLine={true} key={i} hintText={item.values} floatingLabelText={item.text} value={ item.values  } onChange={ this.handleChange.bind(this) } />
            // } else {
                return <TextField key={i} hintText={item.values} floatingLabelText={item.text} value={ item.values  } onChange={ this.handleChange.bind(this) } />
            // }
        }, this);

        return <form className="contents" onSubmit={this.handleSubmit.bind(this)}>
            {items_inputs}
            <div>
            {typeof this.props.isSelected === 'number' ? <RaisedButton label='修改' /> : <RaisedButton label='增加' secondary={true} /> }
            </div>
        </form>
    }
}

export default Forms;
