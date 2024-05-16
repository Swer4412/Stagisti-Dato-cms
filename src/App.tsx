
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from "react-router-dom"
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  
})

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="/windows" element={<Windows />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/errori" element={<Errori />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/curiosita" element={<Curiosita />} />
        <Route path="/altro" element={<Altro />} />
        <Route path="*" element={<NotFound />}></Route>
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