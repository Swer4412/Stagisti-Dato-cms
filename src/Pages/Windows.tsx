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

  return (
    data.allWindowsModels.map((step : AllWindowsModel) => {
      return <>
          <MacroBlocco title={step.title} body={step.body} counter={++counter}/>
        </>
    
    })
  );
};

export default Windows;