/* Code generated from jsonrpc schema by rpcgen v2.4.1; DO NOT EDIT. */
/* eslint-disable */
export interface IAuthChangePasswordParams {
  password: string
}

export interface IAuthLoginParams {
  login: string,
  password: string,
  remember: boolean
}

export interface ICategoriesAddParams {
  category: ICategory
}

export interface ICategoriesCountParams {
  search?: ICategorySearch
}

export interface ICategoriesDeleteParams {
  id: number
}

export interface ICategoriesGetByIDParams {
  id: number
}

export interface ICategoriesGetParams {
  search?: ICategorySearch,
  viewOps?: IViewOps
}

export interface ICategoriesUpdateParams {
  category: ICategory
}

export interface ICategoriesValidateParams {
  category: ICategory
}

export interface ICategory {
  id: number,
  title: string,
  orderNumber: number,
  statusId: number,
  status?: IStatus
}

export interface ICategorySearch {
  id?: number,
  title?: string,
  orderNumber?: number,
  statusId?: number,
  ids: Array<number>
}

export interface ICategorySummary {
  id: number,
  title: string,
  orderNumber: number,
  status?: IStatus
}

export interface IFieldError {
  field: string,
  error: string,
  constraint?: IFieldErrorConstraint // Help with generating an error message.
}

export interface IFieldErrorConstraint {
  max: number, // Max value for field.
  min: number // Min value for field.
}

export interface INews {
  id: number,
  title: string,
  alias: string,
  content?: string,
  categoryId: number,
  createdAt: string,
  updatedAt?: string,
  publicationDate: string,
  tagIds: Array<number>,
  statusId: number,
  category?: ICategorySummary,
  status?: IStatus
}

export interface INewsAddParams {
  news: INews
}

export interface INewsCountParams {
  search?: INewsSearch
}

export interface INewsDeleteParams {
  id: number
}

export interface INewsGetByIDParams {
  id: number
}

export interface INewsGetParams {
  search?: INewsSearch,
  viewOps?: IViewOps
}

export interface INewsSearch {
  id?: number,
  title?: string,
  alias?: string,
  content?: string,
  categoryId?: number,
  createdAt?: string,
  updatedAt?: string,
  publicationDate?: string,
  statusId?: number,
  ids: Array<number>,
  notId?: number
}

export interface INewsSummary {
  id: number,
  title: string,
  alias: string,
  content?: string,
  categoryId: number,
  createdAt: string,
  updatedAt?: string,
  publicationDate: string,
  category?: ICategorySummary,
  status?: IStatus
}

export interface INewsUpdateParams {
  news: INews
}

export interface INewsValidateParams {
  news: INews
}

export interface IStatus {
  id: number,
  alias: string,
  title: string
}

export interface ITag {
  id: number,
  title: string,
  statusId: number,
  status?: IStatus
}

export interface ITagSearch {
  id?: number,
  title?: string,
  statusId?: number,
  ids: Array<number>
}

export interface ITagSummary {
  id: number,
  title: string,
  status?: IStatus
}

export interface ITagsAddParams {
  tag: ITag
}

export interface ITagsCountParams {
  search?: ITagSearch
}

export interface ITagsDeleteParams {
  id: number
}

export interface ITagsGetByIDParams {
  id: number
}

export interface ITagsGetParams {
  search?: ITagSearch,
  viewOps?: IViewOps
}

export interface ITagsUpdateParams {
  tag: ITag
}

export interface ITagsValidateParams {
  tag: ITag
}

export interface IUser {
  id: number,
  createdAt: string,
  login: string,
  password: string,
  lastActivityAt?: string,
  statusId: number,
  status?: IStatus
}

export interface IUserAddParams {
  user: IUser
}

export interface IUserCountParams {
  search?: IUserSearch
}

export interface IUserDeleteParams {
  id: number
}

export interface IUserGetByIDParams {
  id: number
}

export interface IUserGetParams {
  search?: IUserSearch,
  viewOps?: IViewOps
}

export interface IUserProfile {
  id: number,
  createdAt: string,
  login: string,
  lastActivityAt?: string,
  statusId: number
}

export interface IUserSearch {
  id?: number,
  login?: string,
  statusId?: number,
  lastActivityAtFrom?: string,
  lastActivityAtTo?: string,
  ids: Array<number>,
  notId?: number
}

export interface IUserSummary {
  id: number,
  createdAt: string,
  login: string,
  lastActivityAt?: string,
  status?: IStatus
}

export interface IUserUpdateParams {
  user: IUser
}

export interface IUserValidateParams {
  user: IUser
}

export interface IViewOps {
  page: number, // page number, default - 1
  pageSize: number, // items count per page, max - 500
  sortColumn: string, // sort by column name
  sortDesc: boolean // descending sort
}

export class AuthChangePasswordParams implements IAuthChangePasswordParams {
  static entityName = "authchangepasswordparams";

  password: string = null;
}

export class AuthLoginParams implements IAuthLoginParams {
  static entityName = "authloginparams";

  login: string = null;
  password: string = null;
  remember: boolean = false;
}

export class CategoriesAddParams implements ICategoriesAddParams {
  static entityName = "categoriesaddparams";

  category: ICategory = null;
}

export class CategoriesCountParams implements ICategoriesCountParams {
  static entityName = "categoriescountparams";

  search?: ICategorySearch = null;
}

export class CategoriesDeleteParams implements ICategoriesDeleteParams {
  static entityName = "categoriesdeleteparams";

  id: number = 0;
}

export class CategoriesGetByIDParams implements ICategoriesGetByIDParams {
  static entityName = "categoriesgetbyidparams";

  id: number = 0;
}

export class CategoriesGetParams implements ICategoriesGetParams {
  static entityName = "categoriesgetparams";

  search?: ICategorySearch = null;
  viewOps?: IViewOps = null;
}

export class CategoriesUpdateParams implements ICategoriesUpdateParams {
  static entityName = "categoriesupdateparams";

  category: ICategory = null;
}

export class CategoriesValidateParams implements ICategoriesValidateParams {
  static entityName = "categoriesvalidateparams";

  category: ICategory = null;
}

export class Category implements ICategory {
  static entityName = "category";

  id: number = 0;
  title: string = null;
  orderNumber: number = 0;
  statusId: number = 0;
  status?: IStatus = null;
}

export class CategorySearch implements ICategorySearch {
  static entityName = "categorysearch";

  id?: number = 0;
  title?: string = "";
  orderNumber?: number = 0;
  statusId?: number = 0;
  ids: Array<number> = [0];
}

export class CategorySummary implements ICategorySummary {
  static entityName = "category";

  id: number = 0;
  title: string = null;
  orderNumber: number = 0;
  status?: IStatus = null;
}

export class FieldError implements IFieldError {
  static entityName = "fielderror";

  field: string = null;
  error: string = null;
  constraint?: IFieldErrorConstraint = null;
}

export class FieldErrorConstraint implements IFieldErrorConstraint {
  static entityName = "fielderrorconstraint";

  max: number = 0;
  min: number = 0;
}

export class News implements INews {
  static entityName = "news";

  id: number = 0;
  title: string = null;
  alias: string = null;
  content?: string = null;
  categoryId: number = 0;
  createdAt: string = null;
  updatedAt?: string = null;
  publicationDate: string = null;
  tagIds: Array<number> = null;
  statusId: number = 0;
  category?: ICategorySummary = null;
  status?: IStatus = null;
}

export class NewsAddParams implements INewsAddParams {
  static entityName = "newsaddparams";

  news: INews = null;
}

export class NewsCountParams implements INewsCountParams {
  static entityName = "newscountparams";

  search?: INewsSearch = null;
}

export class NewsDeleteParams implements INewsDeleteParams {
  static entityName = "newsdeleteparams";

  id: number = 0;
}

export class NewsGetByIDParams implements INewsGetByIDParams {
  static entityName = "newsgetbyidparams";

  id: number = 0;
}

export class NewsGetParams implements INewsGetParams {
  static entityName = "newsgetparams";

  search?: INewsSearch = null;
  viewOps?: IViewOps = null;
}

export class NewsSearch implements INewsSearch {
  static entityName = "newssearch";

  id?: number = 0;
  title?: string = "";
  alias?: string = "";
  content?: string = "";
  categoryId?: number = 0;
  createdAt?: string = "";
  updatedAt?: string = "";
  publicationDate?: string = "";
  statusId?: number = 0;
  ids: Array<number> = [0];
  notId?: number = 0;
}

export class NewsSummary implements INewsSummary {
  static entityName = "news";

  id: number = 0;
  title: string = null;
  alias: string = null;
  content?: string = null;
  categoryId: number = 0;
  createdAt: string = null;
  updatedAt?: string = null;
  publicationDate: string = null;
  category?: ICategorySummary = null;
  status?: IStatus = null;
}

export class NewsUpdateParams implements INewsUpdateParams {
  static entityName = "newsupdateparams";

  news: INews = null;
}

export class NewsValidateParams implements INewsValidateParams {
  static entityName = "newsvalidateparams";

  news: INews = null;
}

export class Status implements IStatus {
  static entityName = "status";

  id: number = 0;
  alias: string = null;
  title: string = null;
}

export class Tag implements ITag {
  static entityName = "tag";

  id: number = 0;
  title: string = null;
  statusId: number = 0;
  status?: IStatus = null;
}

export class TagSearch implements ITagSearch {
  static entityName = "tagsearch";

  id?: number = 0;
  title?: string = "";
  statusId?: number = 0;
  ids: Array<number> = [0];
}

export class TagSummary implements ITagSummary {
  static entityName = "tag";

  id: number = 0;
  title: string = null;
  status?: IStatus = null;
}

export class TagsAddParams implements ITagsAddParams {
  static entityName = "tagsaddparams";

  tag: ITag = null;
}

export class TagsCountParams implements ITagsCountParams {
  static entityName = "tagscountparams";

  search?: ITagSearch = null;
}

export class TagsDeleteParams implements ITagsDeleteParams {
  static entityName = "tagsdeleteparams";

  id: number = 0;
}

export class TagsGetByIDParams implements ITagsGetByIDParams {
  static entityName = "tagsgetbyidparams";

  id: number = 0;
}

export class TagsGetParams implements ITagsGetParams {
  static entityName = "tagsgetparams";

  search?: ITagSearch = null;
  viewOps?: IViewOps = null;
}

export class TagsUpdateParams implements ITagsUpdateParams {
  static entityName = "tagsupdateparams";

  tag: ITag = null;
}

export class TagsValidateParams implements ITagsValidateParams {
  static entityName = "tagsvalidateparams";

  tag: ITag = null;
}

export class User implements IUser {
  static entityName = "user";

  id: number = 0;
  createdAt: string = null;
  login: string = null;
  password: string = null;
  lastActivityAt?: string = null;
  statusId: number = 0;
  status?: IStatus = null;
}

export class UserAddParams implements IUserAddParams {
  static entityName = "useraddparams";

  user: IUser = null;
}

export class UserCountParams implements IUserCountParams {
  static entityName = "usercountparams";

  search?: IUserSearch = null;
}

export class UserDeleteParams implements IUserDeleteParams {
  static entityName = "userdeleteparams";

  id: number = 0;
}

export class UserGetByIDParams implements IUserGetByIDParams {
  static entityName = "usergetbyidparams";

  id: number = 0;
}

export class UserGetParams implements IUserGetParams {
  static entityName = "usergetparams";

  search?: IUserSearch = null;
  viewOps?: IViewOps = null;
}

export class UserProfile implements IUserProfile {
  static entityName = "userprofile";

  id: number = 0;
  createdAt: string = null;
  login: string = null;
  lastActivityAt?: string = null;
  statusId: number = 0;
}

export class UserSearch implements IUserSearch {
  static entityName = "usersearch";

  id?: number = 0;
  login?: string = "";
  statusId?: number = 0;
  lastActivityAtFrom?: string = "";
  lastActivityAtTo?: string = "";
  ids: Array<number> = [0];
  notId?: number = 0;
}

export class UserSummary implements IUserSummary {
  static entityName = "user";

  id: number = 0;
  createdAt: string = null;
  login: string = null;
  lastActivityAt?: string = null;
  status?: IStatus = null;
}

export class UserUpdateParams implements IUserUpdateParams {
  static entityName = "userupdateparams";

  user: IUser = null;
}

export class UserValidateParams implements IUserValidateParams {
  static entityName = "uservalidateparams";

  user: IUser = null;
}

export class ViewOps implements IViewOps {
  static entityName = "viewops";

  page: number = 1;
  pageSize: number = 25;
  sortColumn: string = "";
  sortDesc: boolean = false;
}

export const factory = (send: any) => ({
  auth: {
    changePassword(params: IAuthChangePasswordParams): Promise<string> {
      return send('auth.ChangePassword', params)
    },
    login(params: IAuthLoginParams): Promise<string> {
      return send('auth.Login', params)
    },
    logout(): Promise<boolean> {
      return send('auth.Logout')
    },
    profile(): Promise<IUserProfile> {
      return send('auth.Profile')
    },
    vfsAuthToken(): Promise<string> {
      return send('auth.VfsAuthToken')
    }
  },
  categories: {
    add(params: ICategoriesAddParams): Promise<ICategory> {
      return send('categories.Add', params)
    },
    count(params: ICategoriesCountParams): Promise<number> {
      return send('categories.Count', params)
    },
    delete(params: ICategoriesDeleteParams): Promise<boolean> {
      return send('categories.Delete', params)
    },
    get(params: ICategoriesGetParams): Promise<Array<ICategorySummary>> {
      return send('categories.Get', params)
    },
    getByID(params: ICategoriesGetByIDParams): Promise<ICategory> {
      return send('categories.GetByID', params)
    },
    update(params: ICategoriesUpdateParams): Promise<boolean> {
      return send('categories.Update', params)
    },
    validate(params: ICategoriesValidateParams): Promise<Array<IFieldError>> {
      return send('categories.Validate', params)
    }
  },
  news: {
    add(params: INewsAddParams): Promise<INews> {
      return send('news.Add', params)
    },
    count(params: INewsCountParams): Promise<number> {
      return send('news.Count', params)
    },
    delete(params: INewsDeleteParams): Promise<boolean> {
      return send('news.Delete', params)
    },
    get(params: INewsGetParams): Promise<Array<INewsSummary>> {
      return send('news.Get', params)
    },
    getByID(params: INewsGetByIDParams): Promise<INews> {
      return send('news.GetByID', params)
    },
    update(params: INewsUpdateParams): Promise<boolean> {
      return send('news.Update', params)
    },
    validate(params: INewsValidateParams): Promise<Array<IFieldError>> {
      return send('news.Validate', params)
    }
  },
  tags: {
    add(params: ITagsAddParams): Promise<ITag> {
      return send('tags.Add', params)
    },
    count(params: ITagsCountParams): Promise<number> {
      return send('tags.Count', params)
    },
    delete(params: ITagsDeleteParams): Promise<boolean> {
      return send('tags.Delete', params)
    },
    get(params: ITagsGetParams): Promise<Array<ITagSummary>> {
      return send('tags.Get', params)
    },
    getByID(params: ITagsGetByIDParams): Promise<ITag> {
      return send('tags.GetByID', params)
    },
    update(params: ITagsUpdateParams): Promise<boolean> {
      return send('tags.Update', params)
    },
    validate(params: ITagsValidateParams): Promise<Array<IFieldError>> {
      return send('tags.Validate', params)
    }
  },
  user: {
    add(params: IUserAddParams): Promise<IUser> {
      return send('user.Add', params)
    },
    count(params: IUserCountParams): Promise<number> {
      return send('user.Count', params)
    },
    delete(params: IUserDeleteParams): Promise<boolean> {
      return send('user.Delete', params)
    },
    get(params: IUserGetParams): Promise<Array<IUserSummary>> {
      return send('user.Get', params)
    },
    getByID(params: IUserGetByIDParams): Promise<IUser> {
      return send('user.GetByID', params)
    },
    update(params: IUserUpdateParams): Promise<boolean> {
      return send('user.Update', params)
    },
    validate(params: IUserValidateParams): Promise<Array<IFieldError>> {
      return send('user.Validate', params)
    }
  }
})
