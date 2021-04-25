//Actions to take when calculate button is pressed
function calculate()
{
	size=document.getElementById('size').value
	sizeUnit=document.getElementById('size-unit').value
	speed=document.getElementById('speed').value
	speedUnit=document.getElementById('speed-unit').value
	reliability=document.getElementById('reliability').value
	
	//If (both) inputs are empty, don't calculate.
	if(size.length==0 || speed.length==0)
	{
		alert('Some or all inputs are missing. Try again!')
		return
	}
	//If any input is invalid number, don't calculate.
	else if((isNaN(size) || isNaN(speed)))
	{
		alert('Some or all inputs are invalid numbers. Try again!')
		return
	}
	//If any input is negative, don't calculate.
	else if(size<=0 || speed<=0)
	{
		alert('Some or all inputs are not positive numbers. Try again!')
		return
	}

	//Affect speed according to reliability of connection
	speed*=reliability
	//Using simple formula for calculating seconds
	seconds=size*sizeUnit/(speed*speedUnit)
	//Showing results
	document.getElementById('tim').style.display='block'
	document.getElementById('dur').style.display='block'
	document.getElementById('dur').innerHTML='It will take <br>'+formatSeconds(seconds)+'.'
	document.getElementById('tim').innerHTML='If you start transfer now, it will finish at <br>'+getFinishTimeAfter(seconds)
}

//Converts seconds into a well formatted str showing years, months, days, hours, minutes etc.
function formatSeconds(seconds)
{
	let years=Math.floor(seconds/(365*24*3600));
	seconds-=years*(365*24*3600); //Removing years from seconds
	let d=Math.floor(seconds/(24*3600));
	seconds-=d*(24*3600);
	let months=Math.floor(d/30.4167);
	let days=Math.round(d-months*30.4167)
	let hours=Math.floor(seconds/3600);
	seconds-=hours*3600; //Removing hours from seconds
	let minutes=Math.floor(seconds/60);
	seconds-=minutes*60; //Removing minutes from seconds
	let secs=Math.floor(seconds);

	//This array contains many values, as indicated by variable names
	let arr=[years,months,days,hours,minutes,secs]

	//This array will contain punctuation symbols coming between years, months etc.
	let punctuation=['','','','','']
	//This counter was needed because if there were some minutes and 0 seconds, unneeded & plagued the output.
	let counter=0
	for(let i=0;i<5;i++)
	{
		if(arr[i]!=0&&counter<countNonZeros(arr)-1)
		{
			punctuation[i]=', '
			counter++
		}
	}
	let ampersandIndex=punctuation.lastIndexOf(', ')
	punctuation[ampersandIndex]=' & '

	//Well formatted string to be returned
	let text=''
	if(years==1)
		text+=years+' year'
	else if(years>1)
		text+=years+' years'
	text+=punctuation[0]

	if(months==1)
		text+=months+' month'
	else if(months>1)
		text+=months+' months'
	text+=punctuation[1]

	if(days==1)
		text+=days+' day'
	else if(days>1)
		text+=days+' days'
	text+=punctuation[2]

	if(hours==1)
		text+=hours+' hour'
	else if(hours>1)
		text+=hours+' hours'
	text+=punctuation[3]

	if(minutes==1)
		text+=minutes+' minute'
	else if(minutes>1)
		text+=minutes+' minutes'
	text+=punctuation[4]

	if(secs==1)
		text+=Math.round(secs)+' second'
	else if(secs>1)
		text+=secs+' seconds'
	//There is no punctuation after seconds, ever.

	return text;
}

//Adds the given time duration in present time and returns a formatted str containing time and date.
function getFinishTimeAfter(seconds)
{
	var now=new Date()
	var date=new Date(now.getTime()+seconds*1000);//

	let hours=date.getHours()
	hours%=12
	hours=hours.toString().padStart(2,'0')//
	let minutes=date.getMinutes().toString().padStart(2,'0')
	let sec=date.getSeconds().toString().padStart(2,'0')
	let meridian=hours>=12?' PM':' AM'
	let day=date.getDate().toString().padStart(2,'0')
	let month=(date.getMonth()+1).toString().padStart(2,'0') // Incremented by 1 because getMonth() counts from 0
	let year=date.getFullYear().toString().padStart(2,'0')

	return hours+':'+minutes+':'+sec+meridian+' on '+day+'-'+month+'-'+year+'.'
}

//Counts non zero numbers in given array
function countNonZeros(arr)
{
	let count=0
	for(let i=0;i<arr.length;i++)
	{
		if(arr[i]!==0)
			count++
	}
	return count
}

//Called when clear button is pressed
function reset()
{
	document.getElementById('size').value=''
	document.getElementById('speed').value=''
	document.getElementById('dur').style.display='none'
	document.getElementById('tim').style.display='none'
}