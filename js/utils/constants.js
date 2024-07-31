export const HIDDEN_BLOCK_CLASS = 'hidden';

export const EndpointEnum = Object.freeze({
  GET_DATA: 'data',
  SEND_DATA: ''
});

export const MethodEnum = Object.freeze({
  GET: 'GET',
  POST: 'POST'
});

export const ModalEnum = Object.freeze({
  UPLOAD_PHOTO: 'uploadPhoto',
  FULLSCREEN_PHOTO: 'fullscreenPhoto',
});

export const FilterNameEnum = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const defaultParams = {
  config: {
    min: 0,
    max: 100,
    step: 1,
  }
};

const chromeParams = {
  cssFilterName: 'grayscale',
  units: '',
  config: {
    min: 0,
    max: 1,
    step: 0.1,
  }
};

const sepiaParams = {
  cssFilterName: 'sepia',
  units: '',
  config: {
    min: 0,
    max: 1,
    step: 0.1,
  }
};

const marvinParams = {
  cssFilterName: 'invert',
  units: '%',
  config: {
    min: 0,
    max: 100,
    step: 1,
  }
};

const phobosParams = {
  cssFilterName: 'blur',
  units: 'px',
  config: {
    min: 0,
    max: 3,
    step: 0.1,
  }
};

const heatParams = {
  cssFilterName: 'brightness',
  units: '',
  config: {
    min: 1,
    max: 3,
    step: 0.1,
  }
};

export const FilterParams = Object.freeze({
  [FilterNameEnum.DEFAULT]: defaultParams,
  [FilterNameEnum.CHROME]: chromeParams,
  [FilterNameEnum.SEPIA]: sepiaParams,
  [FilterNameEnum.MARVIN]: marvinParams,
  [FilterNameEnum.PHOBOS]: phobosParams,
  [FilterNameEnum.HEAT]: heatParams
});
