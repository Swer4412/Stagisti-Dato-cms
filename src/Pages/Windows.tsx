import { useQuery } from "graphql-hooks";
import { windowsQuery } from '../Query/Queries';
import { Body } from '../_models/commonModels';
import MacroBlocco from '../Components/MacroBlocco';

const Windows = () => {
  
  let counter = 0

  interface AllWindowsModel {
    title: string
    body: Body[]
  }

  const { loading, error, data } = useQuery(windowsQuery);
  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";

  //TODO Invece che avere la scritta loading, implementare degli skeletons
  //TODO se proprio ho voglia gestisco il caso di errore
  //TODO utilizza un "parser" per gestire il testo markdown che si puó utilizzare su dato cms

  return (
    data.allWindowsModels.map((step : AllWindowsModel) => {
      return <>
          <MacroBlocco title={step.title} body={step.body} counter={++counter}/>
        </>
    
    })
  );
};

export default Windows;