app.component('board', {
  templateUrl: 'partials/board.component.html',
  controller: ['$scope','$interval', function($scope,$interval) {
    var self = this;
    //  self.dragDone = false;
    self.flag  =false;
    self.translate = 0;
    var _count = 0;
    
    self.color = ['blue','green','red','black','grey','pink','cyan','crimson','orange','darkkhaki','magenta','teal','deepskyblue','brown'];

   self.layout =[];
   self.createLayout = function(row,col){
       for (var i = 0; i < row; i++) {
            self.layout[i]  = [];
            for (var j = 0; j < col; j++) {
                self.layout[i][j] = Math.floor((Math.random() * 5) + 1);         
            }
          }     
  }//createLayout

  self.newRow = function(){
      var row = [];
      for (var i = 0;i<7;i++){
           row[i] = Math.floor((Math.random() * 5) + 1);  
      }
       _count++;
      self.layout.push(row);
      self.moveUp();
  }
 

   self.createLayout(2,7);
   
   $interval(self.newRow,3000,2,true);
   

    self.moveUp =function(){
       self.translate = (453-(64*_count));
   }
//    console.log(self.layout);
   
      self.dropSuccessHandler = function($event,index,components) {
          console.log(components);
          console.log(index)
            if(self.flag === true){
               console.log("number to be removed:" + components[index])
               components.splice(index,1);
            }
      }
      self.onDrop = function($event,$data,components,index){
          console.log(index);
          if($data === parseInt($event.toElement.innerText)){
            //   angular.forEach(components,function(val,key){
            //       if($data === val){
            //        components[key] = $data+1;
            //       }
            //   });
            components[index] +=1;
              self.flag = true;
            //  components[] += 1;
              //
          }
      }
   
  }]//end of controller
});
