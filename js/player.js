//controls
var paused=true;

$(document).ready(function(){

	$('#seekCircle').draggable({
		containment:'parent',axis:'x',
		drag:function(){
			var currentPosition=$(this).position();
			updateSeek(currentPosition.left);	
		},
		start:function(){
			
				$('#vid')[0].pause();
			
		},
		stop:function(){
			var currentPosition=$(this).position();
			seekVideo(currentPosition.left);
			if(!paused){
				$('#vid')[0].play();
			}
		}
	});

	$('#volCircle').draggable({
		containment:'parent',
		axis:'x',
		drag:function(){
			var currentPosition=$(this).position();
			changeVolume(currentPosition.left);
		}
	});
	$('#volCircle').css({left:'100px'});
	
	$('#pButton').on('click',function(){
		if($('#pause').css('display')=='none'){
			$('#play').hide();
			$('#pause').show();
			$('video')[0].play();
			paused=false;
		}
		else{

			$('#pause').hide();
			$('#play').show();
			$('video')[0].pause();
			paused=true;
		}
	

	});

	$('#vid')[0].onended=function(){
			$('#pause').hide();
			$('#play').show();
			$('#seekCircle').css({left:0});
			$('#complete').css({width:0});
	}


	$('#maximize').on('click',function(){
		
		if($('#controls').hasClass('screen')){
			
			
			exitFullscreen();
			$('#controls').removeClass('screen');
			$('#maximize').css({'background-color':'grey'});
			$('#small').css({'background-color':'black'});

		}
		else{
			getFullscreen();
			$('#controls').addClass('screen');
			$('#maximize').css({'background-color':'black'});
			$('#small').css({'background-color':'grey'});
		}

		$(document).keyup(function(e){
			
			if(e.keyCode==27){
				$('#controls').removeClass('screen');
				$('#maximize').css({'background-color':'grey'});
				$('#small').css({'background-color':'black'});	
			}

		});
	});





	$('#vid').on('timeupdate',function(){
		var time=this.currentTime;
		var duration=this.duration;
		var progress=time*250.0/duration;
		$('#complete').css({width:progress});
		$('#seekCircle').css({left:progress});
		
	});
	$('#progressBar').on('click',function(e){
		var vid=$('#vid')[0];
		var duration=vid.duration;
		vid.pause();
		var left=$(this).offset().left;
		var x=e.pageX;
		var start=x-left;
		vid.currentTime=start*duration/250.0;
		$('#complete').css({width:start});
		$('#seekCircle').css({left:start});
		if(!paused){
			vid.play();
		}
	});


});

 $(window).load(function(){
 
$('#vid').bind('progress',function(){
		var duration=this.duration;
		var buff=this.buffered;
		updateProgress(buff,duration);
	});

 });

function updateSeek(seek){
	$('#complete').css({width:seek});
}
 
function updateProgress(buff,duration){
	if(buff.length>0){
		
		var start=buff.start(0);
		var end=buff.end(buff.length-1);
		$('#bufferedAmt').css({left:start*262.0/duration,width:end*262.0/duration});

	}
}

function seekVideo(seek){
	var vid=$('#vid')[0];
	var duration=vid.duration;
	var time=seek*duration/250.0;
	vid.currentTime=time;
}

function changeVolume(volume){

	$('#vid')[0].volume=volume/100.0;
	
	$('#volCurrent').css({width:(volume*112.0)/100.0});
	if(volume >=66){
		$('#volAmt1,#volAmt2,#volAmt3').show();
		
	}
	if(volume>=33 && volume <66){
		$('#volAmt3').hide();
		$('#volAmt1,#volAmt2').show();
		
	}
	if(volume>0 && volume <33){
		$('#volAmt2,#volAmt3').hide();
		$('#volAmt1').show();
		
		
	}
	if(volume==0){
		$('#volAmt1,#volAmt2,#volAmt3').hide();
		
	}
}

function getFullscreen(){
	var elem = $('#vid')[0];
	if (elem.requestFullscreen) {
	  elem.requestFullscreen();
	} else if (elem.msRequestFullscreen) {
	  elem.msRequestFullscreen();
	} else if (elem.mozRequestFullScreen) {
	  elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
	  elem.webkitRequestFullscreen();
	}
}

function exitFullscreen(){

	if(document.exitFullscreen){
		document.exitFullscreen();
	} else if(document.msExitFullscreen){
		document.msExitFullscreen();
	} else if(document.mozExitFullScreen){
		document.mozExitFullScreen();
	} if(document.webkitExitFullscreen){
		document.webkitExitFullscreen();
	} 
}

//javascript for video

