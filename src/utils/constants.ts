import moment from "moment";
import { Dimensions, PixelRatio } from "react-native";

export const WINDOW_WIDTH = Dimensions.get("screen").width;

export const WINDOW_HEIGHT = Dimensions.get("screen").height;

const scale = WINDOW_WIDTH / 375;

export const getScaledSize = (size: number): number => {
    let fontSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(fontSize));
};

export const formatDate = (date: Date) =>
    moment(date).format('MMM DD, YYYY');

export interface AppItem {
  id: string;
  name: string;
  iconType: 'svg' | 'image' | 'letter';
  iconPath?: string;
  iconLetter?: string;
  iconColor?: string;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
}

export const APPS: AppItem[] = [
  { id: '1', name: 'Netflix', iconType: 'svg', iconPath: 'Netflix' },
  { id: '2', name: 'Spotify', iconType: 'image', iconPath: 'spotify.png' },
  { id: '3', name: 'New York Times', iconType: 'image', iconPath: 'newYork.png' },
  { id: '4', name: 'Wall Street Journal', iconType: 'image', iconPath: 'wallStreet.png' },
  { id: '5', name: 'Hulu', iconType: 'image', iconPath: 'hulu.png' },
  { id: '6', name: 'Apple', iconType: 'image', iconPath: 'apple.png' },
  { id: '7', name: 'Amazon', iconType: 'image', iconPath: 'amazon.png' },
];

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Subscription', icon: 'refresh' },
  { id: '2', name: 'Utility', icon: 'utility' },
  { id: '3', name: 'Card Payment', icon: 'cardPayment' },
  { id: '4', name: 'Loan', icon: 'loan' },
  { id: '5', name: 'Rent', icon: 'rent' },
];

export interface FrequencyItem {
  id: string;
  name: string;
}

export const FREQUENCIES: FrequencyItem[] = [
  { id: '1', name: 'Weekly' },
  { id: '2', name: 'Monthly' },
  { id: '3', name: 'Annually' },
];

export interface RemindMeItem {
  id: string;
  name: string;
}

export const REMIND_ME: RemindMeItem[] = [
  { id: '1', name: '1 day before' },
  { id: '2', name: '2 days before' },
  { id: '3', name: '3 days before' },
];

export interface IconConfig {
  name: string;
  viewBox: string;
  path: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultColor: string;
  strokeWidth?: string;
  strokeLinecap?: 'round' | 'butt' | 'square';
  strokeLinejoin?: 'round' | 'miter' | 'bevel';
  fill?: boolean;
}

export const iconConfigs: IconConfig[] = [
  {
    name: 'backArrow',
    viewBox: '0 0 16 14',
    path: 'M0.915039 6.91501H14.915M0.915039 6.91501L6.91504 12.915M0.915039 6.91501L6.91504 0.915009',
    defaultWidth: 16,
    defaultHeight: 14,
    defaultColor: '#1C1E22',
    strokeWidth: '1.83',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: false,
  },
  {
    name: 'chevron',
    viewBox: '0 0 7 14',
    path: 'M3.4425 2.1225L5.82 4.5L6.8775 3.4425L3.4425 0L0 3.4425L1.065 4.5L3.4425 2.1225ZM3.4425 11.3775L1.065 9L0.00750017 10.0575L3.4425 13.5L6.885 10.0575L5.82 9L3.4425 11.3775Z',
    defaultWidth: 7,
    defaultHeight: 14,
    defaultColor: '#636A79',
    fill: true,
  },
  {
    name: 'search',
    viewBox: '0 0 17 17',
    path: 'M15.2167 16.5L9.44167 10.725C8.98333 11.0917 8.45625 11.3819 7.86042 11.5958C7.26458 11.8097 6.63056 11.9167 5.95833 11.9167C4.29306 11.9167 2.88368 11.3399 1.73021 10.1865C0.576736 9.03299 0 7.62361 0 5.95833C0 4.29306 0.576736 2.88368 1.73021 1.73021C2.88368 0.576736 4.29306 0 5.95833 0C7.62361 0 9.03299 0.576736 10.1865 1.73021C11.3399 2.88368 11.9167 4.29306 11.9167 5.95833C11.9167 6.63056 11.8097 7.26458 11.5958 7.86042C11.3819 8.45625 11.0917 8.98333 10.725 9.44167L16.5 15.2167L15.2167 16.5ZM5.95833 10.0833C7.10417 10.0833 8.07812 9.68229 8.88021 8.88021C9.68229 8.07812 10.0833 7.10417 10.0833 5.95833C10.0833 4.8125 9.68229 3.83854 8.88021 3.03646C8.07812 2.23438 7.10417 1.83333 5.95833 1.83333C4.8125 1.83333 3.83854 2.23438 3.03646 3.03646C2.23438 3.83854 1.83333 4.8125 1.83333 5.95833C1.83333 7.10417 2.23438 8.07812 3.03646 8.88021C3.83854 9.68229 4.8125 10.0833 5.95833 10.0833Z',
    defaultWidth: 17,
    defaultHeight: 17,
    defaultColor: '#667085',
    fill: true,
  },
  {
    name: 'dollar',
    viewBox: '0 0 10 17',
    path: 'M5.02333 7.24167C2.9425 6.70083 2.27333 6.14167 2.27333 5.27083C2.27333 4.27167 3.19917 3.575 4.74833 3.575C6.38 3.575 6.985 4.35417 7.04 5.5H9.06583C9.00167 3.92333 8.03917 2.475 6.12333 2.0075V0H3.37333V1.98C1.595 2.365 0.165 3.52 0.165 5.28917C0.165 7.40667 1.91583 8.46083 4.47333 9.075C6.765 9.625 7.22333 10.4317 7.22333 11.2842C7.22333 11.9167 6.77417 12.925 4.74833 12.925C2.86 12.925 2.1175 12.0817 2.01667 11H0C0.11 13.0075 1.61333 14.135 3.37333 14.5108V16.5H6.12333V14.5292C7.91083 14.19 9.33167 13.1542 9.33167 11.275C9.33167 8.67167 7.10417 7.7825 5.02333 7.24167Z',
    defaultWidth: 10,
    defaultHeight: 17,
    defaultColor: '#636A79',
    fill: true,
  },
  {
    name: 'checkmark',
    viewBox: '0 0 17 17',
    path: 'M8.33333 0C3.73333 0 0 3.73333 0 8.33333C0 12.9333 3.73333 16.6667 8.33333 16.6667C12.9333 16.6667 16.6667 12.9333 16.6667 8.33333C16.6667 3.73333 12.9333 0 8.33333 0ZM6.66667 12.5L2.5 8.33333L3.675 7.15833L6.66667 10.1417L12.9917 3.81667L14.1667 5L6.66667 12.5Z',
    defaultWidth: 17,
    defaultHeight: 17,
    defaultColor: '#002FFF',
    fill: true,
  },
  {
    name: 'refresh',
    viewBox: '0 0 14 19',
    path: 'M6.66667 4.16667V6.66667L10 3.33333L6.66667 0V2.5C2.98333 2.5 0 5.48333 0 9.16667C0 10.475 0.383333 11.6917 1.03333 12.7167L2.25 11.5C1.875 10.8083 1.66667 10.0083 1.66667 9.16667C1.66667 6.40833 3.90833 4.16667 6.66667 4.16667ZM12.3 5.61667L11.0833 6.83333C11.45 7.53333 11.6667 8.325 11.6667 9.16667C11.6667 11.925 9.425 14.1667 6.66667 14.1667V11.6667L3.33333 15L6.66667 18.3333V15.8333C10.35 15.8333 13.3333 12.85 13.3333 9.16667C13.3333 7.85833 12.95 6.64167 12.3 5.61667Z',
    defaultWidth: 14,
    defaultHeight: 19,
    defaultColor: '#1C1E22',
    fill: true,
  },
  {
    name: 'utility',
    viewBox: '0 0 19 19',
    path: 'M18.0097 14.9847L10.4431 7.41806C11.2181 5.46806 10.8181 3.16806 9.24306 1.58473C7.32639 -0.331941 4.34306 -0.506941 2.21806 1.04306L5.41806 4.25139L4.23472 5.42639L1.04306 2.23473C-0.506941 4.35139 -0.331941 7.34306 1.58473 9.25139C3.13473 10.8014 5.39306 11.2097 7.32639 10.4847L14.9181 18.0764C15.2431 18.4014 15.7681 18.4014 16.0931 18.0764L18.0097 16.1597C18.3431 15.8431 18.3431 15.3181 18.0097 14.9847ZM15.5097 16.3181L7.62639 8.43473C7.11806 8.80973 6.55139 9.03473 5.95972 9.11806C4.82639 9.28473 3.63473 8.94306 2.76806 8.07639C1.97639 7.29306 1.60973 6.24306 1.66806 5.20973L4.24306 7.78473L7.77639 4.25139L5.20139 1.67639C6.23472 1.61806 7.27639 1.98473 8.06806 2.76806C8.96806 3.66806 9.30973 4.90973 9.10139 6.06806C9.00139 6.65973 8.75139 7.20973 8.36806 7.70139L16.2431 15.5764L15.5097 16.3181Z',
    defaultWidth: 19,
    defaultHeight: 19,
    defaultColor: '#1C1E22',
    fill: true,
  },
  {
    name: 'cardPayment',
    viewBox: '0 0 17 14',
    path: 'M15 0H1.66667C0.741667 0 0.00833333 0.741667 0.00833333 1.66667L0 11.6667C0 12.5917 0.741667 13.3333 1.66667 13.3333H15C15.925 13.3333 16.6667 12.5917 16.6667 11.6667V1.66667C16.6667 0.741667 15.925 0 15 0ZM15 11.6667H1.66667V6.66667H15V11.6667ZM15 3.33333H1.66667V1.66667H15V3.33333Z',
    defaultWidth: 17,
    defaultHeight: 14,
    defaultColor: '#1C1E22',
    fill: true,
  },
  {
    name: 'loan',
    viewBox: '0 0 17 17',
    path: 'M8.33333 0C3.73333 0 0 3.73333 0 8.33333C0 12.9333 3.73333 16.6667 8.33333 16.6667C12.9333 16.6667 16.6667 12.9333 16.6667 8.33333C16.6667 3.73333 12.9333 0 8.33333 0ZM8.33333 15C4.65833 15 1.66667 12.0083 1.66667 8.33333C1.66667 4.65833 4.65833 1.66667 8.33333 1.66667C12.0083 1.66667 15 4.65833 15 8.33333C15 12.0083 12.0083 15 8.33333 15ZM8.59167 7.61667C7.11667 7.24167 6.64167 6.83333 6.64167 6.225C6.64167 5.525 7.3 5.03333 8.39167 5.03333C9.54167 5.03333 9.975 5.58333 10.0083 6.4H11.4333C11.3917 5.28333 10.7083 4.25833 9.35833 3.925V2.5H7.41667V3.90833C6.15833 4.175 5.15 4.99167 5.15 6.25C5.15 7.74167 6.39167 8.49167 8.2 8.925C9.825 9.30833 10.15 9.88333 10.15 10.4833C10.15 10.925 9.825 11.6417 8.4 11.6417C7.06667 11.6417 6.54167 11.0417 6.46667 10.275H5.03333C5.11667 11.6917 6.16667 12.4917 7.41667 12.75V14.1667H9.36667V12.775C10.6333 12.5333 11.6333 11.8083 11.6417 10.4667C11.6333 8.63333 10.0583 8 8.59167 7.61667Z',
    defaultWidth: 17,
    defaultHeight: 17,
    defaultColor: '#1C1E22',
    fill: true,
  },
  {
    name: 'rent',
    viewBox: '0 0 17 15',
    path: 'M8.33333 2.24167L12.5 5.99167V12.5H10.8333V7.5H5.83333V12.5H4.16667V5.99167L8.33333 2.24167ZM8.33333 0L0 7.5H2.5V14.1667H7.5V9.16667H9.16667V14.1667H14.1667V7.5H16.6667L8.33333 0Z',
    defaultWidth: 17,
    defaultHeight: 15,
    defaultColor: '#1C1E22',
    fill: true,
  },
];
  