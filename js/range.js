(() => {

    document.querySelector('#depositRangeInput').addEventListener('input',function(){
        this.value = this.value.replace(/,/g,'').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

      
    //slide 1  rate select slider 
    const rateSlider = document.getElementById('rangeSlider');
    const verticalTextSlider = document.querySelector('.value-vertical-slider ul'); 
    const sliderInput = document.querySelector('#example_1_input');
    const ht = 33; 
    const visual = document.querySelector('.range-visual-images'); 
    
    noUiSlider.create(rateSlider, {
        
        connect: [true, false],
        start: 30,
        range: {
            'min': 0,
            'max': 100, 
        }, 
        step : 10,
        pips: {
            mode: 'range',
            density: 50, 
        }
    });

    for(let i =0; i < 11; i++) {
        verticalTextSlider.innerHTML += `<li> ${i * 10} </li>`;
    }
    
    rateSlider.noUiSlider.on('update', function(values, handle) {
        setTimeout(() => {
            verticalTextSlider.style.marginTop = `-${(values[handle] / 10 ) * ht}px`;
            
        }, 300);
        
        sliderInput.value = parseInt(values[handle]);
        this.start = values[handle]
        //console.log('current value', parseInt(values[handle]));
    });

    sliderInput.addEventListener('change', () => { 
        rateSlider.noUiSlider.updateOptions({
            start :  sliderInput.value
        });
    });

    //slide 2 deposit amount 
    const depositSlider = document.querySelector('#depositRangeSlider'); 
    let temp = 0; 
    let tempInput = document.querySelector('#depositRangeInput'); 
    noUiSlider.create(depositSlider, {
        connect: [true, false],
        start: 5000000,
        range: {
            'min': 0,
            'max': 10000000, 
        }, 
        step : 100,
        pips: {
            mode: 'range',
            density: 50, 
        }
    });

    depositSlider.noUiSlider.on('update', function(values, handle) {
        const sliderPip = document.querySelectorAll('#depositRangeSlider .noUi-value'); 
        sliderPip[0].innerHTML ='₱0' ;
        sliderPip[1].innerHTML ='₱100M' ;
        
        this.start = values[handle]; 
        temp  = values[handle];
        tempInput.value = temp.replace(/,/g,'').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    

    //slide 2 number of days 
    const deposiDaytSlider = document.querySelector('#depositDayRangeSlider'); 
    
    noUiSlider.create(deposiDaytSlider, {
        connect: [true, false],
        start: 1,
        range: {
            'min': 0,
            'max': 5, 
        }, 
        step :1,
        pips: {
            mode: 'steps',
            stepped : true, 
            density: 1, 
        }
    });

    deposiDaytSlider.noUiSlider.on('update', function(values, handle){ 
        const deposiDayPips = ['1D', '30D', '1YR', '3YRS', '5YRS', '10YRS']; 
        const sliderPip = document.querySelectorAll('#depositDayRangeSlider .noUi-value'); 
        for(let i = 0 ; i < sliderPip.length; i++) {
            sliderPip[i].innerHTML = `${deposiDayPips[i]}`
        }
        this.start = values[handle]; 
    })
    

    
    const btnCalc = document.querySelector('.btn-calc'); 
    const rv1 = document.querySelector('.calc-result .result--reg em'); 
    const rv2 = document.querySelector('.calc-result .result--club em'); 
    
    btnCalc.addEventListener('click', function(){
        
        let amount = parseInt(depositSlider.noUiSlider.start); 
        let period = parseInt(deposiDaytSlider.noUiSlider.start); 
        
        //test
        rv1.innerHTML = amount.toLocaleString();
        rv2.innerHTML = (amount/2).toLocaleString();

        console.log( `rate : ${parseInt(rateSlider.noUiSlider.start)}%`);
        console.log( `amount : ${amount}peso`);
        console.log( `period : ${period}days(yrs)`); 
    });
})();



