import {urlencoded} from 'body-parser';

export const body = urlencoded({ extended: true });
export {default as notFound} from './not-found';
export {default as error} from './error';
