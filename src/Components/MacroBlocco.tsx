import { HashLink } from "react-router-hash-link";
import { RiArrowGoBackFill } from "react-icons/ri"

//TODO lo tengo per esempio, devo cambiare tutto praticamente

export type StepProps = {
    counter?: number,
    title: string,
    body: Array<Element>
}

type Element = {
    text?: string;
    image?: string;
    list?: Array<string>;
    link?: Link
    stitle?: string
}

type Link = {
    text: string,
    to: string
}

const url = "/Stagisti/"

const STitleElement = ({ stitle }: { stitle: string }) => {
    return <p className="text-5xl font-semibold my-4 font-mono">{stitle}</p>;
}

// Create a custom component for the link element
const LinkElement = ({ link }: { link: Link }) => {
    // Use destructuring to access the properties of the link object
    const { text, to } = link;
    const linkStyle = "my-4 text-red-500 font-calibri text-xl border-red-700 border-b-4 rounded-lg p-1 bg-red-200 hover:bg-red-400 hover:text-gray-800 w-fit"

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
const Step = ({ title, counter, body }: StepProps) => {
    return (
        <div className="bg-gray-100 p-4 rounded border border-gray-300 max-w-7xl m-4">
            <h1 className="text-5xl font-bold mb-4 font-mono w-fit" id={title}>
                {counter ? counter + "° " + title : title}
            </h1>
            {body.map((element: Element) => renderElement(element))}
        </div>
    );
};

export default Step