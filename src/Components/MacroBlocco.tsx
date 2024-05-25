import { Button, Card, Image, List, ListItem, Text, Title } from '@mantine/core';
import { Body, Immagine, Link, listElement } from '../_models/commonModels';
import { HashLink } from "react-router-hash-link";
import { IconArrowLeftCircle } from '@tabler/icons-react';
import { FC } from 'react';

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

    //Substringo _modelAPiKey per ottenere il nome della pagina a cui é collegato il link
    const pageName = fullLink.link._modelApiKey.substring(0, fullLink.link._modelApiKey.indexOf("_"))

    const hashLinkName = pageName + "#" + fullLink.link.title

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
            <Button>{fullLink.descrizioneLink}</Button>
        </HashLink>
    );
};

// Create a custom component for the image element
const ImageElement: FC<{ immagine: Immagine }> = ({ immagine }) => {
    //Lascio image in un altro file perchè rimane più oridinato
    return <Image
        radius="md"
        h="auto"
        w="auto"
        fit="contain"
        src={immagine.url}
    />
};

// Create a custom component for the list element
const ListElement: FC<{ list: listElement[] }> = ({ list }) => {
    return (
        <List>
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
            return <LinkElement fullLink={element.link!} />; //TODO passare element.link vuol dire che non passo descrizioneLink
        case !!element.subtitle:
            return <SubTitleElement subtitle={element.subtitle!} />;
        default:
            return null;
    }
};


//Magari usa Card
const MacroBlocco = ({ title, counter, body }: MacroBloccoProps) => {
    return (
        <Card>
            <Title id={title}>
                {counter ? counter + "° " + title : title}
            </Title>
            {body.map((element: Body) => renderElement(element))}
        </Card>
    );
};

export default MacroBlocco;