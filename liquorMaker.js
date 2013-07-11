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