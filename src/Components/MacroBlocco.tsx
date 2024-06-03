import { Button, List, ListItem, Paper, Text, Title, Tooltip, useMantineTheme } from '@mantine/core';
import { Body, Immagine, Link, MacroBloccoProps, listInterface } from '../_models/commonModels';
import { HashLink } from "react-router-hash-link";
import { IconArrowBack } from '@tabler/icons-react';
import { FC } from 'react';
import ImageCustom from './ImageCustom';
import Markdown from 'react-markdown';
import useDeviceDetect from '../Hooks/useDeviceDetect';

const SubTitleElement: FC<{ subtitle: string }> = ({ subtitle }) => {
    return <Title className='font-normal'>{subtitle}</Title>

};

// Create a custom component for the link element
const LinkElement: FC<{ fullLink: Link }> = ({ fullLink }) => {
    const theme = useMantineTheme();

    // Handle the case when the link is to go back
    if (fullLink.link == null) {
        return (
            <Button mb='md' className='shadow shadow-red-500/50 hover:shadow-lg  hover:shadow-red-500/50' bg={theme.colors.linkButtonRed[3]}
                onClick={() => window.history.back()}
            >
                <Tooltip label="Torna indietro">
                    <IconArrowBack size={40} />
                </Tooltip>
            </Button>
        );
    }

    //Substringo _modelAPiKey per ottenere il nome della pagina a cui é collegato il link
    const pageName = fullLink.link._modelApiKey.substring(0, fullLink.link._modelApiKey.indexOf("_"))

    const hashLinkName = "/" + pageName + "#" + fullLink.link.title

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
const ListElement: FC<{ list: listInterface[] }> = ({ list }) => {
    return (
        <List mb='md'>
            {list.map((item, index) => (
                <ListItem fz='md' key={index}>{item.listElement}</ListItem>
            ))}
        </List>
    );
};

// Create a custom component for the text element
const TextElement: FC<{ testo: string }> = ({ testo }) => {
    return <Text><Markdown className='-my-4'>{testo}</Markdown></Text>; //Mi da problemi quindi gli metto un margine negativo :(
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
        case !!element.link || element.link === null: //Altro casino, se non scelgo un link sul cms, ritorna null
            const fullLink = element as unknown as Link; //Casino
            return <LinkElement fullLink={fullLink} />;
        case !!element.subtitle:
            return <SubTitleElement subtitle={element.subtitle!} />;
        default:
            return null;
    }
};


const MacroBlocco = ({ title, counter, body }: MacroBloccoProps) => {
    const isMobile = useDeviceDetect()
    return ( /*TODO le immagini hano ancora un contenitore fantasma dopo aver metto flex flex-col 
    se metto div al di fuori di imageCustom, allora le immagini non si restingono più ma non cé più il contenitore fantasma
    */
        <Paper mb="sm" shadow="xl" p='md' className='flex flex-col'>
            {/* Nel caso sia un telefono, le scritte non devono essere troppo grandi se no "personalizzazione" sborda */}
            <Title mb='md' className={isMobile ? undefined : 'text-4xl'} id={title} >
                {counter ? counter + "° " + title : title}
            </Title>
            {body.map((element: Body) => renderElement(element))}
        </Paper>
    );
};

export default MacroBlocco;