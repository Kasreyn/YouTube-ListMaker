var ylinks = [];

function showMyVideos(data) {
	var entries = data.feed.entry || [];
	var html2 = [];
	for (var i = 0; i < entries.length; i++) {
		var title = entries[i].title.$t;
		var href = entries[i].link[0].href;
		var index = data.feed.openSearch$totalResults.$t - (data.feed.openSearch$startIndex.$t + i);
		var thumbnailUrl;
		var playerUrl;
		if (entries[i].media$group.media$thumbnail != undefined) thumbnailUrl = entries[i].media$group.media$thumbnail[0].url;
		if (entries[i].media$group.media$content != undefined) playerUrl = entries[i].media$group.media$content[0].url;
		href = href.replace('&feature=youtube_gdata','');
		//html2.push('<img onclick="loadVideo(\'', playerUrl, '\', true)" src=', thumbnailUrl, '> <a href=', href, '>', href, '</a>', ' ', title, '<br>');
		//html2.push('<tr><td><a href=', href, '>', href, '</a></td><td>', title, '</td></tr>');
		//html2.push('<a href=', href, '>', href, '</a><img class="playicon" onclick="loadVideo(\'', playerUrl, '\', true)" src=\'img/play.gif\'', '</img><span class="title"> ', title, '</span>', '<br>');
		//html2.push('<tr><td><a href=', href, '>', href, '</a></td><td>&nbsp;&nbsp;<img onclick="loadVideo(\'', playerUrl, '\', true)" src=\'img/play.gif\'></img>&nbsp;&nbsp;</td><td>', title, '</td></tr>');
		ylinks.push('<tr><td><a href=', href, '>', href, '</a></td><td>&nbsp;&nbsp;<img onclick="loadVideo(\'', playerUrl, '\', true)" src=\'img/play.gif\'></img>&nbsp;&nbsp;</td><td>', title, '</td><td>', index, '</td></tr>');
	}
	//$("#videos").append(html2.join(''));
} 

function ChainStuff(data) {
	var hasmore = false;
	showMyVideos(data);
	$.each(data.feed.link, function() {
		if (this.rel == 'next') {
			$.ajax({ type: 'GET', url: this.href + '&callback=?', dataType: 'json', async: true, success: ChainStuff });
			hasmore = true;
		}
	});
	if (!hasmore) {
		ylinks.push('</tbody></table>');
		$("#videos").html(ylinks.join(''));
	}
} 

function ListAll() {
	var maxresults = 30;
	var url = 'http://gdata.youtube.com/feeds/api/users/' + $("#username").val() + '/' + $("#Type").val() + '?alt=json-in-script&callback=?&max-results=' + maxresults;
	$("#videos").empty();
	//$("#videos").append('<table><thead><tr><th>Link</th><th>Play</th><th>Title</th></tr></thead><tbody>');
	ylinks = [];
	ylinks.push('<table><thead><tr><th>Link</th><th>Play</th><th>Title</th><th>Index</th></tr></thead><tbody>');
	$.ajax({ type: 'GET', url: url, dataType: 'json', async: true, success: ChainStuff });
	$("#username").focus().select();
} 

$(document).ready(function(){
	$("#username").focus().select();
});

$(function() {
	$("#ListButton").click(function(event) {
		ListAll();
	});
	$("#ClearButton").click(function(event) {
		$("#videos").empty();
	});
	$("#username").keypress(function(event) {
		var key=event.keyCode || event.which;
		if (key==13) { ListAll(); }
	});
});

function loadVideo(playerUrl, autoplay) {
	swfobject.embedSWF(playerUrl + '&rel=1&border=0&fs=1&autoplay=' + (autoplay?1:0), 'player', '320', '240', '9.0.0', false, false, { allowfullscreen: 'true' })
}


