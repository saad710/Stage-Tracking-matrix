import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import StageTable from './StageTable';

const ZOHO = window.ZOHO;

function App() {
  const [zohoInitialized, setZohoInitialized] = useState(false);
  const [entity, setEntity] = useState("");
  const [entityId, setEntityId] = useState("");
  const [stageHistory, setStageHistory] = useState([]);
  useEffect(()=> {
    /*
    * Subscribe to the EmbeddedApp onPageLoad event before initializing 
    */
    
    ZOHO.embeddedApp.on("PageLoad",function(data)
    {
      console.log(data);
      setEntity(data.Entity);
      setEntityId(data.EntityId)
      //Custom Bussiness logic goes here
    })

    /*
    * initializing the widget.
    */
    ZOHO.embeddedApp.init().then( () => {
      setZohoInitialized(true);
    });
  }, [])

  useEffect(async () => {
    if(zohoInitialized && entity !== "" && entityId !== ""){
      const stageHistoryResp = await ZOHO.CRM.API.getRelatedRecords({Entity:entity,RecordID:entityId,RelatedList:"Stage_History",page:1,per_page:200})
      console.log("Related List Data", stageHistoryResp?.data)
      setStageHistory(stageHistoryResp?.data);
    }

  }, [zohoInitialized, entity, entityId])

  const lengthData = stageHistory?.length

  
  let putStage = []
  let loopCount = 0
  const stageTrack = (tempArray) => {
    let stageArr = []
    let firstStage = tempArray[loopCount];
    let objData = {}
    tempArray.forEach((temp,index) => {
      //  console.log(temp.Last_Modified_Time)
       const dateData = Math.abs((new Date(firstStage.Last_Modified_Time).getTime() - new Date(temp.Last_Modified_Time).getTime()) / 1000);
     
       console.log(dateData)
       objData = {[temp.Stage] : dateData}
       console.log(objData)
       stageArr.push({...objData})
       console.log(stageArr)
       console.log(firstStage?.Stage)
      //  firstStage = temp;
    })
    // console.log(stageArr)
   const findData = {[firstStage?.Stage] : stageArr}
   console.log(findData)
   putStage.push(findData);
  
  console.log(putStage)
  //  console.log(findData)
         if(putStage.length < lengthData ){
           loopCount = loopCount + 1;
            stageTrack(tempArray);
         }
   return putStage;
  }
  
  //final-result
const result = stageTrack(stageHistory)
console.log(result)

  return (
    <div className="App">
        <StageTable result= {result}/>
    </div>
  );
}

export default App;
