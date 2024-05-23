import { Body, Link } from '../_models/commonModels';
import { HashLink } from "react-router-hash-link";

interface MacroBloccoProps {
    counter?: number,
    title: string,
    body: Body[]
}

//TODO utilizza mantine per cambiare lo stile tailwind in stile mantine
//Spunti: progress bar, barra accanto che mostra i diversi titoli

const STitleElement = ({ stitle }: { stitle: string }) => {
    return { stitle }
}

// Create a custom component for the link element
const LinkElement = ({ link }: { link: Link }) => {
    // Use destructuring to access the properties of the link object
    const { title, _modelApiKey } = link;

    //Substringo _modelAPiKey per ottenere il nome della pagina a cui é collegato il link
    //TODO

    // Handle the case when the link is to go back
    if (to === "BACK") {
        return (
            <p
                className={linkStyle}
                onClick={() => window.history.back()}
            >
                <RiArrowGoBackFill size={40} />
            </p>
        );
    }

    // Handle the case when the link is to another page
    return (
        <HashLink to={url + to}>
            <p className={linkStyle}>{text}</p>
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
const renderElement = (element: Element) => {
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


// Use destructuring to access the properties of the props object
const MacroBlocco = ({ title, counter, body }: MacroBloccoProps) => {
    return (
        <div className="bg-gray-100 p-4 rounded border border-gray-300 max-w-7xl m-4">
            <h1 className="text-5xl font-bold mb-4 font-mono w-fit" id={title}>
                {counter ? counter + "° " + title : title}
            </h1>
            {body.map((element: Body) => renderElement(element))}
        </div>
    );
};

export default MacroBlocco;