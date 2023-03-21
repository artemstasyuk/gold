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

export interface ICategory {
  id: number,
  title: string,
  orderNumber: number,
  statusId: number,
  status?: IStatus
}

export interface ICategoryAddParams {
  category: ICategory
}

export interface ICategoryCountParams {
  search?: ICategorySearch
}

export interface ICategoryDeleteParams {
  id: number
}

export interface ICategoryGetByIDParams {
  id: number
}

export interface ICategoryGetParams {
  search?: ICategorySearch,
  viewOps?: IViewOps
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

export interface ICategoryUpdateParams {
  category: ICategory
}

export interface ICategoryValidateParams {
  category: ICategory
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

export interface ITagAddParams {
  tag: ITag
}

export interface ITagCountParams {
  search?: ITagSearch
}

export interface ITagDeleteParams {
  id: number
}

export interface ITagGetByIDParams {
  id: number
}

export interface ITagGetParams {
  search?: ITagSearch,
  viewOps?: IViewOps
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

export interface ITagUpdateParams {
  tag: ITag
}

export interface ITagValidateParams {
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

export class Category implements ICategory {
  static entityName = "category";

  id: number = 0;
  title: string = null;
  orderNumber: number = 0;
  statusId: number = 0;
  status?: IStatus = null;
}

export class CategoryAddParams implements ICategoryAddParams {
  static entityName = "categoryaddparams";

  category: ICategory = null;
}

export class CategoryCountParams implements ICategoryCountParams {
  static entityName = "categorycountparams";

  search?: ICategorySearch = null;
}

export class CategoryDeleteParams implements ICategoryDeleteParams {
  static entityName = "categorydeleteparams";

  id: number = 0;
}

export class CategoryGetByIDParams implements ICategoryGetByIDParams {
  static entityName = "categorygetbyidparams";

  id: number = 0;
}

export class CategoryGetParams implements ICategoryGetParams {
  static entityName = "categorygetparams";

  search?: ICategorySearch = null;
  viewOps?: IViewOps = null;
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

export class CategoryUpdateParams implements ICategoryUpdateParams {
  static entityName = "categoryupdateparams";

  category: ICategory = null;
}

export class CategoryValidateParams implements ICategoryValidateParams {
  static entityName = "categoryvalidateparams";

  category: ICategory = null;
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

export class TagAddParams implements ITagAddParams {
  static entityName = "tagaddparams";

  tag: ITag = null;
}

export class TagCountParams implements ITagCountParams {
  static entityName = "tagcountparams";

  search?: ITagSearch = null;
}

export class TagDeleteParams implements ITagDeleteParams {
  static entityName = "tagdeleteparams";

  id: number = 0;
}

export class TagGetByIDParams implements ITagGetByIDParams {
  static entityName = "taggetbyidparams";

  id: number = 0;
}

export class TagGetParams implements ITagGetParams {
  static entityName = "taggetparams";

  search?: ITagSearch = null;
  viewOps?: IViewOps = null;
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

export class TagUpdateParams implements ITagUpdateParams {
  static entityName = "tagupdateparams";

  tag: ITag = null;
}

export class TagValidateParams implements ITagValidateParams {
  static entityName = "tagvalidateparams";

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
  category: {
    add(params: ICategoryAddParams): Promise<ICategory> {
      return send('category.Add', params)
    },
    count(params: ICategoryCountParams): Promise<number> {
      return send('category.Count', params)
    },
    delete(params: ICategoryDeleteParams): Promise<boolean> {
      return send('category.Delete', params)
    },
    get(params: ICategoryGetParams): Promise<Array<ICategorySummary>> {
      return send('category.Get', params)
    },
    getByID(params: ICategoryGetByIDParams): Promise<ICategory> {
      return send('category.GetByID', params)
    },
    update(params: ICategoryUpdateParams): Promise<boolean> {
      return send('category.Update', params)
    },
    validate(params: ICategoryValidateParams): Promise<Array<IFieldError>> {
      return send('category.Validate', params)
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
  tag: {
    add(params: ITagAddParams): Promise<ITag> {
      return send('tag.Add', params)
    },
    count(params: ITagCountParams): Promise<number> {
      return send('tag.Count', params)
    },
    delete(params: ITagDeleteParams): Promise<boolean> {
      return send('tag.Delete', params)
    },
    get(params: ITagGetParams): Promise<Array<ITagSummary>> {
      return send('tag.Get', params)
    },
    getByID(params: ITagGetByIDParams): Promise<ITag> {
      return send('tag.GetByID', params)
    },
    update(params: ITagUpdateParams): Promise<boolean> {
      return send('tag.Update', params)
    },
    validate(params: ITagValidateParams): Promise<Array<IFieldError>> {
      return send('tag.Validate', params)
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
