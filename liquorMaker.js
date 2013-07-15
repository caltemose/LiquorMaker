var liqrmakr = liqrmakr || {};
liqrmakr.calculator = (function($) {
  var container;
  
  function initialize(options) {
	container = options.container;
  }
  function roundAmount(amt) {
    return Math.round(amt);
  }
  function isBad(value) { 
    return value === '' || isNaN(value);
  }
  function resetFields() {
    $('#percent_used').val(95);
    $('#target_percent').val(34);
    $('#syrup_add').val('');
    $('#syrup_add_help').text('The syrup recipe will appear here.');
    $('#liquid_total').val('');
    $('#amount_flavored').val('');
  }
  return {
    init: initialize
  }
})(jQuery);


$(function(){
  liqrmakr.calculator.init({container:$('#liqrmakr')});
});

/*

    <form id="lm_form">
      
      <label>
        Amount flavored:
        <input type="number" size="20" name="amount_flavored" />
        <small></small>
      </label>
        
      <label>
        Percent alcohol used:
        <input type="number" size="20" name="percent_used" value="95" />
        <small></small>
      </label>
        
      <label>
        Target percent:
        <input type="number" size="20" name="percent_target" value="34" />
        <small></small>
      </label>
        
      <label>
        Syrup to add:
        <input type="number" size="20" name="syrup_add" />
        <small>The syrup recipe will appear here.</small>
      </label> 
    
      <label>
        For a total:
        <input type="number" size="20" name="liquid_total" />
        <small></small>
      </label>
      
      <input type="submit" name="submit" value="Calculate" />
      <button type="reset" name="reset">Reset</button>
    </form>
    
*/


/*
$(document).ready(function(){
  $('#alcohol_form INPUT[name="submit"]').click(function(){
    calculate();
    return false;
  });
  $('#alcohol_form button[name="reset"]').click(function(){
    resetFields();
  });
});

function roundAmount(amt) {
  amt = Math.round(amt); //(Math.round(amt*100)/100);
  return amt;
}
function calculate() {
  var amount_flavored = $('#amount_flavored').val(),
    percent_used = $('#percent_used').val(),
    target_percent = $('#target_percent').val(),
    liquid_total = $('#liquid_total').val(),
    syrup_add, syrupCombined, syrupWater, syrupSugar, ratio, total;
    
  if ( !isBad(amount_flavored) ) {
    if ( !isBad(target_percent) && !isBad(percent_used) ) {         
      ratio = percent_used / target_percent;
      total = ratio * amount_flavored;
      total = roundAmount(total);
      syrup_add = total - amount_flavored;  
      syrup_add = roundAmount(syrup_add);
      $('#syrup_add').val( syrup_add );
      $('#liquid_total').val( total );
      syrupCombined = syrup_add * 1.164;
      syrupWater = syrupCombined * 0.6135;
      syrupSugar = syrupCombined - syrupWater;
      $('#syrup_add_help').text("Mix " + roundAmount(syrupWater) +  " water with " + roundAmount(syrupSugar) + " sugar.");

    }
  } else if ( !isBad(liquid_total) ) {
    if (!isBad(target_percent) && !isBad(percent_used)) {
      amount_flavored = liquid_total / (percent_used/target_percent);
      syrup_add = liquid_total - amount_flavored;
      $('#syrup_add').val( roundAmount(syrup_add) );
      $('#amount_flavored').val( roundAmount(amount_flavored) );
      syrupCombined = syrup_add * 1.164;
      syrupWater = syrupCombined * 0.6135;
      syrupSugar = syrupCombined - syrupWater;
      $('#syrup_add_help').text("Mix " + roundAmount(syrupWater) +  " water with " + roundAmount(syrupSugar) + " sugar.");
    }
  }
  return false;
}
function isBad(value) { return value==''||isNaN(value);}
function resetFields() {
  $('#percent_used').val(95);
  $('#target_percent').val(34);
  $('#syrup_add').val('');
  $('#syrup_add_help').text('The syrup recipe will appear here.');
  $('#liquid_total').val('');
  $('#amount_flavored').val('');
}
*/