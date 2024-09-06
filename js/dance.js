$(document).ready(function(){

    // get name by id via C2R, default is Miria
    var name = "Yukimi";
    // default card index
    var cardIndex = 2;
    // mark the index count of puchi image
    var currentPuchiIndex = 2;
    
    // some trick for cache
    var puchiImageDiv = document.querySelector('.puchi_image');
    var puchiClickDiv = document.querySelector('.puchi_click_layer');
    //const baseUrl =  'http://localhost:4000/';
    const baseUrl =  'https://TimemachineT.github.io/' ;
    // get default puchi card index
    var tempPuchiDefaultId = $("#default_puchi_id").text();
    if(cardIndex.length !=0) {
        cardIndex = tempPuchiDefaultId;
    }
    //get random card index while loading
    cardIndex=Math.floor(Math.random()*12)+1;

    // get user's Realname
    userRealname = "プロデューサー";	    
    // get serifu of default card, and push into the array
    var packSerifuCommand = "cardserifulist" + cardIndex;
    var serifuGot =$("#" + packSerifuCommand);
    var serifuArray = [];
    serifuGot.find("li").each(function(index) {
    	var tempString = $(this).text();
        var convertedText = tempString.replace("{0}", userRealname);
    	serifuArray.push(convertedText);
		//console.log(index + ": " + $(this).text());
	});
	
	// timer for toggle serifu visability
	var serifuTimer = setInterval(toggleSerifu, 10000);


    // use to store hidden puchi for cache 
    var puchi1Url =  baseUrl+"images/cuteYukimi/"+ name + "-Petit-" + cardIndex + "-1.png";
    var puchi2Url =  baseUrl+"images/cuteYukimi/"+ name + "-Petit-" + cardIndex + "-2.png";
    var puchi3Url =  baseUrl+"images/cuteYukimi/"+ name + "-Petit-" + cardIndex + "-3.png";
    var puchi4Url =  baseUrl+"images/cuteYukimi/"+ name + "-Petit-" + cardIndex + "-4.png";

    var puchiInsertUrl = " <img class='puchi_image' src='" + puchi1Url + "'>";


    // the cache puchi
    $(".puchi-reg-animation0").append("<img src='' id='cache_puchi_1'> <img src='' id='cache_puchi_2'> <img src='' id='cache_puchi_3'> <img src='' id='cache_puchi_4'>");

    // start to load all puchi
    document.getElementById("cache_puchi_1").src = puchi1Url;
    document.getElementById("cache_puchi_2").src = puchi2Url;
    document.getElementById("cache_puchi_3").src = puchi3Url;
    document.getElementById("cache_puchi_4").src = puchi4Url;

	var theFirstPuchi = new Image();
	theFirstPuchi.src = puchi1Url; 
	// when load successfully, show the puchi
    theFirstPuchi.onload = function() {  
        // the true puchi
        $(".puchi-reg-animation0").append(puchiInsertUrl);  
        changeSerifu();
        clearInterval(serifuTimer);
	    serifuTimer = setInterval(toggleSerifu, 10000);
    };  
    
    //var originUrl = mw.util.getUrl("");
    // div/class object to operate
    var puchiDiv = document.querySelector('.puchi');

    // total types of animation
    var totalAnimationTypes = 3;

    var animationLength = [500, 1000, 500];

    var animationSwapImgPoint = [250, 150, 250];

    // total types of regular animation
    var totalRegularAnimationTypes = 2;

    var currentRegularAnimationIndex = 0;
    
    // to listen CGSS card tab switch, and change skin
   /* var $cgssCardDiv = $("div.bg-cgsscard:first-child");
    
    // var $cgssCardDivChild = $cgssCardDiv.find(".main-line-wrap").find(".resp-tabs").find(".resp-tabs-list");
    $("div.bg-cgsscard").find(".main-line-wrap").find(".resp-tabs").find(".resp-tabs-list").find("li").bind("click", function(){
        // get the index of active tab
        var index = $(this).index();
        cardIndex = index + 1;

        // cache ready

        var urlPrefix1 =  baseUrl+"images/cuteYukimi/"+ name + "-Petit-" + cardIndex + "-1.png";
        var newPuchiImg = new Image();  
        newPuchiImg.src = urlPrefix1;  
        
        var urlPrefix2 =  baseUrl+"images/cuteYukimi/"+ name + "-Petit-" + cardIndex + "-2.png";
        var urlPrefix3 =  baseUrl+"images/cuteYukimi/"+ name + "-Petit-" + cardIndex + "-3.png";
        var urlPrefix4 =  baseUrl+"images/cuteYukimi/"+ name + "-Petit-" + cardIndex + "-4.png";
        document.getElementById("cache_puchi_1").src = urlPrefix1;
        document.getElementById("cache_puchi_2").src = urlPrefix2;
        document.getElementById("cache_puchi_3").src = urlPrefix3;
        document.getElementById("cache_puchi_4").src = urlPrefix4;

        // reload new serifu for new card
        packSerifuCommand = "cardserifulist" + cardIndex;
        serifuGot =$("#" + packSerifuCommand);
        serifuArray = [];
        serifuGot.find("li").each(function(index) {
    	    var tempString = $(this).text();
            var convertedText = tempString.replace("{0}", userRealname);
    	    serifuArray.push(convertedText);
			//console.log(index + ": " + $(this).text());
	    });
        
        // when load successfully, flip the puchi
        newPuchiImg.onload = function() {  
            rotatePuchi();  
        	showSerifu();
        	clearInterval(serifuTimer);
	    	serifuTimer = setInterval(toggleSerifu, 10000);
        };
        
    });*/

    function startFlipAnimation(animationIndex) {
        var animationPropKey = 'flip' + animationIndex;
        puchiDiv.classList.toggle(animationPropKey);
    }

    function endFlipAnimation(animationIndex) {
        var animationPropKey = 'flip' + animationIndex;
        puchiDiv.classList.remove(animationPropKey);
    }

    function changePuchiImg() {
        var puchiImageDiv = document.getElementsByClassName("puchi_image")[0];
    
        // if index count is greater than 4, then restart from 1 (Default: 4 images for each puchi character)
        if(currentPuchiIndex < 4) {
            currentPuchiIndex = currentPuchiIndex + 1;
        }
        else {
            currentPuchiIndex = 1;
        }


        puchiImageDiv.src =  baseUrl+"images/cuteYukimi/"+ name + "-Petit-" + cardIndex + "-" + currentPuchiIndex + ".png";
    }

    function randomRegularAnimation() {
        // debugger;
        var newAnimationIndex = Math.floor(Math.random() * totalRegularAnimationTypes);
        var puchiImageDiv = document.getElementsByClassName("puchi")[0];
        puchiImageDiv.classList.replace("puchi-reg-animation" + currentRegularAnimationIndex, "puchi-reg-animation" + newAnimationIndex);
        currentRegularAnimationIndex = newAnimationIndex;
    }

    /*
        click event listening
    */
    puchiClickDiv.onclick = function() {
        rotatePuchi();
        showSerifu();
        clearInterval(serifuTimer);
	    serifuTimer = setInterval(toggleSerifu, 10000);
    };

    /*
        implement animation for puchi
    */
    function rotatePuchi() {
        var animationType = Math.floor(Math.random() * totalAnimationTypes);

        // Start flip animation.
        startFlipAnimation(animationType);

        // change image at animation swap point
        setTimeout(changePuchiImg, animationSwapImgPoint[animationType]);

        // end flip animation when animation ended.
        setTimeout(endFlipAnimation, animationLength[animationType], animationType);

        // set a random regular animation.
        randomRegularAnimation();
    }
    
    /*
        implement changes of serifu
    */
    function changeSerifu() {
    	// get random serifu index
		var randomIndex = Math.floor(Math.random() * serifuArray.length);
		var serifuToChange = serifuArray[randomIndex];

		// change serifu
    	$("#serifu_content").text(serifuToChange);
    }
    
    /*
    	to toggle serifu visability
    */
    function toggleSerifu() {
    	changeSerifu();
    	$("#serifu_chatbox").toggle();
    }
    
    /*
    	to show serifu visability
    */
    function showSerifu() {
    	changeSerifu();
    	$("#serifu_chatbox").show();
    }
    
    /*
    	to hide serifu visability
    */
    function fadeSerifu() {
    	$("#serifu_chatbox").hide();
    }
    
});