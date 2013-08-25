$(function() {
	
	$('#searchform').submit(function(e) {
		// Stop the form from sending and reloading the page
		e.preventDefault();
		$('#error').html("");
		$('.userinfo').html("");

		var bday = getBday();
		// Update URL (deactivated for testing)
		// window.location.hash = bday.dd + "-" + bday.mm;
		
		
		var congrats = checkToday(bday);
		console.log("today is birthday: " + congrats);
		
		
		getData(bday);
		
		publish(congrats);
		
		
	});
});

// store birthday given via input
function getBday() {
		var bday = {};
		
		bday.dd = document.birthday.day.value;
		bday.mm = document.birthday.month.value;
		
		console.log("entered birthday: " + bday.dd + "." + bday.mm + ".");
		
		return bday;
		
}

// see if entered date is today (needed later to congratulate the user on their birthday)
function checkToday(bday) { 
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	if (bday.dd == dd && bday.mm == mm) {
		return true;
		}
	else {return false}
		
}

// get data for entered date and push results to html
function getData(bday) {
	$.getJSON('data.json', function(data) {
		var pax = getPax(bday,data);
		console.log("people who have birthday at this day: " + pax);
		$('#others').html('Sie teilen Ihren Geburtstag mit <span class="number">' + (pax-1) + '</span> anderen Menschen in der Schweiz.');
		var rank = getRank(bday,data);
		console.log("birthday rank: " + rank);
		$('#rank').html('Auf der Rangliste der häufigsten Geburtstage der Schweiz liegt Ihrer auf Platz <span class="number">' + rank + '</span>');
});

}

// get pax out of data
function getPax(bday,data) {
	for(i=0; i<data.length; i++) {
	   if (data[i].dd == bday.dd && data[i].mm == bday.mm) {
	   	var pax = data[i].pax;
	   	return pax;
	   }
	};
}

// get rank out of data
function getRank(bday,data) {
	for(i=0; i<data.length; i++) {
	   if (data[i].dd == bday.dd && data[i].mm == bday.mm) {
	   	var rank = data[i].rank;
	   	return rank;
	   }
	};
}



// publish everything (I actually wanted to fill the content for #others and #rank via this function as well, but I ran into a scope-problem, so I went for the not-so-clean solution above)
function publish(congrats) {
	
	if (congrats == true) {$('#congrats').html("Das ist ja heute! Herzlichen Glückwunsch!");}
	
	$('.line').removeClass('hidden');
	$('#viz').removeClass('hidden');
	$('#teasers').removeClass('hidden');
	
}

