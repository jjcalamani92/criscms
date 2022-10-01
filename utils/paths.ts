import { Page, Product, Site } from "../interfaces";

export const getPathByProducts = (products: Product[]) =>
products.map((data) => ({asPath:`/dashboard/sites/${data.site}/product/${data.type}=${data._id}`, seo: data.data.seo}));
export const getPathByProduct = (products: Product[], asPath:string) =>
getPathByProducts(products).map((data) => data.asPath).find(data => data === asPath);


export const getPathBySites = (sites: Site[]) =>
sites.map((data) => ({asPath:`/dashboard/sites/${data._id}`, seo: data.data.seo}));
export const getPathBySite = (sites: Site[], asPath:string) =>
getPathBySites(sites).map((data) => data.asPath).find(data => data === asPath);

export const getPathByPages0 = (pages0: Page[]) =>
pages0.map((data) => ({asPath:`/dashboard/sites/${data.site}/page0=${data._id}`, seo: data.data.seo}));
export const getPathByPage0 = (pages0: Page[], asPath:string) =>
getPathByPages0(pages0).map((data) => data.asPath).find(data => data === asPath);

export const getPathByPages1 = (pages1: Page[]) =>
pages1.map((data) => ({asPath:`/dashboard/sites/${data.site}/page1=${data._id}`, seo: data.data.seo}));
export const getPathByPage1 = (pages1: Page[], asPath:string) =>
getPathByPages1(pages1).map((data) => data.asPath).find(data => data === asPath);

export const getPathByPages2 = (pages1: Page[]) =>
pages1.map((data) => ({asPath:`/dashboard/sites/${data.site}/page2=${data._id}`, seo: data.data.seo}));
export const getPathByPage2 = (pages1: Page[], asPath:string) =>
getPathByPages2(pages1).map((data) => data.asPath).find(data => data === asPath);
