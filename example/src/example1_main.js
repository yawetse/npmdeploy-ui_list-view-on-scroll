'use strict';

var listViewOnScroll = require('../../index'),
	$ = require('npmd-jquery');

$(function(){
	// alert("jquery works");
	// new listViewOnScroll( document.getElementById( 'cbp-so-scroller' ) ); //no jquery
	var templateHtmlFromAjax,
		sampleJSONFromAjax;

	var listviewscroll1 = listViewOnScroll({
		el:$("#cbp-so-scroller").get(0)
	});
	listviewscroll1.init()
});
