
import React, { Component } from 'react/addons';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './components/header';
import Bodys from './components/bodys';

injectTapEventPlugin();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initdata:{
                rowData : window.localStorage.rowData ? JSON.parse(window.localStorage.rowData) : [],
                inputData : [
                    {
                        type: 'text',
                        values: '例：后台项目',
                        text: '项目'
                    },{
                        type: 'text',
                        values: 'A',
                        text: '子任务'
                    },{
                        type: 'text',
                        values: 'A',
                        text: '优先'
                    },{
                        type: 'text',
                        values: '7/20',
                        text: '开发'
                    },{
                        type: 'text',
                        values: '12/12',
                        text: '测试'
                    },{
                        type: 'text',
                        values: '12/12',
                        text: '上线'
                    },{
                        type: 'text',
                        values: '小a',
                        text: '技术人'
                    },{
                        type: 'text',
                        values: '小b',
                        text: 'QA'
                    },{
                        type: 'text',
                        values: '小s',
                        text: '产品'
                    },{
                        type: 'textarea',
                        values: 'delay了',
                        text: '备注'
                    }
                ]
            }
        }
    }

    render() {
        return <div>
            <Header />
            <div className="bodys">
                <Bodys init={this.state.initdata} />
            </div>
        </div>  
    }

}

React.render( <App />, document.getElementById('root') );
