export const reformWeather = () => json ={

};

/*
    This function is no longer useful
 */
export const isValid = () => json => {
    if(json == null){
        return false;
    }
    else if(json.some(item => item.name === 'cod' &&
        (item.value === 401 || item.value === 403))){
        return false;
    }
  return true;
};