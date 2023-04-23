import moment from "moment";
import { IntlShape } from "react-intl";

// import { FloorTypes, SimplifiedFloorTypes } from '../types';
import {
  REGEX_IMAGE_MARKDOWN,
  REGEX_LINK_MARKDOWN,
  DEFAULT_FORMAT_DATE,
} from "../commons/constants";

export const formatNumberToSquareString = (val: number): string => {
  if (!val || Number.isNaN(val)) return null;

  const decimal = (val || 0)
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, "")
    .replace(",00", "");

  return `${decimal} m²`;
};

// format price
export const formatCurrency = (val: number, intl: IntlShape): string => {
  if (!intl || !val || Number.isNaN(val)) return null;

  const decimal = val || 0;
  const result = decimal.toString();
  let currency;
  let unitCurrency = "";

  if (result.length > 9) {
    unitCurrency = intl.formatMessage({
      id: "home-profile.price-current-unit-billion",
    });
    currency = decimal / 1000000000;
  } else if (result.length > 6) {
    unitCurrency = intl.formatMessage({
      id: "home-profile.price-current-unit-million",
    });
    currency = decimal / 1000000;
  } else if (result.length > 3) {
    unitCurrency = intl.formatMessage({
      id: "home-profile.price-current-unit-thousand",
    });
    currency = decimal / 1000;
  } else {
    currency = decimal;
  }
  return `${currency} ${unitCurrency} `;
};

// delete filetype image
export const getFileNameOnly = (val: string): string => {
  if (!val) return null;

  const filetypeImage = val.replace(/\..+$/, "");
  return filetypeImage;
};

export const getFileExtensionByUrl = (url: string): string => {
  if (!url) return url;

  const extension = url.substring(url.lastIndexOf(".") + 1);
  return extension;
};

export const convertDurationValue = (
  val: number
): { value?: number; unit?: string } => {
  if (!val) return null;

  let minutes = Math.round(val / 60);
  let hours: number;
  let days: number;

  if (minutes === 0 && val > 0) {
    minutes = 1;
  }

  if (minutes >= 60) {
    hours = Math.round(minutes / 60);
    minutes %= 60;
  }

  if (hours >= 24) {
    days = Math.round(hours / 24);
    hours %= 24;
  }

  let unit: string;
  if (days >= 0) {
    unit = days <= 1 ? "common.day" : "common.days";
    return { value: days, unit };
  }
  if (hours >= 0) {
    unit = hours <= 1 ? "common.hour" : "common.hours";
    return { value: hours, unit };
  }
  if (minutes >= 0) {
    unit = minutes <= 1 ? "common.minute" : "common.minutes";
    return { value: minutes, unit };
  }

  return {};
};

// clear image url and link url in  description
export const formatStringDescription = (description: string): string => {
  if (!description) return null;
  return description
    .replace(REGEX_IMAGE_MARKDOWN, "")
    .replace(REGEX_LINK_MARKDOWN, "");
};

export const formatDate = (date: Date, type = DEFAULT_FORMAT_DATE): string => {
  return moment(new Date(date)).format(type);
};

export const removeUndefined = <T>(obj: T): T => {
  const convertObj = {} as T;
  Object.keys(obj).forEach((k) => {
    if (obj[k] !== undefined) {
      convertObj[k] = obj[k];
    }
  });
  return convertObj;
};

export const removeHash = (value: string): string => value.replace(/#/g, "");
