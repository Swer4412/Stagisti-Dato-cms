import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import classes from './NavItems.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { routesArr } from '../costants';

export default function NavItems({toggle}: {toggle: () => void}) {
    const [activeLink, setActiveLink] = useState(""); //Lascio stringa vuota se no typescript rompe
    const navigate = useNavigate();

    const location = useLocation();

    //Mi sorprendo di quanto fragile sia questo codice ma va bene, finche funziona
    useEffect(() => {
        setActiveLink(location.pathname.substring(1))
    }, [location])

    return (
        <>
            {routesArr.map((route: string) => (
                <Button
                    fz="lg" 
                    lh="xl"
                    mb="md"
                    key={route}
                    variant='subtle'
                    className={classes.link}
                    data-active={activeLink === route || undefined}
                    onClick={(event) => {
                        event.preventDefault();
                        setActiveLink(route);
                        toggle()
                        navigate(route);
                    }}
                >
                    {route[0].toUpperCase() + route.slice(1)}
                </Button>
            ))}
        </>
    );
}
