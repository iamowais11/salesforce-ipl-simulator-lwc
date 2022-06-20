import { LightningElement ,wire} from 'lwc';
import getMatches from '@salesforce/apex/IplController.getMatches';
import getFilteredMatches from '@salesforce/apex/IplController.getFilteredMatches';

import INFOMESSAGEMC from "@salesforce/messageChannel/InfoMessageChannel__c";
import { subscribe,unsubscribe,MessageContext,APPLICATION_SCOPE } from 'lightning/messageService';


const columns = [
{ label: 'Match No.', fieldName: 'Match_No_c__c', type: 'number' },
{ label: 'Day', fieldName: 'Day_c__c', type: 'text' },
{ label: 'Date', fieldName: 'Date_c__c', type: 'date' },
{ label: 'Match', fieldName: 'Match_c__c', type: 'text' },
{ label: 'Venue', fieldName: 'Venue_c__c', type: 'text' },
];

export default class MatchSummary extends LightningElement {
data = [];
columns = columns;
subscription=null;


@wire(MessageContext)
messageContext;


connectedCallback(){

this.subscribeToMessageChannel();

getMatches()
.then(result => {
this.data=result;

})
.catch(error => {
alert('error');
});

}
disconnectedCallback(){

this.unSubscribeToMessageChannel();
}



subscribeToMessageChannel(){
if (!this.subscription) {
this.subscription = subscribe(
this.messageContext,
INFOMESSAGEMC,
(message) => this.handleMessage(message),
{ scope: APPLICATION_SCOPE }
);
}

}

handleMessage(message) {

let t1=message.componentData.team1;
let t2=message.componentData.team2;

getFilteredMatches({team1:t1,team2:t2})
.then(result => {
    this.data=result; 
})
.catch(error => {
    alert('error');
});



}

unSubscribeToMessageChannel(){

unsubscribe(this.subscription);
this.subscription=null;

}




}
