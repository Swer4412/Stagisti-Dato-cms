import { useState } from 'react';
import { Group, Button} from '@mantine/core';
import classes from './NavItems.module.css';
import { useNavigate } from 'react-router-dom';


const links = [
    { label: "Lista Clienti", link: "/clientlist" },
    { label: "Lista Libri", link: "/booklist" },
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