export default class UrlService {
  getQueryParamsObject = () => {

    const index = window.location.href.indexOf("?")
    if (index == -1) return "{}"

    const urlParams = new URLSearchParams(window.location.href.substring(index));
    
    const search = urlParams.toString()
    
    return search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', (key, value) => key === "" ? value : decodeURIComponent(value)) : '';
  }

  convertToQueryString(obj) {
    return new URLSearchParams(obj).toString();
  }

  setParam = (name, value) => {

    const index = window.location.href.indexOf("?")
    
    const urlParams = new URLSearchParams(index !== -1 ? window.location.href.substring(index) : '');
    urlParams.set(name, value);

    const baseUrl = window.location.href.substring(0, index);
    
    window.location.href = `${(baseUrl || window.location.href)}?${urlParams.toString()}`;
  }

  clearQueryParams = () => {

    const index = window.location.href.indexOf("?")

    if (index == -1) return;
    
    window.location.href = window.location.href.substring(0, index);
  }
}
