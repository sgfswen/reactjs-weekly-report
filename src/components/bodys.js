
import React, { Component } from 'react/addons';

import { RaisedButton } from 'material-ui';

import Forms from './forms';

import Trs from './trs';

class Bodys extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.init
    }

    render() {

        var _forms = <Forms inputs={this.state.inputData} />;
        var forms = React.addons.cloneWithProps(_forms, {
            isSelected: this.state.isSelected,
            handleSubmit: this.handleSubmit.bind(this),
            handleChange: this.handleChange.bind(this)
        });

        var theads = this.state.inputData.slice(0);
        theads.push({ text: '操作' });
        var thead = theads.map(function( item, i ) {
            return <th key={i}>{item.text}</th>;
        })

        var items_trs = this.state.rowData.map(function(item, i){
            item.id = i;
            return <Trs key={i} item={item} />
        });

        var items = items_trs.map(function(item, i){
            return React.addons.cloneWithProps(item, {
                isSelected: this.state.isSelected,
                selectItem: this.selectItem.bind(this),
                deleteItem: this.deleteItem.bind(this)
            });
        }, this);

        return (
            <div className="user-detail">
                {forms}
                <div className="tableDiv">
                    <table className="uk-table uk-table-striped uk-text-left">
                        <thead>
                            <tr>{thead}</tr>
                        </thead>
                        <tbody>{items}</tbody>
                    </table>
                    <div className="export"><RaisedButton label='导出为table' primary={true} onClick={this.save.bind(this)} /></div>
                </div>
            </div>
        )
    }
// <pre><code>{JSON.stringify(this.state.rowData, null, '\t')}</code></pre>
// <div><RaisedButton label='保存到 localstorage' primary={true} onClick={this.save.bind(this)} /></div>
    selectItem( item, event ) {
        var _inputs = this.state.inputData.slice(0);
        _inputs[0].values = item.props.item.name;
        _inputs[1].values = item.props.item.status;
        _inputs[2].values = item.props.item.done;
        _inputs[3].values = item.props.item.online;
        _inputs[4].values = item.props.item.note;
        var _isSelected = item.props.item.id === item.props.isSelected ? false : item.props.item.id;
        if ( typeof _isSelected === 'number' ) {
            this.setState({
                inputData: _inputs,
                isSelected: _isSelected
            });
        } else {
            this.setState({
                isSelected: _isSelected
            })
        }
    }

    deleteItem( item, event ) {
        event.stopPropagation();
        var _items = this.state.rowData;
        _items.splice( item.props.item.id, 1 );
        this.setState({ rowData: _items });
        window.localStorage.rowData = JSON.stringify(this.state.rowData);
    }

    handleChange( e, item ) {
        var index = Array.prototype.slice.call( e.target.parentNode.parentNode.childNodes ).indexOf( e.target.parentNode );
        var _inputs = this.state.inputData.slice(0);
        _inputs[ index ].values = e.target.value;
        this.setState({ inputData: _inputs })
    }

    handleSubmit( e, forms ) {

        e.preventDefault();

        let list = document.querySelector('.contents').querySelectorAll('input');

        var error = false;
        
        Array.prototype.forEach.call(list, function( item ){
            if ( item ) {
                if ( !item.value ) {
                    alert('Value should\'n be empty');
                    error = true;
                }
            }
        });

        if ( !error ) {
            var items = this.state.rowData;
            if ( items[forms.props.isSelected] ) {
                items[forms.props.isSelected].name = list[0].value;
                items[forms.props.isSelected].status = list[1].value;
                items[forms.props.isSelected].done = list[2].value;
                items[forms.props.isSelected].online = list[3].value;
                items[forms.props.isSelected].note = list[4].value;
            } else {
                items.push( {
                    name: list[0].value,
                    status: list[1].value,
                    done: list[2].value,
                    online: list[3].value,
                    note: list[4].value
                } );
            }
            this.setState({ rowData: items });
            window.localStorage.rowData = JSON.stringify(this.state.rowData);
        }
    }


    tableCreate(el, data) {
        console.log(data);
        var tbl  = document.createElement("table");
        tbl.style.width  = "70%";
        tbl.id = "table_created";

        var tr_thead = tbl.insertRow();
        for (var i = 0; i < 5; ++i) {
            var th = tr_thead.insertCell();
            var name = i === 0 ? '项目名称'
                       : ( i === 1 ? '当前进度'
                          : ( i === 2 ? '计划完成时间'
                            : ( i === 3 ? '计划上线时间' 
                                : ( i === 4 ? '备注' : ''))));
            th.appendChild(document.createTextNode(name));
        }

        for (var i = 0; i < data.length; ++i)
        {
            var tr = tbl.insertRow();
            for (var j = 0; j < 5; ++j) {
                var td = tr.insertCell();
                var name = j === 0 ? 'name'
                           : ( j === 1 ? 'status'
                              : ( j === 2 ? 'done'
                                : ( j === 3 ? 'online' 
                                    : ( j === 4 ? 'note' : ''))));
                td.appendChild(document.createTextNode(data[i][name].toString()));
            }
        }
        document.body.appendChild(tbl);
        el.textContent = '<table>'+document.getElementById('table_created').innerHTML+'</table>';
        document.getElementById('table_created').remove();
    }
    save( e ) {
        this.tableCreate( document.getElementById('results') , this.state.rowData);
    }

}

export default Bodys;
