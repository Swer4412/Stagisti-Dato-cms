import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import {
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import "@mantine/nprogress/styles.css";
import {
  routesArr
} from "./costants";
import Layout from "./Layout/Layout";
import useScrollProgress from "./Hooks/useScrollProgress";
import Pagina from "./Pages/Pagina";

const linkButtonRed: MantineColorsTuple = [
  "#ffebeb",
  "#fad6d6",
  "#efabab",
  "#e57e7d",
  "#dd5857",
  "#d83f3e",
  "#d73232",
  "#bf2424",
  "#aa1d1f",
  "#961318",
];

const theme = createTheme({
  autoContrast: true,
  components: {
    Text: {
      defaultProps: {
        size: "lg",
        lineHeight: "xl",
        mb: "sm",
      },
    },
  },
  colors: {
    linkButtonRed,
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* <Route index element={<Home />} /> */}
      {/* Le rotte vengono mappate da un array */}
      {routesArr.map((routePath) => (
        <Route
          path={`/${routePath}`}
          element={<Pagina pathName={routePath} />}
        />
      ))
      }
      {/* <Route path="*" element={<Home />} /> */}
    </Route>
  )
);

const App = () => {
  //Si occupa di far progredire il NavigationProgress in base allo scroll della pagina
  useScrollProgress();

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications />
      <NavigationProgress />
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
