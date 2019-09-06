/*  РИСУЕМ С КОЛЯГО
    первые пробы пера с объектом CANVAS - он же Холст, холстяра, хузер
    "не судите строго"
*/
var W, H, ctx; //Желательно всегда определять переменные размеров окна и переменную к которой мы потом присвоим канвас
var alfa = Math.PI/6; //угол на который будет повернуто изображение
var star = [
  [50, 100], [100, 200], [200, 350], [350, 500], [450, 200], [250, 100], [150, 50]//, [,], [,], [,]
];
var hStars=50; // пухлость точек
var numColon = 8; // Количество столбцов
var rr = 800;
var size = rr / numColon; //размер колонок все привязано к кратности 2
var maxRange = 400;
var wayRange = 0;
function peredel() {
  for (var i=0; i < star.length; i++) {
    star[i][0] = Math.round(Math.random() * (rr - hStars * 2) + hStars);
    star[i][1] = Math.round(Math.random() * (rr - hStars * 2) + hStars);
  }
  init();
}
function addMaxRange() { maxRange += 20; init(); }
function remMaxRange() { maxRange -= 20; init(); }
//Коренная функция, инициализируемая при загрузке страницы
function init() {
  var canvas = document.querySelector('canvas'); //находим переменную для канваса
  canvas.width = W = rr;//Math.round(window.innerWidth); //находим параметры окна
  canvas.height = H = rr;//Math.round(window.innerHeight); // так как у нас адаптивная поляна
  ctx = canvas.getContext('2d'); //обязательный параметр для двуразмерного поля
  //window.alert(size);
  animateTable(); //вызываем сборную фуннкцию для анимации
}

var request; //переменная для опредения отклика параметров ввода
function animateTable() {
  //request = window.requestAnimationFrame(animateTable); //собственно при возникновении события ловится ключ и вызывается функция анимации
  
  
  ctx.clearRect(0, 0, W, H); //очищаем холст
  
  for (i = 0; i < star.length; i++) {
      if (i !== 0){
        ctx.strokeStyle = 'red';
        for (var j=0; j < i; j++) {
          //window.alert(i);
          wayRange = star[i][0] - star[j][0];
          //window.alert(wayRange);
          wayRange *= star[i][0] - star[j][0];
          
          wayRange = Math.round(Math.sqrt(wayRange + (star[i][1] - star[j][1]) * (star[i][1] - star[j][1])));
          //window.alert(wayRange);
          if (wayRange < maxRange) drawLine(star[i][0], star[i][1], star[j][0], star[j][1]);
        }
      }
      ctx.strokeStyle = 'green';
      ctx.beginPath();
      ctx.strokeRect(star[i][0] - 5, star[i][1] - 5, 10, 10);
      ctx.stroke();
      //window.alert(star[i][0]);  
  }
  ctx.strokeStyle = 'blue'; //определение цвета линии
  
  //собственно рисуется сетка через новоопределенную функцию
  for(var x = 0; x <= numColon; x++) drawLine(size*x, -size*numColon, size*x, size*numColon);
  for(var y = 0; y <= numColon; y++) drawLine(-size*numColon, size*y, size*numColon, size*y);
  //конец циклов прорисовки поля

  //функция которая рисует линии
  function drawLine(x0, y0, x1, y1) {
    ctx.beginPath(); //опускаем перо на холст
    var p0 = project(x0, y0); //расчет стартовой позиции через новоопределенную функцию
    var p1 = project(x1, y1); //расчет конечной позиции через новоопределенную функцию
    ctx.moveTo(p0.x, p0.y); //перемещаем перо без прорисовки
    ctx.lineTo(p1.x, p1.y); //двигаем перо и рисуем
    ctx.stroke(); //обязательно поднимаем перо
  }
  //функция для просчета координат. В принципе - это СЕТТЕР!!!
  function project(x, y) {
    return {
      x: x,
      y: y
    }
  }
}
//функция срабатывающая при изменении окна- вызывает коренную функцию для рисования INIT и переопределяет размеры холста
// function resize() {
//   window.cancelAnimationFrame(request);
//   init();
// }

