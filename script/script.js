require(['jquery'], function($, amd) {
    //anything on initialization
    var self = {}, renderProductTiles, updateProductTiles, updateLocalStorage, getValues, bindEvents;
    self.data = null;

    renderProductTiles = function(productData) {
        /* This function receives product data and pushes it into seller and customer views*/
        var listingTemplate, productTemplate, pushToListing, pushToCustomerView;

        listingTemplate = document.querySelector('#listing-tile');
        productTemplate = document.querySelector('#product-tile');
        pushToListing = function(obj) {
            var $clone = $($(listingTemplate).html()).clone();

            $clone.find('.seller-listing-view .title').text(obj.title);
            $clone.find('.seller-listing-view .description').text(obj.desc);
            $clone.find('.seller-listing-view .price').text(obj.price);
            $clone.find('.seller-listing-view .max-quantity').text(obj.maxQuantity);
            $clone.find('.seller-listing-edit .title').val(obj.title);
            $clone.find('.seller-listing-edit .description').text(obj.desc);
            $clone.find('.seller-listing-edit .price').val(obj.price);
            $clone.find('.seller-listing-edit .max-quantity').val(obj.maxQuantity);

            $('.seller-listings').append($clone);
            $clone.attr("data-pid", obj.pId);
        }
        pushToCustomerView = function(obj) {
            var $clone = $($(productTemplate).html()).clone();
            $clone.find('.title').text(obj.title);
            $clone.find('.description').text(obj.desc);
            $clone.find('.price').text(obj.price);
            $clone.find('.max-quantity').text(obj.maxQuantity);

            $('.product-tiles').append($clone);
            $clone.attr("data-pid", obj.pId);
        }
        for (var i = 0; i < productData.length; i++) {
            pushToListing(productData[i]);
            pushToCustomerView(productData[i]);
        }
    };

    updateProductTiles = function(obj, pId, $view) {
    	//this function updates the listing as well as product detail tiles
    	var $productTile; 

        $view.find('.title').text(obj.title);
        $view.find('.description').text(obj.desc);
        $view.find('.price').text(obj.price);
        $view.find('.max-quantity').text(obj.maxQuantity);
        
        $productTile = $('.product-tiles').find('[data-pid="' + pId + '"]');
        $productTile.find('.title').text(obj.title);
        $productTile.find('.description').text(obj.desc);
        $productTile.find('.price').text(obj.price);
        $productTile.find('.max-quantity').text(obj.maxQuantity);
    }

    updateLocalStorage = function() {
        window.localStorage.setItem("testShopCartData", JSON.stringify(self.data));
    }

    getValues = function($parent, obj) {
        var ret;
        obj ? ret = obj : ret = {};
        ret.title = $parent.find('.title').val();
        ret.desc = $parent.find('.description').val();
        ret.price = $parent.find('.price').val();
        ret.maxQuantity = $parent.find('.max-quantity').val();
        return ret;
    }

    bindEvents = function() {
        (function bindListingAndProductView() {
        	//This self executing function binds seller and customer buttons
            $('.btn.btn-seller').click(function() {
                $('.btn.btn-customer').removeClass('active');
                $('.btn.btn-seller').addClass('active');
                $('#customer-section').removeClass('active');
                $('#seller-section').addClass('active');
            });
            $('.btn.btn-customer').click(function() {
                $('.btn.btn-customer').addClass('active');
                $('.btn.btn-seller').removeClass('active');
                $('#customer-section').addClass('active');
                $('#seller-section').removeClass('active');
            })

        }());

        (function bindEditDelete() {
        	//this function binds edit and delete methods to respective buttons
            $('.seller-listings').on('click', '.btn.edit', function() {
                $(this).parents('.seller-listing-tile').find('.seller-listing-view').removeClass('active').parent().find('.seller-listing-edit').addClass('active');
            });
            $('.seller-listings').on('click', '.btn.delete', function() {
                var productId = $(this).parents('.seller-listing-tile').attr('data-pid');
                for (var i = 0; i < self.data.productData.length; i++) {
                    if (self.data.productData[i].pId == productId) {
                        self.data.productData.splice(i, 1);
                        $(this).parents('.seller-listing-tile').remove();
                        updateLocalStorage();
                    }
                }
            });
        }());

        (function bindSaveCancel() {
        	//this method binds save and cancel
            $('.seller-listings').on('click', '.btn.save', function() {
            	var $edit, $view, productId;

                $edit = $(this).parents('.seller-listing-edit');
                $view = $(this).parents('.seller-listing-tile').find('.seller-listing-view');
                productId = $(this).parents('.seller-listing-tile').attr('data-pid');
                for (var i = 0; i < self.data.productData.length; i++) {
                    if (self.data.productData[i].pId == productId) {
                        getValues($edit, self.data.productData[i]);
                        updateProductTiles(self.data.productData[i], productId, $view);
                        updateLocalStorage();
                    }
                }
                $(this).parents('.seller-listing-tile').find('.seller-listing-view').addClass('active').parent().find('.seller-listing-edit').removeClass('active');
            });

            (function bindAdd() {
            	//this method binds addition of a listing row .
                $('.frm-add-listing .btn.add-listing').on('click', function() {
                    var ret = getValues($('.frm-add-listing'));

                    if (ret.title && ret.desc && ret.price && ret.maxQuantity) {
                        //values exist
                        ret.pId = new Date().getTime();
                        self.data.productData.push(ret);
                        updateLocalStorage();
                        renderProductTiles([ret]);
                        $('.frm-add-listing').find('input').val('');
                        $('.frm-add-listing').find('textarea').val('');
                    } else {
                        alert('Please fill all the values.');
                    }

                })
            }());

            $('.seller-listings').on('click', '.btn.cancel', function() {
                $(this).parents('.seller-listing-tile').find('.seller-listing-view').addClass('active').parent().find('.seller-listing-edit').removeClass('active');
            });

        }());

    }
    self.init = function() {
        /*
        	Init function will
        	Get Data from localstorage
        	Push the data into the view
        	Attaches the events

        */
        self.data = JSON.parse(window.localStorage.getItem("testShopCartData"));

        renderProductTiles(self.data.productData);
        bindEvents();
    };
    self.init();

})
