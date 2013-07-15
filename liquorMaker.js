var liqrmakr = liqrmakr || {};

liqrmakr.calculator = (function($) {
  var container, flavored, percent, target, syrup, syrupMsg, total;
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
    getSelections();
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
  function getSelections() {
    flavored = $('input[name="liqrmakr_flavored"]', container);
    percent = $('input[name="liqrmakr_percent"]', container);
    target = $('input[name="liqrmakr_target"]', container);
    syrup = $('input[name="liqrmakr_syrup"]', container);
    syrupMsg = $('small', syrup);
    total = $('input[name="liqrmakr_total"]', container);
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
    flavored.val('');
    percent.val(95);
    target.val(34);
    syrup.val('');
    syrupMsg.text('The syrup recipe will appear here.');
    total.val('');
  }
  function calculate() {
    var flavoredAmount, totalAmount, syrupToAdd, syrupCombined, syrupWater, syrupSugar;

    if ( !isBad(flavored.val()) ) {
      if ( !isBad(target.val()) && !isBad(percent.val()) ) {         
        ratio = percent.val() / target.val();
        totalAmount = ratio * flavored.val();
        totalAmount = roundAmount(totalAmount);
        syrupToAdd = totalAmount - flavored.val();  
        syrupToAdd = roundAmount(syrupToAdd);
        syrup.val(syrupToAdd);
        total.val(totalAmount);
        syrupCombined = syrupToAdd * 1.164;
        syrupWater = syrupCombined * 0.6135;
        syrupSugar = syrupCombined - syrupWater;
        syrupMsg.text("Mix " + roundAmount(syrupWater) +  " water with " + roundAmount(syrupSugar) + " sugar.");
      }
    } else if ( !isBad(total.val()) ) {
      if (!isBad(target.val()) && !isBad(percent.val())) {
        flavoredAmount = total.val() / (percent.val()/target.val());
        syrupToAdd = total.val() - flavoredAmount;
        syrup.val(roundAmount(syrupToAdd));
        flavored.val(roundAmount(flavoredAmount));
        syrupCombined = syrupToAdd * 1.164;
        syrupWater = syrupCombined * 0.6135;
        syrupSugar = syrupCombined - syrupWater;
        syrupMsg.text("Mix " + roundAmount(syrupWater) +  " water with " + roundAmount(syrupSugar) + " sugar.");
      }
    }
    return false;
  }
  return {
    init: initialize
  }
})(jQuery);
