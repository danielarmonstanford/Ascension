import Image from "next/image";
import { personalDocumentation } from "../../content/personal-documentation";

const IMAGE_PATH = "/media/daniel-stanford-personal-radiographs.webp";

export default function PersonalDocumentation({ locale = "en" }) {
  const copy = personalDocumentation[locale] || personalDocumentation.en;

  return (
    <figure className="personal-documentation">
      <p className="personal-documentation-label">{copy.label}</p>
      <Image
        src={IMAGE_PATH}
        alt={copy.alt}
        width={660}
        height={440}
        sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1200px) 48vw, 34rem"
      />
      <figcaption>{copy.caption}</figcaption>
    </figure>
  );
}
