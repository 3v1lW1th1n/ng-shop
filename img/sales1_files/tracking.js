/* TrafMag.com goods tracking v 1.0.17 */

(function () {
	function setCookie(name, value, days){
		var expires = '';
		if (days > 0) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = '; expires=' + date.toGMTString();
		}
		document.cookie = name + '=' + value + expires;
	}

	function getParam(p){
		var match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}

	var utm_source = getParam('utm_source'),
		utm_medium = getParam('utm_medium'),
		utm_campaign = getParam('utm_campaign'),
		utm_term = getParam('utm_term'),
		utm_content = getParam('utm_content'),
		gclid = getParam('gclid');

	if (gclid) {
		utm_source = 'adwords';
	}

	if (utm_source) {
	 	var days = 0;
		if (utm_source == 'cpatrafmag') {
			var days = 30;
		} else {
			days = 1;
		}
		var coo_parr = '; path=/; domain=.rozetka.com.ua';
		setCookie('utm_source', utm_source + coo_parr, days);
		if (utm_medium) {
			setCookie('utm_medium', utm_medium + coo_parr, days);
		}
		if (utm_campaign) {
			setCookie('utm_campaign', utm_campaign + coo_parr, days);
		}
		if (utm_term) {
			setCookie('utm_term', utm_term + coo_parr, days);
		}
		if (utm_content) {
			setCookie('utm_content', utm_content + coo_parr, days);
		}
	}

	try {
		if (typeof(window.localStorage.session_json) !== 'undefined') {
			var __sj = JSON.parse(window.localStorage.session_json);
		} else
		if (typeof(window.localStorage.state) !== 'undefined') {
			var __sj = JSON.parse(window.localStorage.state);
		}
		if (typeof(__sj) !== 'undefined' && typeof(__sj.user) !== 'undefined' && typeof(__sj.user.id) !== 'undefined') {
			(window.Image ? (new Image()) : document.createElement('img')).src = 'https://t.trafmag.com/images/1px-matching-rz.gif?id=' + __sj.user.id + '&rnd=' + Math.random();
		}
	} catch(e) {}
})();
