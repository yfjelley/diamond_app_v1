NaRadio组件配置说明
name：组件名称(类型为字符串)，非必须，常用于表单下作为唯一标识
data：初始默认已选数据(类型为字符串或数值)
list：初始默认已选数据json类型(类型为数组对象),默认格式为:[{value:'',text:''}]
initKey：内容自定义转换的数据格式(类型为对象),如:{id:'value',name:'text'}
color：组件主题色(类型为字符串),默认值为:#ea0a2a
mode：排版方式(类型为字符串),level:水平,vertical:垂直,默认值为:level
disabled：是否可用(类型为布尔值)，可选值：true/false，默认值为false(可用)
border：是否含边框(类型为布尔值)，可选值：true/false，默认值为false(不含)
onChange：值改变时函数，回传已选的value数组集合,已选的list数组对象集合
url：初始获取数据请求地址(类型为字符串),值存在时默认请求后端数据覆盖list
way：初始获取数据请求方式(类型为字符串),默认值为post
args：初始获取数据请求参数(类型为对象)
onSuccess：数据请求成功的回调函数，回传数据数组对象集合
onFail：数据请求失败的回调函数，回传异常信息

表单项数据集合案例如下：
data:0,
list:[{ name: '男',id: 0 },{ name: '女',id: 1 }],
initKey:{ id:'value',name:'text'}
调用组件传参方式参考如下：
常规调用时——
<NaRadio :data="data" :list="list" :initKey="initKey" :color="color" :mode="mode" :disabled="disabled" :onChange="getNaRadio"></NaRadio>
<NaRadio :data="data" :url="url" :args="args" :onChange="getNaRadio" :onSuccess="getNaRadioSuccess" :onFail="getNaRadioFail"></NaRadio>
         
父组件获取子组件数据，调用函数如下：
const getNaRadio = (data1,data2) =>{}
const getNaRadioSuccess = (data) =>{}
const getNaRadioFail = (data) =>{}
##################################################################
   
