$("#restart").hide();
$("#pause").hide();
$("#tomato").hide();

$("#subtractBreak").click(function(){
	var breakTime = parseInt(document.getElementById("breakTime").value);
	if (breakTime > 0) {
		$("#breakTime").val(breakTime-1);
	}
});

$("#addBreak").click(function(){
	var breakTime = parseInt(document.getElementById("breakTime").value);
	$("#breakTime").val(breakTime+1);
});

$("#subtractSession").click(function(){
	var sessionTime = parseInt(document.getElementById("sessionTime").value);
	if (sessionTime > 0) {
		$("#sessionTime").val(sessionTime-1);
	}
});

$("#addSession").click(function(){
	var sessionTime = parseInt(document.getElementById("sessionTime").value);
		$("#sessionTime").val(sessionTime+1);
});

function timer() {
	$("#start").hide();
	$("#restart").show();
	$("#pause").show();
	var breakTime = parseInt(document.getElementById("breakTime").value);
	var sessionTime = parseInt(document.getElementById("sessionTime").value);
	session(sessionTime*60000, breakTime*60000);
}

function session(sessionTime, breakTime) {
	var time = sessionTime;
	var sessionFunction = setInterval(function () {
		$("#current").removeClass("break");
		$("#current").addClass("session");
		$("#current").html("Work");
		$("#tomato").show();
		if (time > 0 && !$("#timeGoesHere").hasClass("paused")){
			var minutes = parseInt((time/1000)/60);
			var seconds = ((time/1000)%60);
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
   		$("#timeGoesHere").html(minutes + ":" + seconds);
			time -= 1000;
		}
		if (time === 0) {
			clearInterval(sessionFunction);
			$("audio")[0].play();
			breakFunction(sessionTime, breakTime);
		}
	}, 1000);
}

function breakFunction(sessionTime, breakTime) {
	var time = breakTime;
	var breakerFunction = setInterval(function () {
		$("#current").removeClass("session");
		$("#current").addClass("break");
		$("#current").html("Relax");
		if (time > 0  && !$("#timeGoesHere").hasClass("paused")){
			var minutes = parseInt((time/1000)/60);
			var seconds = ((time/1000)%60);
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
   		$("#timeGoesHere").html(minutes + ":" + seconds);
			time -= 1000;
		}
		if (time === 0) {
			clearInterval(breakerFunction);
			session(sessionTime, breakTime);
		}
	}, 1000);
}


function pause() {
	$("#timeGoesHere").addClass("paused");
}

function restart() {
	$("#timeGoesHere"). removeClass("paused");
}