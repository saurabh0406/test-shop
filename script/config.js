/*
	This file is a requirejs config file which will keep all the configuration of dependencies and initial callback
*/
require.config({

	deps: ['jquery'],
	baseUrl: 'script',
	callback: function(){
		//calling script js
		require(["script"], function(src){
			src.init();
		});
	},
	paths:{
		jquery: 'libs/jquery-2.1.4.min'
	},
	shim:{

	}
})