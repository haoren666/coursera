(function(){
  "use strict";



  angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var buyItem = this;
    buyItem.shoppinglist = ShoppingListCheckOffService.getBuyItems();
    buyItem.buy = function(itemIndex) {
      try {
        ShoppingListCheckOffService.buyItem(itemIndex);
      } catch(error) {
        buyItem.errorMessage = error.message;
      }
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var showList = this;
    showList.items = ShoppingListCheckOffService.getItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyItems = [{name: "Cookies", quantity: 10}, {name: "Chips", quantity: 8},
                      {name: "Coke", quantity: 20}, {name: "Sugar", quantity: 15},
                      {name: "Salt", quantity: 5}];
    var items = [];

    service.buyItem = function(itemIndex) {
      var item = toBuyItems[itemIndex];
      toBuyItems.splice(itemIndex, 1);
      items.push(item);
      if(toBuyItems.length === 0) {
        throw new Error("empty");
      }
    }

    service.getBuyItems = function() {
      return toBuyItems;
    }

    service.getItems = function() {
      return items;
    }
  }

})();
