import Step from '../Components/MacroBlocco'
import { useQuery } from "graphql-hooks";
import { windowsQuery } from '../Query/Queries';

const Windows = () => {
  
  const { loading, error, data } = useQuery(windowsQuery);
  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";

  let counter = 0;

  return (
    <>
    {JSON.stringify(data)}
    </>
  )

//   return (
//     file.map((step) => {
//       return <>
//         <Step title={step.title} body={step.body} counter={++counter} />
//       </>
//     })
//   );
};

export default Windows;