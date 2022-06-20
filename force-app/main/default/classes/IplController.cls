public with sharing class IplController {

@AuraEnabled
public static List<Team_c__c> getTeams(){
try {
List <Team_c__c> teamList=[Select Name__c,Team_Code_c__c,Owner_c__c from Team_c__c];
return teamList;

} catch (Exception e) {
throw new AuraHandledException(e.getMessage());
}
}

@AuraEnabled
public static List<Team_c__c> getFiletredTeams(String teamCode){
try {
    List <Team_c__c> teamList=[Select Name__c,Team_Code_c__c,Owner_c__c from Team_c__c where Team_Code_c__c= :teamCode];
return teamList;
} catch (Exception e) {
    throw new AuraHandledException(e.getMessage());
}
}

@AuraEnabled
public static List <Match_Fixture_c__c> getMatches(){
try {

List <Match_Fixture_c__c> matchList=[Select Match_No_c__c,Day_c__c,Date_c__c,Match_c__c,Venue_c__c from Match_Fixture_c__c];
return matchList;
} catch (Exception e) {
throw new AuraHandledException(e.getMessage());
}
}



@AuraEnabled
public static List <Match_Fixture_c__c> getFilteredMatches(String team1,String team2){
try {
List <Match_Fixture_c__c> matchList=[Select Match_No_c__c,Day_c__c,Date_c__c,Match_c__c,Venue_c__c from Match_Fixture_c__c WHERE (Match_c__c LIKE :team1+'%' OR Match_c__c LIKE :'%'+team1) AND (Match_c__c LIKE :team2+'%' OR Match_c__c LIKE :'%'+team2 )];
return matchList;
} catch (Exception e) {
throw new AuraHandledException(e.getMessage());
}
}

@AuraEnabled
public static String getNews(){

String strResponse = null;
try {
HttpRequest request = new HttpRequest();
request.setEndpoint('https://newsapi.org/v2/top-headlines?country=in&category=sports&page=1&q=IPL&apiKey=8b7743e5cbf445fc9786259713aaee9a');
request.setMethod('GET');

Http http = new Http();
HttpResponse response = http.send(request);
// If the request is successful, parse the JSON response.
if(response.getStatusCode() == 200) {

strResponse = response.getBody();
}
else{
    throw new CalloutException(response.getBody());
    
}
return strResponse;

} catch (Exception e) {
throw new AuraHandledException(e.getMessage());
}


}





}

