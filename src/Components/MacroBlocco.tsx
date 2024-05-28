import { Button, List, ListItem, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { Body, Immagine, Link, listElement } from '../_models/commonModels';
import { HashLink } from "react-router-hash-link";
import { IconArrowLeftCircle } from '@tabler/icons-react';
import { FC } from 'react';
import ImageCustom from './ImageCustom';

interface MacroBloccoProps {
    counter?: number,
    title: string,
    body: Body[]
}

const SubTitleElement: FC<{ subtitle: string }> = ({ subtitle }) => (
    <Title>{subtitle}</Title>
);

// Create a custom component for the link element
const LinkElement: FC<{ fullLink: Link }> = ({ fullLink }) => {
    const theme = useMantineTheme();
    //Substringo _modelAPiKey per ottenere il nome della pagina a cui é collegato il link
    const pageName = fullLink.link._modelApiKey.substring(0, fullLink.link._modelApiKey.indexOf("_"))

    const hashLinkName = "/" + pageName + "#" + fullLink.link.title

    // Handle the case when the link is to go back
    if (fullLink.link.title === "") {
        return (
            <Button
                onClick={() => window.history.back()}
            >
                <IconArrowLeftCircle size={40} />
            </Button>
        );
    }

    // Handle the case when the link is to another page
    return (
        <HashLink to={hashLinkName}>
            <Button mb='md' className='shadow shadow-red-500/50 hover:shadow-lg  hover:shadow-red-500/50' bg={theme.colors.linkButtonRed[3]}>
                <Text mb='none' size='md' className='no-underline'>
                    {fullLink.descrizioneLink}
                </Text>
            </Button>
        </HashLink>
    );
};

// Create a custom component for the image element
const ImageElement: FC<{ immagine: Immagine }> = ({ immagine }) => {
    //Lascio image in un altro file perchè rimane più oridinato
    return <ImageCustom link={immagine.url} />
};

// Create a custom component for the list element
const ListElement: FC<{ list: listElement[] }> = ({ list }) => {
    return (
        <List mb='md'>
            {list.map((item, index) => (
                <ListItem key={index}>{item.listElement}</ListItem>
            ))}
        </List>
    );
};

// Create a custom component for the text element
const TextElement: FC<{ testo: string }> = ({ testo }) => {
    return <Text>{testo}</Text>;
};

// Use a switch statement to handle different types of elements
const renderElement = (element: Body) => {
    switch (true) {
        case !!element.testo:
            return <TextElement testo={element.testo!} />;
        case !!element.immagine:
            return <ImageElement immagine={element.immagine!} />;
        case !!element.list:
            return <ListElement list={element.list!} />;
        case !!element.link:
            const fullLink = element as unknown as Link; //Casino
            return <LinkElement fullLink={fullLink} />;
        case !!element.subtitle:
            return <SubTitleElement subtitle={element.subtitle!} />;
        default:
            return null;
    }
};


const MacroBlocco = ({ title, counter, body }: MacroBloccoProps) => {
    return (
        <Paper mb="sm" shadow="xl" p='md'>
            <Title mb='md' id={title}>
                {counter ? counter + "° " + title : title}
            </Title>
            {body.map((element: Body) => renderElement(element))}
        </Paper>
    );
};

export default MacroBlocco;