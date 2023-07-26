const mapLanguageToFull = (languageAbbr) => {
    const languageMap = {
      en: 'English',
      es: 'Español',
    }
  
    return languageMap[languageAbbr] || languageAbbr; // Si no se encuentra, devuelve el valor original
  }

  export default mapLanguageToFull;