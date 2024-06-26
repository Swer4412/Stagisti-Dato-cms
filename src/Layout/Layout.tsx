import { AppShell, Burger, Container, Group, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet } from 'react-router-dom';
import NavItems from '../Components/NavItems';
import ToggleColorScheme from '../Components/ToggleColorScheme';
import useDeviceDetect from '../Hooks/useDeviceDetect';
import useIsSmallDevice from '../Hooks/useIsSmallDevice';
import { HEADER_HEIGHT } from '../costants';


export default function Layout() {
  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const linkStyle = {
    color: colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.blue[6],
    textDecoration: 'none', // Questo rimuove il sottolineato
    // Aggiungi qui altri stili se necessario
  };

  const [opened, { toggle }] = useDisclosure();
  const isSmallDevice = useIsSmallDevice()
  const isMobile = useDeviceDetect()
  
  return (
    <AppShell
    
      header={{ height: HEADER_HEIGHT }}
      navbar={{ width: {md: 200, lg: 250 }, breakpoint: 'md', collapsed: { mobile: !opened } }}
      aside={{ width: {md: 200, lg: 250 }, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Header className='shadow border-none'>
        <Group h="100%" px="md" justify='space-between'>
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Title>
            <Link to="/" style={linkStyle}>
              Stagisti
            </Link>
          </Title>
          <ToggleColorScheme />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className={`md:bg-opacity-[0.05] md:bg-[#000000] bg-opacity-50 border-none ${isMobile ? 'bg-opacity-100' : ''}`} >
        <NavItems toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main className='bg-opacity-[0.08] bg-[#000000] border-none'>
        <Container p={isSmallDevice ? '0' : undefined}>
          <Outlet />
        </Container>
      </AppShell.Main>
      <AppShell.Aside p="md" className='border-none z-0'></AppShell.Aside>
    </AppShell>
  );
}