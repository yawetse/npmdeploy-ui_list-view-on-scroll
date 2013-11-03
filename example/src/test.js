'use strict';

var listViewOnScroll = require('../../index'),
	$ = require('bower-jquery');

$(function(){
	// alert("jquery works");
	// new listViewOnScroll( document.getElementById( 'cbp-so-scroller' ) ); //no jquery
	var templateHtmlFromAjax,
		sampleJSONFromAjax;

	getTemplateHtml(function(html,err){
		templateHtmlFromAjax = html;
		getSampleData(function(sampledata,err){
			sampleJSONFromAjax = sampledata;

			window.listviewscroll1 = listViewOnScroll({
				el: "cbp-so-scroller",
				templateHtml:templateHtmlFromAjax,
				listViewData:sampleJSONFromAjax,
				renderDom:"scrollerhtml",
				dom_section: sampleJSONFromAjax.dom_section,
				renderCallback: function(){			
					window.listviewscroll1.init()
					console.log("calledback")
				}
			});
			window.listviewscroll1.init();

		});


	})


});

function getTemplateHtml(callback,err){
	var templateHtmlFromAjaxRequest = $.ajax({
        url: '../dist/template/ejs/list-view-on-scroll.ejs',
        type: "get",
        dataType: "html",
        data: {
            test:"testdata"
        }
    });
    templateHtmlFromAjaxRequest.done(function(response, textStatus, jqXHR){
         callback(response,false);
    });
    templateHtmlFromAjaxRequest.fail(function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown);
        callback(errorThrown,false);
    });
    templateHtmlFromAjaxRequest.always(function () {
        // $inputs.prop("disabled", false);
    });
}


function getSampleData(callback,err){
	var sampleJSONRequest = $.ajax({
        url: 'assets/data/sample.json',
        type: "get",
        dataType: "json",
        data: {
            test:"testdata"
        }
    });
    sampleJSONRequest.done(function(response, textStatus, jqXHR){
        callback(response,false);
    });
    sampleJSONRequest.fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR);
        callback(false,errorThrown)
    });
    sampleJSONRequest.always(function () {
        // $inputs.prop("disabled", false);
    });
}