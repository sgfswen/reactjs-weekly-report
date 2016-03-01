
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
        _inputs[0].values = item.props.item.proj;
        _inputs[1].values = item.props.item.subproj;
        _inputs[2].values = item.props.item.priority;
        _inputs[3].values = item.props.item.tech_t;
        _inputs[4].values = item.props.item.qa_t;
        _inputs[5].values = item.props.item.pub;
        _inputs[6].values = item.props.item.leader;
        _inputs[7].values = item.props.item.qa;
        _inputs[8].values = item.props.item.prod;
        _inputs[9].values = item.props.item.note;
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

        // var error = false;
        
        // Array.prototype.forEach.call(list, function( item ){
        //     if ( item ) {
        //         if ( !item.value ) {
        //             alert('Value should\'n be empty');
        //             error = true;
        //         }
        //     }
        // });

        // if ( !error ) {
            var items = this.state.rowData;
            if ( items[forms.props.isSelected] ) {
                items[forms.props.isSelected].proj      = list[0].value;
                items[forms.props.isSelected].subproj   = list[1].value;
                items[forms.props.isSelected].priority  = list[2].value;
                items[forms.props.isSelected].tech_t    = list[3].value;
                items[forms.props.isSelected].qa_t      = list[4].value;
                items[forms.props.isSelected].pub       = list[5].value;
                items[forms.props.isSelected].leader    = list[6].value;
                items[forms.props.isSelected].qa        = list[7].value;
                items[forms.props.isSelected].prod      = list[8].value;
                items[forms.props.isSelected].note      = list[9].value;
            } else {
                items.push( {
                    proj     : list[0].value,
                    subproj  : list[1].value,
                    priority : list[2].value,
                    tech_t   : list[3].value,
                    qa_t     : list[4].value,
                    pub      : list[5].value,
                    leader   : list[6].value,
                    qa       : list[7].value,
                    prod     : list[8].value,
                    note     : list[9].value
                } );
            }
            this.setState({ rowData: items });
            window.localStorage.rowData = JSON.stringify(this.state.rowData);
        // }
    }


    tableCreate(el, data) {
        document.getElementById('table_created') && document.getElementById('table_created').remove();
        var tbl  = document.createElement("table");
        tbl.style.border = '1px solid #ccc';
        tbl.id = "table_created";

        var tr_thead = tbl.insertRow();
        for (var i = 0; i < 10; ++i) {
            var th = tr_thead.insertCell();
            th.style.padding = '10px';
            th.style.background = '#f0f0f0';
            th.style.fontWeight = 'bold';
            if ( i != 9 ) th.style.borderRight = '1px solid #ccc';
            var name = i === 0 ? '项目'
                        : i === 1 ? '子任务'
                        : i === 2 ? '优先'
                        : i === 3 ? '开发' 
                        : i === 4 ? '测试'
                        : i === 5 ? '上线'
                        : i === 6 ? '技术人'
                        : i === 7 ? 'QA'
                        : i === 8 ? '产品'
                        : i === 9 ? '备注'
                        : '';
            th.appendChild(document.createTextNode(name));
        }

        for (var i = 0; i < data.length; ++i)
        {
            var tr = tbl.insertRow();
            // if ( i % 2 === 0 ) tr.style.background = '#eee';
            tr.style.borderTop = '1px solid #ccc';
            for (var j = 0; j < 10; ++j) {
                var td = tr.insertCell();
                td.style.padding = '10px';
                if ( j !== 9 ) td.style.borderRight = '1px solid #ccc';
                td.style.maxWidth = '300px';
                if (j>2 && j<6) {
                    td.onclick = function () {
                        console.log(this.style.background)
                        if (this.style.background == '') {
                            this.style.background = 'rgba(186, 218, 85, 0.6)'
                        } else if (this.style.background == 'rgba(186, 218, 85, 0.6)') {
                            this.style.background = 'rgba(255, 51, 51, 0.6)'
                        } else if (this.style.background == 'rgba(255, 51, 51, 0.6)') {
                            this.style.background = ''
                        }
                        el.textContent = '<table>'+document.getElementById('table_created').innerHTML+'</table>';
                    }
                }
                var name = j === 0 ? 'proj'
                        : j === 1 ? 'subproj'
                        : j === 2 ? 'priority'
                        : j === 3 ? 'tech_t' 
                        : j === 4 ? 'qa_t'
                        : j === 5 ? 'pub'
                        : j === 6 ? 'leader'
                        : j === 7 ? 'qa'
                        : j === 8 ? 'prod'
                        : j === 9 ? 'note'
                        : '';
                td.innerHTML = data[i][name].toString().replace(/\\n/g, '<br>');
            }
        }
        document.getElementById('preview').appendChild(tbl);
        el.textContent = '<table>'+document.getElementById('table_created').innerHTML+'</table>';
    }
    save( e ) {
        this.tableCreate( document.getElementById('results') , this.state.rowData);
    }

}

export default Bodys;
