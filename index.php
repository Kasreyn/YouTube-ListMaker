<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<meta http-equiv="content-type" content="text-html; charset=utf-8">
<title>List all videos uploaded by specified user</title>
<link rel="Stylesheet" type="text/css" href="css/styles.css" />
<script src="scripts/jquery-1.3.1.js" type="text/javascript"></script>
<!--<script src="http://swfobject.googlecode.com/svn/trunk/swfobject/swfobject.js" type="text/javascript"></script>-->
<script src="scripts/youtube_list_all.js" type="text/javascript"></script>
</head>

<?php
	if (isset($_GET['user'])) {
		echo '<body onload="ListAll();">';
	}
	else {
		echo '<body>';
	}
?>

<div id="playerContainer" style="width: 20em; height: 180px; float: right;"><object id="player"></object></div><br>
YouTube username:
<?php
	if (isset($_GET['user'])) {
		echo '<input type="text" id="username" value="' . $_GET['user'] . '"></input>';
	}
	else {
		echo '<input type="text" id="username" value="Deckswax"></input>';
	}
?>
<button id="ListButton" >List</button> <button id="ClearButton" >Clear</button> <select id="Type" ><option value="uploads" selected=selected >Uploads</option><option value="favorites" >Favorites</option></select>

<div id="videos"></div>

</body>
</html>

<!--

Thanks to shifteleven in #jQuery for helping me with obj.feed.link next links and async ajax chaining.

json-in-script author name
http://beautifulbeta.wikidot.com/json-feeds
get total count http://gdata.youtube.com
http://www.google.com/support/forum/p/youtube/thread?tid=27c78486937e1e51&hl=en
getJSON  http://gdata.youtube.com
http://www.dynamicdrive.com/forums/showthread.php?t=56467
javascript fetch JSON feed
http://stackoverflow.com/questions/912947/importing-a-json-feed-from-an-external-source-in-javascript
youtube api
http://code.google.com/apis/youtube/2.0/developers_guide_json.html
http://gdata.youtube.com/feeds/users/Deckswax/uploads
http://www.downloadatoz.com/_imgbank/tr/tray-play/Tray-Play.icon.gif

-->
