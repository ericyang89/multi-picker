import React, { ReactNode } from 'react';
import Popup from './Popup';
import {List,Checkbox} from 'antd-mobile'
import invariant from 'invariant';
const CheckboxItem=Checkbox.CheckboxItem;
const defaultBarString='请选择';
import './index.css'

const defaultProps={
  barLabel:'选项',
};
type Value=string|number;
type Data={
  label:string;
  value:Value;
}

type ReqiureProps={
  data:Data[];
  values:Value[];
  onChange:(values:any[])=>any;
}

type Props=ReqiureProps & Partial< typeof defaultProps>

const getStateKey=(originValue)=>`inner${originValue}`;


export default class AbstractPicker extends React.Component<Props> {
  static defaultProps=defaultProps;

  static getDerivedStateFromProps(nextProps, prevState){
    const {data,values}=nextProps;
    if(Array.isArray(data)&&Array.isArray(values)){
      let res={};
      data.forEach(dataItem=>{
        // 仅第一次给默认值
        if(prevState[getStateKey(dataItem.value)]===undefined){
          res[getStateKey(dataItem.value)]= values.includes(dataItem.value)
        }
      });

      return res;
    }else{
      invariant(false,`data and values all should be an Array!`);
    }
  }
  state={
    isModalShow:false,
    lastState:null
  }

  onOk = () => {
    this.setState({isModalShow:false});
    const values= this.props.data
    .map(item=>({
      key:item.value,
      isSelected:this.state[getStateKey(item.value)]
    }))
    .filter(item=>item.isSelected)
    .map(item=>item.key);
    this.props.onChange(values);
  }

  onDismiss=()=>{
    const itemData=this.state.lastState;
    this.setState({isModalShow:false,...itemData});
  }

  onCheckBoxChange=(value)=>{
    console.log(3333)
    const stateKey=getStateKey(value);
    this.setState({
      ...this.state,
      [stateKey]:!this.state[stateKey]
    });
  }

  getContent:()=>JSX.Element=()=>{
    return(
    <div style={{
      maxHeight:"8rem",
      overflow:"scroll"
    }}>
      <List >
        {this.props.data.map(item=><CheckboxItem
        key={item.value}
        onChange={()=>this.onCheckBoxChange(item.value)}
        checked={this.state[getStateKey(item.value)]}
        >{item.label}</CheckboxItem>)}
      </List>
    </div>
    );

  }

  onBarClick=()=>{
    const {isModalShow,lastState,...itemData}=this.state;
    this.setState({isModalShow:true,lastState:itemData});
  }

  render() {
    const {
      barLabel,
    } = this.props;

    let barString=this.props.data
    .map(item=>({
      isSelected:this.state[getStateKey(item.value)],
      label:item.label
    }))
    .filter(item=>item.isSelected)
    .map(item=>item.label).join(',');

    if(''===barString){
      barString=defaultBarString
    }

    return (
      <div>
        <div className="am-list-item am-list-item-middle">
          <div className="am-list-line" onClick={this.onBarClick}>
            <div className="am-list-content">{barLabel}</div>
            <div className="am-list-extra">{barString}</div>
            <div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
          </div>
          <div className="am-list-ripple" style={{display: "none"}}></div>
        </div>
        <Popup
          visible={this.state.isModalShow}
          onDismiss={this.onDismiss}
          onOk={this.onOk}
          content={this.getContent()}
        />
      </div>
    );
  }
}
