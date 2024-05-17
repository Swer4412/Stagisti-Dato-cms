import { useState } from 'react';
import { Group, Button} from '@mantine/core';
import classes from './NavItems.module.css';
import { useNavigate } from 'react-router-dom';
import { WINDOWS_PATH, SETUP_PATH,ERRORI_PATH, HARDWARE_PATH, CURIOSITA_PATH, ALTRO_PATH } from "../costants";

const links = [
    { label: "Windows", link: WINDOWS_PATH },
    { label: "Setup", link: SETUP_PATH },
    { label: "Errori", link: ERRORI_PATH },
    { label: "Hardware", link: HARDWARE_PATH },
    { label: "Curiosità", link: CURIOSITA_PATH },
    { label: "Altro", link: ALTRO_PATH },
]

export default function NavItems() {
    const [activeLink, setActiveLink] = useState(links[0].link);
    const navigate = useNavigate()

    const items = links.map((link) => (
        <Button
            key={link.link}
            variant='subtle'
            className={classes.link}
            data-active={activeLink === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActiveLink(link.link);
                navigate(link.link)
            }}
        >
            {link.label}
        </Button>
    ));

    return (
        <Group justify="space-between" gap={5} visibleFrom="xs">
            {items}
        </Group>
    );
}