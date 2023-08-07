import React, { useState } from 'react';
import apiBuilder from '../../hooks/getApi';
import Card from '../../components/Card/Card';
import Slider from 'react-slick';
import { settingsSlider } from '../../components/Carousel/Settings';
import styles from './SearchPage.module.css'
import { useTranslation } from 'react-i18next'


const SearchPage = () => {

  const { t }= useTranslation();
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const results = await apiBuilder.tryGetSearch(value ,false , "spanish");
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }; 

  return (
    <>
      <form>
        <label className={`${styles.label}`}>{t('Search')}</label>
        <input
          className={`${styles.input} form-control`}
          type='text'
          name='search'
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyPress}
        />
      </form>
      <div className={`${styles.resultSearch}`}>
          <Slider {...settingsSlider}>
          {searchResults.filter((value) => (value.backdrop_path || value.poster_path || value.profile_path) && value.media_type)
            .map((value) => (
              <Card
                      entity={value.media_type}
                      title= {value.title || value.name}
                      imgPath= {value.backdrop_path || value.poster_path || value.profile_path}
                      quality= {'backdropw1280'}
                      id= {value.id}
                      value= {value}
                      key= {value.id}
                      language= {'spanish'}
              />
            ))}
          </Slider>
      </div>
    </>
  );
};

export default SearchPage;
