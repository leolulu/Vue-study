# Vue-study
[toc]
## 基础使用方法
1. `npm install vue`
2. 引包（用script标签）
3. `new Vue`得到Vue实例
4. 
```html
<div id="app">
		<p>{{message}}</p>
		<!-- {{ }} Vue会把该语法解析渲染 
		绑定的数据成员必须显式地初始化到data选项中 -->
</div>

<script>
		const app = new Vue({
			el:'#app',//el选项的作用就是告诉Vue管理模板的入口节点
			data:{
				message:'Hello Vue.js!'
			}
			//data中的数据不是一般数据,这种数据一般会被绑定到视图中
			//这种数据被称之为：响应式数据
			//数据驱动视图，当数据发生改变，
			//那么所有绑定该数据的DOM都会跟着改变（MVVM）
		})
</script>
```
## 双向数据绑定
### 概念
* **指令**带有前缀`v-`，以表示它们是Vue提供的特殊特性。
* 它们会在渲染的DOM上应用特殊的响应式行为。
### v-model(表单专用)
```
<div id="app">
	<input type="text" v-model="message">	
</div>
```
* **v-model**是Vue提供的一个特殊的属性，在Vue中被称之为**指令**
* 它的作用就是：双向绑定表单控件
* 双向数据绑定：当数据发生改变，DOM会自动更新
* 当表单控件的值发生改变，数据也会自动得到更新
### v-bind
```js
v-bind:title="message"
```
* 绑定DOM元素的**属性**
* 将这个元素节点的`title`特性和Vue实例的`message`属性保持一致
#### 属性内字符串拼接
需要进行属性内字符串拼接时可以用这样的语法：`v-bind:href="'/todos#id='+i.id"`
> " "内的语法和{{ }}中的一模一样
### v-if
```
<p v-if="seen">现在你看到我了</p>

const app = new Vue({
    el:"#app",
    data:{
        seen:true
    }
})
```
* 除了可以把数据绑定到DOM文本或特性（属性）上之外
* 还可以绑定到DOM结构
#### 多个元素分组渲染
* 使用`template`元素
```
<temploate v-if="ok">
    <div>div1</div>
    <div>div2</div>
    <div>div3</div>
</temploate>
```
### v-for
```
<div id="app">
	<ol>
		<li v-for="i in todos">
			{{ i.text }}
		</li>
	</ol>
</div>

const app = new Vue({
	el:"#app",
	data:{
		todos:[
		{text: '1'},
		{text: '2'},
		{text: '3'}
		]
	}
})
```
### v-on
```
<div id="app">
	<p>{{message}}</p>
	<button v-on:click="reverse">逆转消息</button>
</div>

<script>
const app = new Vue({
	el:"#app",
	data:{
		message:"Hello Vue.js!"
	},
	methods:{
		reverse: function(){
			this.message = this.message.split('').reverse().join('')
		}
	}
})
</script>
```
 * 使用`v-on`指令添加一个事件监听器，通过它调用在Vue实例中定义的方法
 * 方法不要放在实例的`data`中，放在实例的`methods`中
 * 在方法中使用`this`来指向本实例中的data中的变量
### v-html
 * 绑定输出html
### v-once
 * 只绑定一次
## 事件处理
### 事件修饰符
Vue.js 为 v-on 提供了事件修饰符。
修饰符是由点开头的指令后缀来表示的。
`.stop`
`.prevent`
`.capture`
`.self`
`.once`
`.passive`
```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```
### 按键修饰符
`v-on:keyup.keyCode=""`
```
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit">
```
`.enter`
`.tab`
`.delete`
`.esc`
`.space`
`.up`
`.down`
`.left`
`.right`
## Class与Style绑定
### 基本使用
```js
<div v-bind:class="{active: isActive, 'text-danger': hasError}"></div>

data:{
	isActive: true,
	hasError: false
}
```
### 数组语法
```js
<div v-bind:class="[acriveClass, errorClass]"></div>

data:{
	acriveClass: 'active',
	errorClass: 'text-danger'
}
```
也可以在数组语法中使用对象语法
```
<div v-bind:class="[{active: isActive}, errorClass]"></div>
```
### 对象语法
`v-bind:style`
#### ***原始方法***
```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<script>
    data: {
     activeColor: 'red',
     fontSize: 30
    }
</script>
```
#### ***更清晰的方法***
直接绑定到一个样式对象
```
<div v-bind:style="styleObject"></div>

<script>
    data:{
    		styleObject:{
    		color:'red',
    		fontSize:'13px'
    	}
    }
</script>
```
#### ***其他***
> 对象语法常常结合返回对象的计算属性使用
## 表单输入绑定
### 个人总结
> 在表单绑定中，`v-model`的作用就是`name`
### 复选框
* 单个复选框，绑定到布尔值
```
<input type="checkbox" v-model="checked" id="checkbox1">
<label for="checkbox1">{{checked}}</label>
```
* 多个复选框，绑定到同一个数组
```
<div id='example-3'>
	<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
	<label for="jack">Jack</label>
	<input type="checkbox" id="john" value="John" v-model="checkedNames">
	<label for="john">John</label>
	<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
	<label for="mike">Mike</label>
	<br>
	<span>Checked names: {{ checkedNames }}</span>
</div>

<script>
	new Vue({
		el: '#example-3',
		data: {
			checkedNames: []
		}
	})
</script>
```
### 单选按钮
```
<div id="example-4">
	<input type="radio" id="one" value="One" v-model="picked">
	<label for="one">One</label>
	<br>
	<input type="radio" id="two" value="Two" v-model="picked">
	<label for="two">Two</label>
	<br>
	<span>Picked: {{ picked }}</span>
</div>

<script type="text/javascript">
	new Vue({
		el: '#example-4',
		data: {
			picked: ''
		}
	})	
</script>
```
### 选择框
#### 单选
```
<div id="example-5">
	<select v-model="selected">
		<option disabled value="">请选择</option>
		<option>A</option>
		<option>B</option>
		<option>C</option>
	</select>
	<span>Selected: {{ selected }}</span>
</div>

<script type="text/javascript">
	new Vue({
		el: '...',
		data: {
			selected: ''
		}
	})
</script>
```
#### 复选
```
<div id="example-5">
	<select v-model="selected">
		<option v-for="option in options" v-bind:value="option.value">
			{{ option.text }}
		</option>
	</select>
	<span>Selected: {{ selected }}</span>
</div>

<script type="text/javascript">
	new Vue({
		el: '...',
		data: {
			selected: 'A',
			options: [
			{ text: 'One', value: 'A' },
			{ text: 'Two', value: 'B' },
			{ text: 'Three', value: 'C' }
			]
		}
	})
</script>
```
## 组件
### 基础案例
```
Vue.component('button-counter',{
	data:function(){
	return {
	    count: 0
	    }
    },
    template:'<button v-on:click="count++">点击{{count}}次</button>'
})
```
```
<div id="app">
	<button-counter></button-counter>
</div>
```
* 组件是可复用的 Vue 实例，且带有一个名字
* 我们可以在一个通过 new Vue 创建的 Vue 根实例中，把组件作为自定义元素来使用
* *组件的复用*：每用一次组件，就会有一个它的新的**实例**被创建
+ **一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝**
```
data: {
  count: 0
}
```
↓
```
data: function () {
  return {
    count: 0
  }
}
```
### 组件的注册
* 为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别
* 这里有两种组件的注册类型：**全局注册**和**局部注册**
* 至此，我们的组件都只是通过`Vue.component`全局注册的：
#### 全局注册
```
Vue.component('my-component-name', {
  // ... options ...
})
```
+ 全局注册的组件可以用在其被注册之后的任何 (通过 new Vue) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中
#### 局部注册
```
const app = new Vue({
	el:'#app',
	components:{
		'date-input':{
		template:`
		<p class="cred">我是一个P</p>
		`}
	}
})
```
### Prop
* Prop 是你可以在组件上注册的一些自定义特性。
* 当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。
`props:[]`
```
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
* 在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 data 中的值一样。
一个典型的应用(**结合上述组件模板↑**)：
```
<blog-post>
	v-for="post in posts"
	v-bind:key="post.id"
	v-bind:title="post.title"
</blog-post>

<script>
	new Vue({
		el: '#blog-post-demo',
		data: {
			posts: [
			{ id: 1, title: 'My journey with Vue' },
			{ id: 2, title: 'Blogging with Vue' },
			{ id: 3, title: 'Why Vue is so fun' }
			]
		}
	})
</script>
```
#### 传递prop的值
##### 静态传值
```
<blog-post title="My journey with Vue"></blog-post>
```
##### 动态传值
```
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post v-bind:title="post.title + ' by ' + post.author.name"></blog-post>
```
##### 传入一个对象的所有属性
* 如果你想将一个对象的所有属性都作为 prop 传入
* 可以使用不带参数的 v-bind (取代 v-bind:prop-name)。
```
<blog-post v-bind="post"></blog-post>
```
等价于
```
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```
### 单个根元素进行组件优化
* 优化之前
```
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>
```
* 优化之后
     * 进行重构
     * 变成接收一个单独的`prop`
     * 也就是接收一个单个的对象（一个包含各种属性的对象）
     * 而不是直接把很多个属性直接放在`prop`里面
```
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
```
相应的，注册组件也需要更改↓
```
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```
* 将多个`v-bind`属性合并成一个`v-bind`对象
* 将注册组件中`props`中的一个个属性合并成一个对象
    * 对象名为`v-for`中的那一个`i`的名字
* `template`中的`{{属性}}`改成`{{i.属性}}`**(重要)**
* **总之就是要改三个地方**
    * **组件实例的v-bind**
    * **注册组件的props**
    * **注册组件的template**
### 自定义事件
`$emit`由组件内部template中的元素通过组件自己的method抛出事件，由组件本身（父元素）接收
## 其他
当事件处理函数没有传参的时候，第一个参数就是默认的是事件源对象：event
当手动传递了参数的时候，就没办法获取默认的event事件源对象
这个时候我们可以手动在调用方法的时候传递$event，来接收这个event事件源对象






