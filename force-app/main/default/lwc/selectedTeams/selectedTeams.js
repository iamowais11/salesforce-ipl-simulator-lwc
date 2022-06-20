import { LightningElement, wire } from 'lwc';
import getTeams from '@salesforce/apex/IplController.getTeams';
import { publish,MessageContext } from 'lightning/messageService';
import INFOMESSAGEMC from "@salesforce/messageChannel/InfoMessageChannel__c";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SelectedTeams extends LightningElement {

teams;
sTeam1="";
sTeam2="";


@wire(MessageContext)
messageContext;


connectedCallback(){

getTeams()
.then(result => {
this.teams=result;
})
.catch(error => {
alert('error');
});


}


teamOneSelected(event){

const compId=event.currentTarget.dataset.id;

this.sTeam1=event.detail.value;

this.publishMethod(compId);


}
teamTwoSelected(event){
const compId=event.currentTarget.dataset.id;
this.sTeam2=event.detail.value;

this.publishMethod(compId);
}

publishMethod(compId){


if((this.sTeam1===this.sTeam2) && (this.sTeam1!="" && this.sTeam2!="")){
const evt = new ShowToastEvent({
    title: 'Error !',
    message: 'Please Select a Different Team',
    variant: 'error',
});
this.sTeam2="";
this.dispatchEvent(evt);

}

else{
    
const arrMessage={
team1:this.sTeam1,
team2:this.sTeam2,
}


const payload={componentId:compId,componentData:arrMessage};

publish(this.messageContext,INFOMESSAGEMC,payload);
}
}


resetAll(){

this.sTeam1="";
this.sTeam2="";

this.publishMethod("");

}

}