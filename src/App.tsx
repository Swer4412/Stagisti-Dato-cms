import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom"
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { WINDOWS_PATH, SETUP_PATH,ERRORI_PATH, HARDWARE_PATH, CURIOSITA_PATH, ALTRO_PATH } from "./costants";
import Layout from "./Layout/Layout";
import Windows from "./Pages/Windows";

const theme = createTheme({
  
})

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Welcome />} /> */}
        <Route path={WINDOWS_PATH} element={<Windows />} />
        {/* <Route path={SETUP_PATH} element={<Setup />} />
        <Route path={ERRORI_PATH} element={<Errori />} />
        <Route path={HARDWARE_PATH} element={<Hardware />} />
        <Route path={CURIOSITA_PATH} element={<Curiosita />} />
        <Route path={ALTRO_PATH} element={<Altro />} />
        <Route path="*" element={<NotFound />}></Route> */}
      </Route>
  )
);


const App = () => {

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;