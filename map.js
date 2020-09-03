var myMap;
var adress;
var countOfAdresses=0;
let numbers =['first_adress', 'second_adress', 'third_adress', 'fourth_adress'];
let arrCoordinates=[ [60.008459278062944,30.374591637430463]];
let coordinates = [0,0];
var matrRasst=[];
// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [60.008459278062944,30.374591637430463], // Москва
        zoom: 15
    });

    myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [60.00971665492313,30.36983877740292]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Склад',
          }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
            // Метку можно перемещать.
            draggable: false
        }),
        
         myMap.geoObjects
        .add(myGeoObject)
    
     placemark = new ymaps.Placemark([60.008459278062944,30.374591637430463], {
            iconContent: "",
            hintContent: "Перетащите, чтобы выбрать адрес"
        }, {
            // Запретим замену обычного балуна на балун-панель.
            balloonPanelMaxMapArea: 0,
            draggable: "true",
            preset: "islands#blueStretchyIcon",
            // Заставляем балун открываться даже если в нем нет содержимого.
            openEmptyBalloon: true
        });
    
   

    // Обрабатываем событие открытия балуна на геообъекте:
    // начинаем загрузку данных, затем обновляем его содержимое.
    placemark.events.add('balloonopen', function (e) {
        placemark.properties.set('balloonContent', "Идет загрузка данных...");

        // Имитация задержки при загрузке данных (для демонстрации примера).
       
            ymaps.geocode(placemark.geometry.getCoordinates(), {
                results: 1
            }).then(function (res) {
                var newContent = res.geoObjects.get(0) ?
                        res.geoObjects.get(0).properties.get('name') :
                        'Не удалось определить адрес.';
                adress =newContent;
                coordinates = placemark.geometry.getCoordinates();
                newContent +='<br />  <button onclick="myFunction()">Добавить адрес</button>';
               
               
                // Задаем новое содержимое балуна в соответствующее свойство метки.
                placemark.properties.set('balloonContent', newContent);
            });
        
    
  
          
    });

    myMap.geoObjects.add(placemark);
          
    };


 function myFunction() {

     if(countOfAdresses>3){
         alert('Максимальное количество адресов - 4'+arrCoordinates);
     } else{
        document.getElementById(numbers[countOfAdresses]).innerHTML += adress;
         }
     
        ++countOfAdresses;
     arrCoordinates[countOfAdresses]=coordinates;
     
 }

function  zadacha() {

           matrRasstf();
         alert('Типа построили'+matrRasst);
     TSP();// setTimeout(() =>TSP(), 15000);
     
 }

   function matrRasstf(){
       var lenght;
       for (var i = 0; i < 5; i++){
            matrRasst[i]=[];
       }
       for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                matrRasst[i][j]=0.0;  
            }
       }
       
       alert(matrRasst);
       
       
           var route;
       //for (var i = 0; i < countOfAdresses+1; i++) {
         //  for (var j = 0; j < countOfAdresses+1; j++) {
               //var route=ymaps.route([arrCoordinates[i], arrCoordinates[j]]);
                ymaps.route([ arrCoordinates[0],  arrCoordinates[1]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[0][1]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               ); 
       
       
        ymaps.route([ arrCoordinates[1],  arrCoordinates[0]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[1][0]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               ); 
       
                if(arrCoordinates[2][0]) {ymaps.route([ arrCoordinates[0],  arrCoordinates[2]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[0][2]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               ); 
                   ymaps.route([ arrCoordinates[1],  arrCoordinates[2]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[1][2]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );
                                         ymaps.route([ arrCoordinates[2],  arrCoordinates[0]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[2][0]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               ); 
                   ymaps.route([ arrCoordinates[2],  arrCoordinates[1]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[2][1]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );
                                         
                                         }
       
               if(arrCoordinates[3][0]) {ymaps.route([ arrCoordinates[0],  arrCoordinates[3]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[0][3]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );
                  ymaps.route([ arrCoordinates[1],  arrCoordinates[3]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[1][3]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );      
                                         
                   ymaps.route([ arrCoordinates[2],  arrCoordinates[3]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[2][3]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );      
                                         
                   ymaps.route([ arrCoordinates[3],  arrCoordinates[0]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[3][0]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );
                  ymaps.route([ arrCoordinates[3],  arrCoordinates[1]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[3][1]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );      
                                         
                   ymaps.route([ arrCoordinates[3],  arrCoordinates[2]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[3][2]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );                            
                                        
                                        }
       
              if(arrCoordinates[4][0]) {ymaps.route([ arrCoordinates[0],  arrCoordinates[4]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[0][4]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );
                 ymaps.route([ arrCoordinates[1],  arrCoordinates[4]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[1][4]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );     
                                        
                                        ymaps.route([ arrCoordinates[2],  arrCoordinates[4]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[2][4]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );     
                           ymaps.route([ arrCoordinates[3],  arrCoordinates[4]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[3][4]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );                 
                    ymaps.route([ arrCoordinates[4],  arrCoordinates[0]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[4][0]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );
                 ymaps.route([ arrCoordinates[4],  arrCoordinates[1]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[4][1]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );     
                                        
                                        ymaps.route([ arrCoordinates[4],  arrCoordinates[2]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[4][2]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );     
                           ymaps.route([ arrCoordinates[4],  arrCoordinates[3]]).then(//[arrCoordinates[i], arrCoordinates[j]]).then(
                   function (route) {
                       lenght = route.getTime();
                       matrRasst[4][3]=lenght;
                       //matrRasst[j][k]=lenght;
                       //alert('Время'+ lenght+' ====== '+matrRasst);
                   },
                   function (error) {
                      alert('Возникла ошибка: ' + error.message);
                   }
               );                       
                                       
                                       }
           //}
       //}

       
       
   
   }

function TSP(){
        var minCost = 100000000000000000000000000000000;
    
    var que=[0, 1, 2, 3, 4];
    var res = [];
   
    do {
		
		var cost = 0;
		cost += matrRasst[que[countOfAdresses - 1]][que[0]];
		if (cost < minCost) {
			//res.clear();
			//res.resize(que.size());
			res = que;
			minCost = cost;
		}
	} while (next_permutation(que));


}
    
bool next_permutation(que)
{
    if (first == last) return false;
    BidirIt i = last;
    if (first == --i) return false;
 
    while (true) {
        BidirIt i1, i2;
 
        i1 = i;
        if (*--i < *i1) {
            i2 = last;
            while (!(*i < *--i2))
                ;
            std::iter_swap(i, i2);
            std::reverse(i1, last);
            return true;
        }
        if (i == first) {
            std::reverse(first, last);
            return false;
        }
    }
}
