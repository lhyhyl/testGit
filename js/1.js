var name = "The Window";
var object = {

    getNameFunc : function(){
        return function(){
            name : "My Object";
            alert(name);
            return this.name;
        };
    }
};
alert(object.getNameFunc()());  //The Window