
function showMyVideos(data) {
	var feed = data.feed;
	var entries = feed.entry || [];
	var html2 = [];
	//var html = new String()
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i];
		var title = entry.title.$t;
		var href = entries[i].link[0].href;
		var thumbnailUrl;
		var playerUrl;
		//t_ent.entries.push(entries[i]);
		if (entries[i].media$group.media$thumbnail != undefined) thumbnailUrl = entries[i].media$group.media$thumbnail[0].url;
		if (entries[i].media$group.media$content != undefined) playerUrl = entries[i].media$group.media$content[0].url;
		href = href.replace('&feature=youtube_gdata','');
		//html2.push('<img onclick="loadVideo(\'', playerUrl, '\', true)" src=', thumbnailUrl, '> <a href=', href, '>', href, '</a>', ' ', title, '<br>');
		//html2.push('<tr><td><a href=', href, '>', href, '</a></td><td>', title, '</td></tr>');
		html2.push('<a href=', href, '>', href, '</a><img class="playicon" onclick="loadVideo(\'', playerUrl, '\', true)" src=\'img/play.gif\'', '</img><span class="title"> ', title, '</span>', '<br>');
		//html2.push('<a href=', href, '>', href, '</a><span class="title"> ', title, '</span>', '<br>');
	}

	/*var test = []
	for (i = 0; i < t_ent.entries.length; i++) {
		test.push(t_ent.entries[i].title.$t, "\n");
	}
	alert(test.join(''));*/

	var videos = document.getElementById('videos');
	videos.innerHTML = videos.innerHTML + html2.join('');
} 

window.onload=function() {
	document.getElementById('username').focus();
	document.getElementById('username').select();
}

function ChainStuff(data) {
	showMyVideos(data);

	$.each(data.feed.link, function() {
		if (this.rel == 'next') {
			$.ajax({ type: 'GET', url: this.href + '&callback=?', dataType: 'json', async: false, success: ChainStuff});
		}
	});
}

function ListAll() {
	var maxresults = 30;
	var t_ent = { entries: [] };
	var index = { val: 1 };
	var username = document.getElementById('username');
	var videos = document.getElementById('videos');
	//var url = 'http://gdata.youtube.com/feeds/users/' + username.value + '/uploads?alt=json-in-script&callback=?&max-results=' + maxresults;
	var url = 'http://gdata.youtube.com/feeds/api/users/' + username.value + '/uploads?alt=json-in-script&callback=?&max-results=' + maxresults;
	//var html = new String();
	//var html = { str : "<table><thead><tr><th>Link</th><th>Title</th></tr></thead><tbody>" } 
	//url = 'index.html'; //funny that async: false works when using this but not for cross domain JSON data such as uploads?alt=json-in-script&callback=?

	$.ajax({ type: 'GET', url: url , dataType: 'json', async: false, success: ChainStuff});
	//$.getJSON('http://gdata.youtube.com/feeds/users/' + username.value + '/uploads?alt=json&callback=?&max-results=' + maxresults, ChainStuff);

	/*$.ajax({ type: 'GET', url: url , dataType: 'json', async: false, success: function(data) { 
			alert(data);
			showMyVideos(data,t_ent);
		    for (index=2;index<=data.feed.openSearch$totalResults.$t/maxresults;index=index+1) {
				$.ajax({ type: 'GET', url: url + '&start-index=' + index*maxresults , dataType: 'json',  contentType: "application/json; charset=utf-8", async: false, success: function(data) {
						showMyVideos(data,t_ent);
					}
				});
			}
		}
		, error: function(request,data) {
			alert("Error:" + data + request);
		} 
	});*/


	/*$.getJSON('http://gdata.youtube.com/feeds/users/' + username.value + '/uploads?alt=json-in-script&callback=?&start-index=1&max-results=' + maxresults, function(data) {
		showMyVideos(data);
		for (index=1;index<=data.feed.openSearch$totalResults.$t/maxresults;index=index+1) {
			$.getJSON('http://gdata.youtube.com/feeds/users/' + username.value + '/uploads?alt=json-in-script&callback=?&start-index=' + index*maxresults + '&max-results=' + maxresults, function(data) {
				showMyVideos(data);
			});
		}
		videos.innerHTML = videos.innerHTML + '</tbody></table>';
		alert(videos.innerHTML);
	});*/

	document.getElementById('username').focus();
	document.getElementById('username').select();

}

$(function() {
	$("#ListButton").click(function(event) {
		ListAll();
	});
	$("#ClearButton").click(function(event) {
		document.getElementById('videos').innerHTML = '';	
	});
	$("#username").keypress(function(event) {
		var key=event.keyCode || event.which;
		if (key==13) { ListAll(); }
	});
});

