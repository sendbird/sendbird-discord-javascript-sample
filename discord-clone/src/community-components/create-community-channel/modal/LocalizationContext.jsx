import React from 'react';

import getStringSet from './Label/stringSet';

const LocalizationContext = React.createContext({
  stringSet: getStringSet('en'),
});

const LocalizationProvider = (stringSet, children)=> {
  return (
    <LocalizationContext.Provider value={{stringSet, children}}>
      {children}
    </LocalizationContext.Provider>
  );
};

export { LocalizationContext, LocalizationProvider };