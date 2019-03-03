displayEmails();

function reloadInbox() {
	location.reload();
}

function displayEmails(){
	
	const mailBox = document.getElementById('mailBox');

	var request = new XMLHttpRequest();

	// Open connection using GET request on the URL with mock data
	request.open('GET', 'http://5c5a21f9af3ff700140de477.mockapi.io/api/email', true);

	request.onload = function () {

		// access JSON data
		var data = JSON.parse(this.response);
		// console.log(data);

		if (200 <= request.status && request.status < 400) {
			data.forEach(message => {
				
				// Create a div for each message preview
				const messagePreview = document.createElement('div');
				messagePreview.setAttribute('class', 'messagePreview');
				messagePreview.onclick = function() { selectEmail(message.id); };
				

				const emailAddress = document.createElement('div');
				emailAddress.textContent = message.from;

				  
				const subject = document.createElement('div');
				
				subject.textContent = message.subject; 

				// Append the message preview to the mailbox element
				mailBox.appendChild(messagePreview);

				messagePreview.appendChild(emailAddress);
				messagePreview.appendChild(subject);

			});
		} else {
			console.log('error');
		}
	  }

	  request.send();
}

function selectEmail(messageID) {
	var request = new XMLHttpRequest();

	request.open('GET', 'http://5c5a21f9af3ff700140de477.mockapi.io/api/email/'+ messageID, true);

	request.onload = function () {

		var data = JSON.parse(this.response);
		// console.log(data);

		if (200 <= request.status && request.status < 400) {

			document.getElementById("from").innerHTML = data.from;
			document.getElementById("subject").innerHTML = data.subject;
			document.getElementById("message").innerHTML = data.text;

		} else {
			console.log('error');
		} 
	}

	request.send();

	document.getElementById("messageContent").classList.remove('hidden');
	document.getElementById("mailBox").classList.add('hidden');
	document.getElementById("linkTab").classList.remove('selectedTab');

}

function createMessage(){
	document.getElementById("messageContent").classList.add('hidden');
	document.getElementById("mailBox").classList.add('hidden');
	document.getElementById("createMessage").classList.remove('hidden');
	document.getElementById("linkTab").classList.remove('selectedTab');
	document.getElementById("createTab").classList.add('selectedTab');
}

function sendMessage() {
	// TO DO: Send message to recipient 
}