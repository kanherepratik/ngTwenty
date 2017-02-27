app.component('board', {
  templateUrl: 'partials/board.component.html',
  controller: ['$scope','$interval', function($scope,$interval,$window) {
    var self = this;
    self.flag  =false;
    var temp = 0;
    self.translate = 'translateY(453px)';
    self.val  = 453;
    var _count = 0;
    var _rowCount = 0;
    self.score = 5;
    self.highScore = 5;
    var realArr = [];
    var min = 0,max = 100;
    var value = min;
    var increment = 6;
    self.isPaused = false;
    self.layout =[];
    self.color = ['blue','green','red','black','grey','pink','cyan','crimson','orange','darkkhaki','magenta','teal','deepskyblue','brown','CadetBlue','Indigo','LightSeaGreen','SlateBlue','Tomato','Turquoise'];
    self.myStyle = {
    "width": "0%"
  };
   var init = function(){
        self.createLayout(2,7);
        progress = $interval(fluctuator,1000,0,true);
         
   }//init
   self.createLayout = function(row,col){
       for (var i = 0; i < row; i++) {
            self.layout[i]  = [];
            for (var j = 0; j < col; j++) {
                self.layout[i][j] = Math.floor((Math.random() * 5) + 1);         
            }
          }     
  }//createLayout
  
  function fluctuator() {
    if(self.isPaused === true){
        return;
    }
    else{
        value += increment;
        self.myStyle.width = value + "%";
        if(value >= 100){
            self.myStyle = {
                "width": "0%"
        };
        increment = 6;
        self.newRow();
        }
    }      
  }//fluctuator

  self.restart = function() {
        window.location.reload();
  }//restart
  self.pause = function() {
      self.isPaused = true;
  }//pause
  self.play = function(){
        self.isPaused = false;           
  }//play

  self.newRow = function(){
     
    if(self.layout.length === 10){
            self.stop();
    }
    else if(self.highScore == 20){
        self.stop();
    }
    else if(self.layout.length > 5){
         increment = 8;
         checkRow();
         value = min;
         var row = [];
            for (var i = 0;i<7;i++){
                row[i] = Math.floor((Math.random() * 5) + 1);  
            }
            self.layout.push(row);
            self.val -= 52;
            if(_rowCount){
                _rowCount = 0;
                self.val += 52;
            }
            var x = self.val + 'px';
            self.translate = "translateY("+x+")";
      }
      else {
          checkRow();
          value = min;
          var row = [];
            for (var i = 0;i<7;i++){
                row[i] = Math.floor((Math.random() * 5) + 1);  
            }
            self.layout.push(row);
            self.val -= 52;
            if(_rowCount){
                _rowCount = 0;
                self.val += 52;
            }
            var x = self.val + 'px';
            self.translate = "translateY("+x+")";
      }
      
  }//newRow

   self.stop = function() {
     if (angular.isDefined(progress)) {
            self.isPaused = true;
            $interval.cancel(progress);
            progress = undefined;
            if(self.highScore ==20){
                alert("Congratulations U win!!!")
            }else{
                alert("Game Over...Be fast next Time :P");     
            }
          }
   }//stop

   self.dropSuccessHandler = function($event,index,components) {  
   
            if(self.flag === true){
                components[index] = undefined;
                self.checkCell();   
                self.flag = false;
                calculateScore();
            }
      }//dropSuccessHandler
      self.onDrop = function($event,$data,components,index){
          if($data === parseInt($event.toElement.innerText)){
            components[index] +=1;
              self.flag = true;
          }
      }//onDrop
    self.checkCell = function(){
      for (var i = self.layout.length-1; i > 0; i--) {
            for (var j = 0; j < self.layout[i].length; j++) {
                if(self.layout[i][j] === undefined){
                    temp = self.layout[i-1][j];
                    self.layout[i-1][j] = self.layout[i][j];
                    self.layout[i][j] = temp;                
                }          
            }
          }          
    }//checkCell
    var checkRow = function(){
        for (var i =0; i < self.layout.length; i++) {
            for (var j = 0; j < self.layout[i].length; j++) {
                if(self.layout[i][j] === undefined){
                    _count++;               
                }          
            }
            if(_count == 7){
                 _count = 0;
                 self.layout.splice(i,1)
                 _rowCount ++;
            }
            _count = 0;
           
          }
    }//checkRow

    var calculateScore = function(){
            for(var i=0;i< self.layout.length;i++){
                realArr = self.layout[i]; 
                if(self.score < Math.max.apply(Math, realArr.filter(function(arr){
                    return typeof(arr) === 'number';
                }))){
                    self.score =Math.max.apply(Math, realArr.filter(function(val){
                        return  typeof(val) === 'number';
                    })) ;
                } 
            }
        if(self.score > self.highScore) {
             self.highScore = self.score;
         }
        
    }//calculateScore
  init();
  }]//end of controllerx
});
