// Languages.tsx
import { useTranslation } from "react-i18next";
import translationsEN from "@/public/locales/en/translation.json";
import translationsUR from "@/public/locales/ur/translation.json";
import { Separator } from "@/components/ui/separator";

interface LangProps {
  engData: any;
  urdData: any;
}
const Languages = ({ engData, urdData }: LangProps) => {
  // const { t, i18n } = useTranslation();
  // const language = i18n.language;
  // const translations = language === "ur" ? translationsUR : translationsEN;

  // const changeLanguage = (lng: string) => {
  //   i18n.changeLanguage(lng).then(() => {
  //   });
  // };

  return (
    <div>
      {/* <div>
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("ur")}>Urdu</button>
      </div> */}

      {/* Rendering the translation data */}
      {engData.map((dat: any, index: number) => (
        <div key={index}>
          <p>{dat.questionText}</p>
          <ul>
            {dat.options.map((op: any, index: number) => (
              <li key={index}>{op}</li>
            ))}
          </ul>
        </div>
      ))}
      <Separator className="my-3" />
      {urdData.map((dat: any, index: number) => (
        <div key={index}>
          <p>{dat.questionText}</p>
          {dat.options.map((op: any, index: number) => (
            <li key={index}>{op}</li>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Languages;
