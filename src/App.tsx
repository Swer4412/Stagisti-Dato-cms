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
  WINDOWS_PATH,
  SETUP_PATH,
  ERRORI_PATH,
  HARDWARE_PATH,
  CURIOSITA_PATH,
  ALTRO_PATH,
} from "./costants";
import Layout from "./Layout/Layout";
import Windows from "./Pages/Pagina";
import useScrollProgress from "./Hooks/useScrollProgress";
import Pagina from "./Pages/Pagina";

const oceanBlue: MantineColorsTuple = [
  "#e5fcf7",
  "#d8f3ec",
  "#b5e4d8",
  "#8fd4c2",
  "#6fc7af",
  "#5abfa4",
  "#4dbb9e",
  "#3ca489",
  "#2f9379",
  "#198068",
];

const lavanderPurple: MantineColorsTuple = [
  "#f4f1ff",
  "#e3e2f1",
  "#c5c1da",
  "#a59fc5",
  "#8a82b2",
  "#796fa7",
  "#7066a2",
  "#5f568e",
  "#544c80",
  "#484173",
];

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
    oceanBlue,
    lavanderPurple,
    linkButtonRed,
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* <Route index element={<Home />} /> */}
      <Route
        path={`/${WINDOWS_PATH}`}
        element={<Pagina pathName={WINDOWS_PATH} />}
      />
      <Route
        path={`/${SETUP_PATH}`}
        element={<Pagina pathName={SETUP_PATH} />}
      />
      <Route
        path={`/${ERRORI_PATH}`}
        element={<Pagina pathName={ERRORI_PATH} />}
      />
      <Route
        path={`/${HARDWARE_PATH}`}
        element={<Pagina pathName={HARDWARE_PATH} />}
      />
      <Route
        path={`/${CURIOSITA_PATH}`}
        element={<Pagina pathName={CURIOSITA_PATH} />}
      />
      <Route
        path={`/${ALTRO_PATH}`}
        element={<Pagina pathName={ALTRO_PATH} />}
      />
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
