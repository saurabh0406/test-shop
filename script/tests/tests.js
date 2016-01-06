define(["../script"], function(src){
  describe("localStorage Test", function() {
      var data = {
          "productData": [{
              "pId": 1,
              "title": "Product 1",
              "desc": "Product 1 description is here",
              "price": 220,
              "maxQuantity": 5
          }, {
              "pId": 2,
              "title": "Product 2",
              "desc": "Product 2 description is here",
              "price": 320,
              "maxQuantity": 8
          }],
          "addToCart": []
      };
      
      beforeEach(function() {
          //anything to execute before each test execution

      });

      it("should set empty data if localStorage doesn't exist", function() {
          window.localStorage.removeItem("testShopCartData");
          src.init();
          expect(src.data.productData.length).toEqual(0);          
      });
      it("should be able to extract localStorage data correctly", function() {

          window.localStorage.setItem("testShopCartData", JSON.stringify(data));
          src.init();
          expect(JSON.stringify(src.data)).toEqual(JSON.stringify(data));          
      });
  });
});