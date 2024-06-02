import { Image } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import useIsSmallDevice from "../Hooks/useIsSmallDevice";

function ImageCustom({ link }: { link: string }) {
  const [scale, setScale] = useState(1);

  const isSmallDevice = useIsSmallDevice()

  const imgRef = useRef<HTMLImageElement>(null);

  const toggleScale = () => {
    setScale((prevScale) => (prevScale === 1 ? 1.5 : 1));
  };

  const resetScale = () => {
    setScale(1);
  };

  useEffect(() => {
    const img = imgRef.current!;
    img.style.transform = `scale(${scale})`;

    img.style.transformOrigin = "center";

    img.style.cursor = img.style.cursor == "zoom-out" ? "zoom-in" : "zoom-out"

  }, [scale]);

  return (
    <Image
      src={link}
      ref={imgRef}
      mb="xl"
      radius='md'
      fit="contain"
      maw={600}
      mah={450}
      style={isSmallDevice ? undefined : { 'width': 'auto' }}
      className="hover:cursor-zoom-in duration-200 shadow-lg opacity-100 flex-shrink"
      onClick={isSmallDevice ? undefined : toggleScale}
      onMouseLeave={isSmallDevice ? undefined : resetScale}
    />
  );
}

export default ImageCustom;
