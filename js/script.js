var app = new Vue( {

	el: '#root',

	data: {
		newMessage: '',
		filterTextName: '',
		currentIndexAvatar: 0, 
		activeMessage: false,
		contacts: [
			{
				name: 'Michele',
				avatar: '_1',
				visible: true,
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Hai portato a spasso il cane?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:50:00',
						text: 'Ricordati di dargli da mangiare',
						status: 'sent'
					},
					{
						date: '10/01/2020 16:15:22',
						text: 'Tutto fatto!',
						status: 'received'
					}
				],
			},
			{
				name: 'Fabio',
				avatar: '_2',
				visible: true,
				messages: [
					{
						date: '20/03/2020 16:30:00',
						text: 'Ciao come stai?',
						status: 'sent'
					},
					{
						date: '20/03/2020 16:30:55',
						text: 'Bene grazie! Stasera ci vediamo?',
						status: 'received'
					},
					{
						date: '20/03/2020 16:35:00',
						text: 'Mi piacerebbe ma devo andare a fare la spesa.',
						status: 'sent'
					}
				],
			},
			{
				name: 'Samuele',
				avatar: '_3',
				visible: true,
				messages: [
					{
						date: '28/03/2020 10:10:40',
						text: 'La Marianna va in campagna',
						status: 'received'
					},
					{
						date: '28/03/2020 10:20:10',
						text: 'Sicuro di non aver sbagliato chat?',
						status: 'sent'
					},
					{
						date: '28/03/2020 16:15:22',
						text: 'Ah scusa!',
						status: 'received'
					}
				],
			},
			{
				name: 'Luisa',
				avatar: '_4',
				visible: true,
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Lo sai che ha aperto una nuova pizzeria?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:50:00',
						text: 'Si, ma preferirei andare al cinema',
						status: 'received'
					}
				],
			},
		]		
	},
	methods : {
		// viene richiamata per selezionare l'utente
		selectUser(index) {
			this.currentIndexAvatar = index;
			this.activeMessage = false;
		},
		// viene richiamata per filtrare gli utenti in base al contenuto immesso nell'imput
		userFilter() {
			this.contacts.forEach((element) =>{
				
				if( element.name.toLowerCase().includes(this.filterTextName.toLowerCase())) {
					element.visible = true;
				} else {
					element.visible = false;
				}
				console.log(element.name + ' ' + element.visible);
			});
		},
		// viene richiamata per inviare un nuovo messaggio in chat
		sendMessage() {
			
			if( this.newMessage.length > 0 ) {

				let msg = {};
				msg.date = dayjs().format('DD/MM/YYYY HH:mm:ss');
				msg.text = this.newMessage;
				msg.status = 'sent';
				this.contacts[this.currentIndexAvatar].messages.push(msg);
				this.userAnswer();
				this.newMessage = '';
			} 
		},
		// viene richiamata insieme a recivedMessage per simulare una risposta utente
		userAnswer() {
			setTimeout(() => {this.recivedMessage('ok');} ,1000);
		},
		recivedMessage(text) {
			
			if( text.length > 0 ) {
				let msg = {};
				msg.date = dayjs().format('DD/MM/YYYY HH:mm:ss');
				msg.text = text;
				msg.status = 'received';
				this.contacts[this.currentIndexAvatar].messages.push(msg);
			}
		},
		menuDropdown(index) {

			if ( this.activeMessage === index ) {
				this.activeMessage = false;
			} else {
				this.activeMessage = index;
			}
			  

		},
		deleteMessage(index) {
			this.contacts[this.currentIndexAvatar].messages.splice(index, 1);
			this.activeMessage = false;
		},
		getActiveContactLastMessage() {
			const activeContactMessages = this.contacts[this.currentIndexAvatar].messages;

			return activeContactMessages[activeContactMessages.length -1].date;
		},
		getLastMessage(contactIndex) {
			const contactMessages = this.contacts[contactIndex].messages;
            const contactLastMessages = contactMessages[contactMessages.length - 1].text;
            let textToPrint = contactLastMessages.slice(0, 30);

			if( textToPrint.length >= 30 ) {
				textToPrint += '...';
			}
			
			return textToPrint;
		}
	}
})