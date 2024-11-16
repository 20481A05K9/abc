import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en,hin,tel } from "./translations";



i18next.use(initReactI18next).init({
    compatibilityJSON:'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources:{
        en:en,
        tel:tel,
        hin:hin
    },
    react:{
        useSuspense:false
    }
  })
  
export default i18next