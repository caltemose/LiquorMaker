var liqrmakr = liqrmakr || {};

liqrmakr.calculator = (function($) {
  var container;

  function initialize(options) {
    container = options.container;
    createMarkup();
  }
  function createMarkup() {
    var html = '';
    html += createInput("Amount flavored", "liqrmakr_flavored");
    html += createInput("Percent alcohol used", "liqrmakr_percent", 95);
    html += createInput("Target percent", "liqrmakr_target", 34);
    html += createInput("Syrup to add", "liqrmakr_syrup", '', "The syrup recipe will appear here");
    html += createInput("For a total", "liqrmakr_total");
    html += '<input type="submit" name="submit" value="Calculate" />';
    html += '<button type="reset" name="reset">Reset</button>';
    container.html(html);
    bindButtons();
  }
  function createInput(label, name, value, small) {
    value = (typeof value === "undefined") ? "" : value;
    small = (typeof small === "undefined") ? "" : small;
    var html = '<label>' + label;
    html += '<input type="number" size="20" name="' + name + '" value="' + value + '" />';
    html += '<small>';
    html += small;
    html += '</small>';
    html += '</label>';
    html += "\n";
    return html;
  }
  function bindButtons(){
    var calc = calculate, reset = resetFields;
    $('input[name="submit"]', container).click(function(){
      calc();
      return false;
    });
    $('button[name="reset"]', container).click(function(){
      reset();
      return false;
    });
  }
  function roundAmount(amt) {
    return Math.round(amt);
  }
  function isBad(value) {
    return value === '' || isNaN(value);
  }
  function resetFields() {
    /*
    $('#percent_used').val(95);
    $('#target_percent').val(34);
    $('#syrup_add').val('');
    $('#syrup_add_help').text('The syrup recipe will appear here.');
    $('#liquid_total').val('');
    $('#amount_flavored').val('');
    */
  }
  function calculate() {
    console.log('calculate()');
  }
  return {
    init: initialize;
  }
})(jQuery);


$(function(){
  liqrmakr.calculator.init({container:$('#liqrmakr')});
});


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