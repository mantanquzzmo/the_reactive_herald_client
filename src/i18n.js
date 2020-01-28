import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { sv, en } from "../src/locales"

i18n
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false
    },
    debug: true,
    resources: {
      sv: {
        common: sv.sv
      },
      en: {
        common: en.en
      }
    },
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common"
  });

export default i18n;
