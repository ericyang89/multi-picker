import React, { Component } from 'react';
import { render } from 'react-dom'
import { Picker, List } from 'antd-mobile'
import MultiPicker from './../src'

const data = [
  {
    label: "22text",
    value: 22
  },
  {
    label: "33text",
    value: 33
  },
  {
    label: "44text",
    value: 44
  },
  {
    label: "55text",
    value: 55
  },
  {
    label: "55text",
    value: 66
  },
  {
    label: "55text",
    value: 77
  }
];

const values=[22,33]

class App extends Component {

  onChange=(values:any[])=>{
    console.log('this is values',values);
  }

  render() {

    return (
      <div>
        <MultiPicker data={data} values={values} onChange={this.onChange} ></MultiPicker>
        {/* <div>
          <List>
            <Picker
              data={data}
            >
              <List.Item arrow="horizontal">Multiple & cascader</List.Item>
            </Picker>
          </List>
        </div> */}

      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('root'));

