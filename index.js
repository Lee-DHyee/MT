    
    $('#delAll').prop('disabled',true);

    $.ajax({
      url:'data.json',
      method:'get',
      success:function(data){
         for(let i=0;i<data.length;i++){
          $('li:eq('+i+')').append('<img src="'+data[i].img+'" alt=""><span>'+data[i].name+'</span><span>'+data[i].price+'元/份</span><p>月销8148单</p><span>起送￥10元</span><span>免费送费</span><span>45分钟</span><button class="btn">加入购物车</button>')
         }  
      },
      dataType:'json',
      error:function(a,b,c){
          console.log(a,b,c,'---error')
      },
      data:{
          account:'zs',
          password:'123456',
          age:16
      }
  })
  //隐藏车
  $('#myCart').click(function(){
      $('#foods').slideUp(2000)
      $('#cart').slideDown(2000)
  })
  //隐藏表
  $('#toFoodView').click(function(){
      $('#cart').slideUp(2000)
      $('#foods').slideDown(2000)
  })
  //加购物车
  $('#foods').on('click','.btn',function(){
      var foodName=$(this).prev().prev().prev().prev().prev().prev().html()
      var price=parseFloat($(this).prev().prev().prev().prev().prev().html())
      var flag=false
      var ink=0
      $('table tr').each(function(index,em){
        if(foodName==em.cells[1].innerHTML){
          flag=true
          ink=index
        }
      })
      if(flag){
        // $(this).cells[3].children[1].value++
        // $('table').rows[ink].cells[3].children[1].value++
        $('table tr')[ink].cells[3].children[1].value++
      }else{
      $('table').append('<tr><td><input type="checkbox" name="che" class="temp"></td><td>'+foodName+'</td><td class="pri">'+price+'</td><td><input type="button" value="-" class="jian"><input type="text" value="1" readonly size="2" class="txt"><input type="button" value="+" class="jia"></td><td><input type="button" value="删除" class="delBtn"></td></tr>')
      }
      num()
  })
  //全选
  $('#all').click(function(){
      $(':checkbox:gt(0)').prop('checked',$(':checkbox:eq(0)').prop('checked'))
      // console.log(!$('#all').prop('checked'))
      $('#delAll').prop('disabled',!$('#all').prop('checked'))
      total()
  })
  //反选
  function disSelect(){
      var a=$(':checkbox:gt(0):checked').length==$('.temp').length
      $(':checkbox:eq(0)').prop('checked',a)
      $('#delAll').prop('disabled',!a);
      total()  
  }
  $('#cart').on('click','.temp',disSelect)
  //删除全部
  $('#delAll').click(function (){
      var flag=confirm('确定删除所有购物车商品吗?')
      if(flag){
          $('tr:gt(0)').remove()
          $('#all').prop('checked',false)
          $('#delAll').prop('disabled',!$('#all').prop('checked'))
          $('#total').html(0)
          total()
          num()
      }
      
  })
  //数量
  function num(){
    // console.log($('.txt').val())
  var con=0
     $('.txt').each(function(){
        con+=Number($(this).val())
      })   
      $('#myCart i').html(con) 
  }
  //删除单行
  $('table').on('click','.delBtn',function(){
    $(this).parents('tr').remove()
    total() 
    num()
    disSelect()
  })
  //加
  $('table').on('click','.jia',function(){
    var a=$(this).prev().val()
    a++
    $(this).prev().val(a)
    num()
    total()
  })
  //减
  $('table').on('click','.jian',function(){
    var a=$(this).next().val()
    a--
    $(this).next().val(a)
    if($(this).next().val()<1){
      $(this).next().val(1) 
    }
    num()
    total()
  })
  //总价
  function total(){
    var sum=0
    $('tr:gt(0)').each(function(){
      if($(this).find('.temp').prop('checked')){
        sum+=($(this).find('.pri').html())*($(this).find('.txt').val())
        // console.log($(this).find('.txt').val())
      }
      // console.log($(this).find('.temp'))
      $('#total').html(sum)
    })
  }
  //结算
  $('#account').click(function(){
    alert($('#total').html())
    $('tr:gt(0)').each(function(){
      if($(this).find('.temp').prop('checked')){
        $(this).remove()
        $('#total').html(0)
        $(':checkbox:eq(0)').prop('checked',false)
        $('#delAll').prop('disabled',!$('#all').prop('checked'))
        num()
      }
    })
  })       
    


    