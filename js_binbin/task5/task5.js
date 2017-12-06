//事件绑定函数，兼容浏览器差异
function addEvent(obj, ev, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(ev, fn, false);
	}
	else if (obj.attachEvent) {
		obj.attachEvent("on", ev, fn);
	}
	else {
		obj["on" + ev] = fn;
	}
} 								

//遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
	for (var i=0; i < arr.length; i++) {
		var item = arr[i];
		var index = i;
		fn(item,index);
	}
}

window.onload = function() {
	var aBtns = document.getElementsByTagName('input'); //获取按钮
	var oCon = document.getElementById('container');

	//定义数组操作队列
	var queue = {
		arr : [],

		isEmpty: function() {
			return (this.arr.length == 0);
		},

		isFull: function() {
			return (this.arr.length > 60);
		},

		leftPush: function(num) {
			if(!this.isFull()) {
				this.arr.unshift(num);
				this.paint();
			}
			else {
				alert("theNumberOfDataExceedsTheLimit!")
			}
		},

		rightPush: function(num) {
			if(!this.isFull()) {
				this.arr.push(num);
				this.paint();
			}
			else {
				alert("theNumberOfDataExceedsTheLimit!")
			}
		},

		leftPop: function() {
			if(!this.isEmpty()) {									
				// alert(this.arr.shift());  
				if(confirm("DeleteFirstData:\'"+this.arr[0]+"\'?")) {
					this.arr.shift();
					this.paint();
				}
				else {
					alert("YouCancled");
				}
			}
			else {
				alert("ThereIsNoDataAnymore!");
			}
		},

		rightPop: function() {
			if(!this.isEmpty()) {
				if(confirm("DeleteLastData\'"+this.arr[this.arr.length-1]+"\'?")) {
					this.arr.pop();
					this.paint();
				}
				else {
					alert("YouCancled!");
				}
			}
			else {
				alert("ThereIsNoDataAnymore!");
			}
		},

		sortList: function() {
			this.arr.sort(function(a,b) {
				return a - b;
			})
			this.paint();
		},

		paint: function() {
			var str="";
			each(this.arr, function(item) {
				str += "<li style=\'height:" + parseInt(item) + "px\'></li>";
				// console.log(str);
			});
			oCon.innerHTML = str;
			addLiClick();
		},

		deleteID: function(id) {
			this.arr.splice(id, 1);
			this.paint();
		}
	}

	function addLiClick() {
		for(var i = 0; i < oCon.childNodes.length; i++) {
			addEvent(oCon.childNodes[i], "click", function(i) {
				return function(){
					return queue.deleteID(i);						//closure
				};
			}(i))
		}
	}

	
	

	addEvent(aBtns[1],"click",function(){
		var input = aBtns[0].value;
		if((/^[0-9]+$/).test(input)) {
			if(input<10||input>100) {
				alert("The interger you input must between 10 and 100!");
			}
			else {
				queue.leftPush(input);
			}
		}
		else {
			alert("Please enter an interger!")
		}
	});

	addEvent(aBtns[2],"click",function(){
		var input = aBtns[0].value;
		if((/^[0-9]+$/).test(input)) {
			if(input<10||input>100) {
				alert("The interger you input must between 10 and 100!");
			}
			else {
				queue.rightPush(input);
			}
		}
		else {
			alert("Please enter an interger!")
		}
	});

	addEvent(aBtns[3], "click", function(){queue.leftPop();})
	addEvent(aBtns[4],"click", function(){queue.rightPop();})
	addEvent(aBtns[5], "click", function(){queue.sortList()})
};