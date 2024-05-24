import { Card, Title } from '@mantine/core';
import { Body, Link } from '../_models/commonModels';
import { HashLink } from "react-router-hash-link";

interface MacroBloccoProps {
    counter?: number,
    title: string,
    body: Body[]
}

//TODO guarda come gestire la descrizione del link, dato che prima era così:
// {
//     "link" : {
//         "text" : "Windows è partito senza boot menu",
//         "to" : "errori#WINDOWS SENZA BOOT MENU"
//     }
// },

//Mentre ora é cosí:
// {
//     "link": {
//       "title": "WINDOWS SENZA BOOT MENU",
//       "_modelApiKey": "errori_model"
//     },
//     "descrizioneLink": "Windows è partito senza boot menù"
//   }

//Guarda se esiste un modo per modifcare su dato cms oppure se é meglio modificare il codice se é possibile

const STitleElement = ({ stitle }: { stitle: string }) => (
    <Title>{stitle}</Title>
)

// Create a custom component for the link element
const LinkElement = ({ link }: { link: Link }) => {
    // Use destructuring to access the properties of the link object
    const { title, _modelApiKey } = link;

    //Substringo _modelAPiKey per ottenere il nome della pagina a cui é collegato il link
    //TODO

    // Handle the case when the link is to go back
    if (title === "") {
        return (
            <p
                onClick={() => window.history.back()}
            >
                <RiArrowGoBackFill size={40} />
            </p>
        );
    }

    // Handle the case when the link is to another page
    return (
        <HashLink to={url + to}>
            <p>{text}</p>
        </HashLink>
    );
};

// Create a custom component for the image element
const ImageElement = ({ image }: { image: string }) => {
    //Lascio image in un altro file perchè rimane più oridinato
    return <Image link={url + image} />;
};

// Create a custom component for the list element
const ListElement = ({ list }: { list: string[] }) => {
    return (
        <ul className="list-disc list-inside mb-4 font-calibri text-lg">
            {list.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
};

// Create a custom component for the text element
const TextElement = ({ text }: { text: string }) => {
    return <p className="my-4 text-gray-800 font-calibri text-xl">{text}</p>;
};

// Use a switch statement to handle different types of elements
const renderElement = (element: Body) => {
    switch (true) {
        case !!element.text:
            return <TextElement text={element.text!} />;
        case !!element.image:
            return <ImageElement image={element.image!} />;
        case !!element.list:
            return <ListElement list={element.list!} />;
        case !!element.link:
            return <LinkElement link={element.link!} />;
        case !!element.stitle:
            return <STitleElement stitle={element.stitle!} />;
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