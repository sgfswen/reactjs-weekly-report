
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
                        values: '【本周】【短期理财】详情页',
                        text: '项目名称'
                    },{
                        values: '已提测',
                        text: '当前进度'
                    },{
                        values: '7/10',
                        text: '计划完成时间'
                    },{
                        values: '7/20',
                        text: '计划上线时间'
                    },{
                        values: '提测至乐群',
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
