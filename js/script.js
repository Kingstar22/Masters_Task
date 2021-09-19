"use strict";

const mapStar = document.querySelector(".maps__start_map"),
      mapEnd = document.querySelector(".maps__end_map"),
      inputDate = document.getElementById('user'),
      sendBtn = document.querySelector('.interaction__btn'),
      parentBlock = document.querySelector('.wrapper'),
      element = document.createElement('div'),
      uninfected = 0,
      infected = 1,
      ocean = "X";

let arrayStartMap = [],
    continentArray = [],
    arrTotalNumPeople = [],
    arrayEndMap = [],
    pandemicStartMap= '01000000X000X011X0X';

    
function changeWorldMap(arr) {
    arr = pandemicStartMap.split(ocean);
 
    arr.forEach( (item) => {
        item =  item.split('');
        item.forEach( (elem, i) => {
            if(item.includes("1")) {
                item.splice(i, 1, "1");
            }
        });
        continentArray.push(item);
        arrTotalNumPeople.push(...item);
    }); 
}
changeWorldMap(arrayStartMap); 

function modernArrMaps(maps) {
    maps.forEach((item, i) => {
        arrayEndMap.push(...item);
        if(maps.length-1 != i) {
            arrayEndMap.push(ocean);
        }
    });
}
modernArrMaps(continentArray);

function createStartWordMap(map) {
    let arr = map.split(''); 
    arr.forEach(() => {
        mapStar.innerHTML += ` <div class="square_start"></div>`;
    });

    const squares = document.querySelectorAll(".square_start");
    arr.forEach((item, index) => {      
        if(item == uninfected) {
            squares[index].classList.add('uninfected');
        } else if (item == infected) {
            squares[index].classList.add('infected');
        }
    });
}
createStartWordMap(pandemicStartMap);

function createEndWordMap(map) {
   
    map.forEach(() => {
        mapEnd.innerHTML += ` <div class="square_end"></div>`;
    });

    const squares = document.querySelectorAll(".square_end");
    map.forEach((item, index) => {      
        if(item == uninfected) {
            squares[index].classList.add('uninfected');
        } else if (item == infected) {
            squares[index].classList.add('infected');
        }
    });
}
createEndWordMap(arrayEndMap);

function calcDate (arr) {
    let infectedCount = 0;
    let percent = 100;
    arr.forEach(item => {
        if(item == infected) {
            infectedCount+= infected;
        }
    });
    element.classList.add("menu");
    element.innerHTML = `<h3 class="menu__title">Total: ${arr.length} </h3>
                        <h3 class="menu__title">Infected: ${infectedCount} </h3>
                        <h3 class="menu__title">Percentage: ${(infectedCount * percent / arr.length).toFixed(3)} % </h3>
                        `;
    parentBlock.append(element);
}
calcDate(arrTotalNumPeople);

function test(input)  {
    return /[0-1]|[X]/.test(input);
}

function getData(btn) {
    btn.addEventListener('click', () => {
        let userMap = inputDate.value;
        if (userMap != '') {
            if(test(userMap)) {
                pandemicStartMap= '';
                pandemicStartMap = userMap.toUpperCase();
                arrayStartMap = [];
                continentArray = [];
                arrTotalNumPeople = [];
                arrayEndMap = [];
                mapStar.innerHTML = '';
                mapEnd.innerHTML = '';
                element.innerHTML = '';
                inputDate.value = '';
        
                changeWorldMap(arrayStartMap); 
                modernArrMaps(continentArray);
                createStartWordMap(pandemicStartMap);
                createEndWordMap(arrayEndMap);
                calcDate(arrTotalNumPeople);
            } else {
                alert("incorrect data format");
            }
        } else {
            alert("field is empty");
        }
    });
}  
getData(sendBtn);

 


