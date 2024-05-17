import { AppShell, Burger, Group, Title, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet } from 'react-router-dom';
import ToggleColorScheme from '../Components/ToggleColorScheme';
import NavItems from '../Components/NavItems';

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Container fluid>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group justify="space-between" style={{ flex: 1 }}>
              <Group style={{'color': 'inherit', 'textDecoration' : 'none' }} component={Link} > {/*Per qualche oscuro motivo funziona, non lo tocco */}
                <Title>Stagisti</Title>
              </Group>
              <Group ml="xl" gap={0} visibleFrom="sm">
                <NavItems />
              </Group>
            </Group>
            <Group>
              <ToggleColorScheme />
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
          <NavItems />
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>

      </AppShell>
    </Container>
  );
}