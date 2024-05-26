import { AppShell, Burger, Container, Group, Overlay, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import NavItems from '../Components/NavItems';
import ToggleColorScheme from '../Components/ToggleColorScheme';

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify='space-between'>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title>
            Stagisti
          </Title>
          <ToggleColorScheme />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavItems toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main className='bg-opacity-5 bg-[#000000]'>
        <Container> {/* Guarda se posso nasconderlo in caso di mobile */}
          <Outlet />
        </Container>
      </AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
    </AppShell>
  );
}