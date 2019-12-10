
var delAall=document.getElementById('deleAll');
delAall.disabled=true;
//隐藏主界面
function payC(){
    var tabO=document.getElementById('tabO')
    var divT=document.getElementById('divT')
    tabO.style.display='none'
    divT.style.display='block'
}
//隐藏表格界面
function retu(){
    var tabO=document.getElementById('tabO')
    var divT=document.getElementById('divT')
    tabO.style.display='block'
    divT.style.display='none'
}

//表单
var count=0
function addO(name,price){
    var tabO=document.getElementById('tabT')
    var name=name
    var price=price
    var flag=false
    var con
    // var food=obj.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.cells[0].innerHTML
    // var price=obj.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.cells[1].innerHTML
    for(let i=1;i<tabO.rows.length;i++){ 
        if(tabO.rows[i].cells[1].innerHTML==name){
            flag=true
            con=i
        }    
    }
    if(flag==true){
        (tabO.rows[con].cells[3].children[1].value)++
    }else{
        var tr=tabO.insertRow(-1)
        tr.insertCell(0).innerHTML='<input type="checkbox" name="check" class="checkOn" onclick="temp();sumNum(this)">'
        tr.insertCell(1).innerHTML=name
        tr.insertCell(2).innerHTML=price
        tr.insertCell(3).innerHTML='<input type="button" value="+" class="addN" onclick="addNu(this)"><input type="text" class="numN" value="1"><input type="button" value="-" class="minN" onclick="minNu(this)">'
        tr.insertCell(4).innerHTML='<input type="button" value="删除" onclick="delR(this)">'
    }
    // var newArr=[]
    // for (var i = 0; i < tabO.rows.length; i++) {
    //     var flag = false;
    //     for (var j = 0; j < newArr.length; j++) {
    //       if (tabO.rows[i].cells[1].innerHTML === newArr[j]){
    //         flag = true;
    //         break;
    //       }
//         if(flag){
//             (tabO.rows[i].cells[3].children.nextSibling.value)++
//         }else{
//         var tr=tabO.insertRow(-1)
//         tr.insertCell(0).innerHTML='<input type="checkbox" name="check" class="checkOn" onclick="temp();sumNum(this)">'
//         tr.insertCell(1).innerHTML=name
//         tr.insertCell(2).innerHTML=price
//         tr.insertCell(3).innerHTML='<input type="button" value="+" class="addN" onclick="addNu(this)"><input type="text" class="numN" value="1"><input type="button" value="-" class="minN" onclick="minNu(this)">'
//         tr.insertCell(4).innerHTML='<input type="button" value="删除" onclick="delR(this)">'
//         }
//     // name==tabO.rows[i].cells[1].innerHTML
        
totalNum()
}
//加
function addNu(obj){
    obj.nextSibling.value++
    totalNum()
    sumNum()
}
//减
function minNu(obj){
    obj.previousSibling.value--   
    if(obj.previousSibling.value<1){
        obj.previousSibling.value=1     
    }
    totalNum()
    sumNum()
}
//删整行
function delR(obj){
    var tabT=document.getElementById('tabT')
    var tr=obj.parentElement.parentElement;
    tabT.deleteRow(tr.rowIndex)
    totalNum()
    sumNum()
    temp()
}
//全删
function dele(){
    var tabT=document.getElementById('tabT')
    var sumA=document.getElementById('sumA')
    var checkAll=document.getElementById('checkAll')
    if(checkAll.checked){
    for(let i=tabT.rows.length-1;i>=1;i--){
        tabT.deleteRow(i)
        checkAll.checked=false
        deleAll.disabled = true;
    }
    sumA.innerHTML=0
}
    totalNum()
    
}
//购物车数字
function totalNum(){
    var numN=document.getElementsByClassName('numN')
    var num=document.getElementById('num')
    var sum=0
    for(let i=0;i<numN.length;i++){
        sum+=Number(numN[i].value)
    }
    num.innerHTML=sum
}
//全选
function allCheck(obj){
    var checkAll=document.getElementById('checkAll');
	var deleAll=document.getElementById('deleAll');
	if(checkAll.checked){
		deleAll.disabled = false;
	}else{
		deleAll.disabled = true;
	}
    var checked=document.getElementsByClassName("checkOn")
    for(let i=0;i<checked.length;i++){
        checked[i].checked=obj.checked
    }
    sumNum()
}
//反选
function temp(){
    var checked=document.getElementsByClassName("checkOn")
    var checkA=document.getElementById('checkAll')
    var a=0
    for(let i=0;i<checked.length;i++){
        if(checked[i].checked){
            a++
        }
    }
    if(a==checked.length){
        checkA.checked=true
        deleAll.disabled = false;
    }else{
        checkA.checked=false
        deleAll.disabled = true;
    }
    sumNum()
}
//计算
function sumNum(){
    
    var sumA=document.getElementById('sumA') 
    // var numN=document.getElementsByClassName('numN') 
    var tabT=document.getElementById('tabT')
    var checked=document.getElementsByClassName("checkOn")
    // var numA=parseFloat(obj.parentElement.nextSibling.nextSibling.innerHTML)
    // console.log((tabT.rows[1].cells[3].children[1].value))
    var a=0
    for(let i=0;i<checked.length;i++){
        if(checked[i].checked){
            a+=(parseFloat(tabT.rows[i+1].cells[2].innerHTML))*(tabT.rows[i+1].cells[3].children[1].value)
        }
        sumA.innerHTML=a
    }
    // var aa=parseFloat(tabT.rows[1].cells[2].innerHTML)
    // console.log(aa)
    
}
//结算
function clearAu(){
    var tabT=document.getElementById('tabT')
    var sumA=document.getElementById('sumA')
    var checked=document.getElementsByClassName("checkOn")
    alert(sumA.innerHTML)
    for(let i=tabT.rows.length-1;i>=1;i--){
        if(checked[i-1].checked){
            tabT.deleteRow(i)
        }
    }
    sumA.innerHTML=0 
    totalNum()      
}         
    


    