document.querySelector('#depositRangeInput').addEventListener('input',function(){
  this.value = this.value.replace(/,/g,'').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});
