import React,{SFC}from 'react';
import {Modal} from 'antd-mobile'

type Prop={
  content:JSX.Element;
  visible:boolean;
  onDismiss:()=>any;
  onOk:()=>any;
}



const getModal:SFC<Prop> = ({ content, visible, onDismiss, onOk }) => {
  if (!visible) {
    return null;
  }
  const prefixCls='rmc-picker-popup';
  return (
    <Modal
      popup
      visible={visible}
      animationType="slide-up"
    >
      <div>
      <div className="am-picker-popup-header" >
        <div className="am-picker-popup-item am-picker-popup-header-left" onClick={onDismiss}>取消</div>
        <div className="am-picker-popup-item am-picker-popup-title"></div>
        <div className="am-picker-popup-item am-picker-popup-header-right" onClick={onOk}>确定</div>
      </div>
        {content}
      </div>
    </Modal>
  );
};

export default getModal;
