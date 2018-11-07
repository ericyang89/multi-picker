# multi-picker
a multi selector like antd-mobile Piker.

It have peer dependency of `react 16.4+` and `antd-mobile`

## screenshot
![pic](https://img.douyucdn.cn/data/yuba/weibo/2018/11/07/201811071157059970691258903.png)

## install
```shell
npm i react-multi-picker --save

# or

yarn react-multi-picker
```

## usage
```javascript
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
        <MultiPicker barLabel={'testSelector'}  data={data} values={values} onChange={this.onChange} ></MultiPicker>
      </div>
    );
  }
}


```

## api

```javascript
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

```
