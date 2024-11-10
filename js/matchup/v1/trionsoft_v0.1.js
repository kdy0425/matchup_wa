/* -----------------------------------------------------------------------------
 * trionsoft v0.1
 *
 * ajax 통신& 공통 관련 함수
 *
 * -----------------------------------------------------------------------------
 */
(function($){

    var window = this, _trionsoft = window.trionsoft, _ph = window.ph, trionsoft = ph = $.ph = $.trionsoft = window.trionsoft = function(){
        return new trionsoft.fn.init();
    };
    
    trionsoft.fn = trionsoft.prototype = {
        init: function(){
            return this;
        },
        about: "trionsoft javascript library",
        version: "0.1.1"
    };    
    
    /**
     * AJAX 관련 함수들
     */
	
	/**
	 * 다용도 AJAX 함수
	 * trionsoft.ajaxCall = function(url, form, selectorDiv, returnObj, isLoading, validation, paramCallback, callback)
	 * 
	 * @param {Object} url 대상 URL
	 * @param {Object} form FORM을 submit 할 경우
	 * @param {Object} selectorDiv DIV을 갱신(refresh)할 selector Id
	 * @param {Object} returnObj  json-> json리턴 html->html리턴
	 * @param {Object} isLoading isLoading
	 * @param {Object} validation validation 함수 호출이 가능함(true를 return하면 통과)
	 * @param {Object} param callback 함수로 넘길 파라미터값 (id/name명등) 
	 * @param {Object} callback 콜백 함수
	 */ 
    trionsoft.ajaxCall = function(url, form, selectorDiv, returnObj, isLoading, validation, param, callback, async){
		
    	var queryString = '';
		var recieveDataType = 'json';
		
		if(returnObj != 'undefined' && returnObj != null && returnObj != '' && returnObj == 'html' ) {
			recieveDataType = 'html';
		}
		if(isLoading != 'undefined' && isLoading != null && isLoading != '' && isLoading == true ) {
			selectorDiv.html('<table style="width:100%; height: 100%" ><tbody><tr><td valign="middle" align="center"><img src="/images/biz/comm/loader.gif"/></td></tr></tbody></table>');
		}
		if(form != null){
			queryString = form.formSerialize();
		}
		if(async == 'undefined' || async == null)
			async = true;
        var options = {
        	async:async,
        	//contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        	beforeSend: function (XMLHttpRequest) {
        		XMLHttpRequest.setRequestHeader('Ajax', 'true');
        	},
			data : queryString,
            url: url, // override for form's 'action' attribute 
            beforeSubmit: validation, // pre-submit callback 
            success:  //callback,// post-submit callback
	        function(response, statusText){
	        	if(callback != 'undefined' && callback != null && callback != ''){
	        		if(param != 'undefined' && param != null && param != ''){
	        			if(validation != 'undefined' && validation != null && validation != ''){
	        				callback(response, statusText, param, validation);
	        			}else{
	        				callback(response, statusText, param);
	        			}
	        		}else{
	        			callback(response, statusText);
	        		}
	        	}
	    	},
            type: 'post',
            dataType: recieveDataType,
            error: function(response, statusText){
	            
	    	},
            timeout: 300000,
            complete: function(response, statusText){
	    		if(returnObj != 'undefined' && returnObj != null && returnObj != '' && returnObj == 'html' ) {
	    			if ( statusText == "success" || statusText == "notmodified" ){
	    				selectorDiv.html( response.responseText );
	    			}
	    		}
	    	}
        }
		$.ajax(options);
    }
    
    
})(jQuery);
