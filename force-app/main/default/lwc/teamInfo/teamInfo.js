import { LightningElement,wire } from 'lwc';
import IPL_TEAMS from '@salesforce/resourceUrl/ipllogos';
import getFiletredTeams from '@salesforce/apex/IplController.getFiletredTeams';
import INFOMESSAGEMC from "@salesforce/messageChannel/InfoMessageChannel__c";
import { subscribe,unsubscribe,MessageContext,APPLICATION_SCOPE } from 'lightning/messageService';
export default class TeamInfo extends LightningElement {
iplTeams1 = IPL_TEAMS+'/NONE.png';
iplTeams2 = IPL_TEAMS+'/NONE.png';

team1Info;
team2Info;


subscription=null;


@wire(MessageContext)
messageContext;



connectedCallback(){


    this.subscribeToMessageChannel();
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
switch (message.componentId) {
case "bmOne":
this.iplTeams1=IPL_TEAMS+'/'+message.componentData.team1+'.png';
this.getTeam1Info(message.componentData.team1);
break;

case "bmTwo":
    this.iplTeams2=IPL_TEAMS+'/'+message.componentData.team2+'.png';
    this.getTeam2Info(message.componentData.team2);
break;
default:
    
    this.iplTeams1=IPL_TEAMS+'/NONE.png';
    this.iplTeams2=IPL_TEAMS+'/NONE.png';
    this.team1Info="";
    this.team2Info="";

}

}

unSubscribeToMessageChannel(){
unsubscribe(this.subscription);
this.subscription=null;

}



getTeam1Info(tCode){

getFiletredTeams({teamCode:tCode})
    .then(result => {
        this.team1Info=result;
        
    })
    .catch(error => {
        // TODO Error handling
    });
}
getTeam2Info(tCode){

getFiletredTeams({teamCode:tCode})
    .then(result => {
        this.team2Info=result;
        
    })
    .catch(error => {
        // TODO Error handling
    });
}

}