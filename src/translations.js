import { initTranslations, setLanguage } from '@sangre-fp/i18n'
setLanguage(document.querySelector('html').getAttribute('lang'))

const localTranslations = {
    hiddenPhenomena_RatingResults: {
      en:`Hidden phenomena`,
      fi:`Piilotetut ilmiöt`
    },
    hiddenPhenomenaDescription_RatingResults: {
      en:`You can toggle the visibility of a phenomenon for other users by pressing the eye icon.`,
      fi:`Voit vaihtaa ilmiön näkyvyyttä muille käyttäjille painamalla silmäkuvaketta.`
    },
    HideTitles_RatingResults: {
      en: 'Hide titles ',
      fi: 'Piilota otsikot'
    },    
    ShowResultsAs_RatingResults: {
      en: 'Show results as: ',
      fi: 'Näytä tulokset muodossa: '
    },
    Average_RatingResults: {
      en: 'Average ',
      fi: 'Keskiarvo'
    },
    Median_RatingResults: {
      en: 'Median',
      fi: 'Mediaani'
    },
    ClearRatings_RatingResults: {
      en:'Clear Ratings',
      fi: 'Tyhjennä arviot'
    }
}

initTranslations(localTranslations);
