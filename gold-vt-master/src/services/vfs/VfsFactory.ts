/* eslint-disable */
export interface IFile {
  extension: string,
  shortpath: string,
  width: number,
  height: number,
  id: number,
  relpath: string,
  size: number,
  type: string,
  sizeH: Array<string>,
  name: string,
  path: string,
  date: string,
  params: IFileParams
}

export interface IFileParams {
  width: number,
  height: number
}

export interface IFolder {
  id: number,
  name: string,
  parentId: number,
  folders: Array<IFolder>
}

export interface IHelpUploadItem {
  params: Array<string>,
  url: string
}

export interface IUrlByHashListResponse {
  hash: string,
  webPath: string
}

export interface IVfsCountFilesParams {
  folderId: number,
  query?: string
}

export interface IVfsCreateFolderParams {
  rootFolderId: number,
  name: string
}

export interface IVfsDeleteFilesParams {
  fileIds: Array<number>
}

export interface IVfsDeleteFolderParams {
  folderId: number
}

export interface IVfsGetFilesParams {
  folderId: number,
  query?: string,
  sortField?: string,
  isDescending?: boolean,
  page?: number,
  pageSize?: number
}

export interface IVfsGetFolderBranchParams {
  folderId: number
}

export interface IVfsGetFolderParams {
  rootFolderId?: number
}

export interface IVfsManageFavoritesParams {
  folderId: number,
  isInFavorites: boolean
}

export interface IVfsMoveFilesParams {
  fileIds: Array<number>,
  destinationFolderId: number
}

export interface IVfsMoveFolderParams {
  folderId: number,
  destinationFolderId: number
}

export interface IVfsRenameFolderParams {
  folderId: number,
  name: string
}

export interface IVfsSearchFolderByFileIdParams {
  fileId: number
}

export interface IVfsSearchFolderByFileParams {
  filename: string
}

export interface IVfsSetFilePhysicalNameParams {
  fileId: number,
  name: string
}

export interface IVfsUrlByHashListParams {
  hashList: Array<string>,
  namespace: string,
  mediaType: string
}

export interface IVfsUrlByHashParams {
  hash: string,
  namespace: string,
  mediaType: string
}

export const factory = (send: any) => ({
  vfs: {
    countFiles(params: IVfsCountFilesParams): Promise<number> {
      return send('vfs.CountFiles', params)
    },
    createFolder(params: IVfsCreateFolderParams): Promise<boolean> {
      return send('vfs.CreateFolder', params)
    },
    deleteFiles(params: IVfsDeleteFilesParams): Promise<boolean> {
      return send('vfs.DeleteFiles', params)
    },
    deleteFolder(params: IVfsDeleteFolderParams): Promise<boolean> {
      return send('vfs.DeleteFolder', params)
    },
    getFavorites(): Promise<Array<IFolder>> {
      return send('vfs.GetFavorites')
    },
    getFiles(params: IVfsGetFilesParams): Promise<Array<IFile>> {
      return send('vfs.GetFiles', params)
    },
    getFolder(params: IVfsGetFolderParams): Promise<object> {
      return send('vfs.GetFolder', params)
    },
    getFolderBranch(params: IVfsGetFolderBranchParams): Promise<Array<IFolder>> {
      return send('vfs.GetFolderBranch', params)
    },
    helpUpload(): Promise<object> {
      return send('vfs.HelpUpload')
    },
    manageFavorites(params: IVfsManageFavoritesParams): Promise<boolean> {
      return send('vfs.ManageFavorites', params)
    },
    moveFiles(params: IVfsMoveFilesParams): Promise<boolean> {
      return send('vfs.MoveFiles', params)
    },
    moveFolder(params: IVfsMoveFolderParams): Promise<boolean> {
      return send('vfs.MoveFolder', params)
    },
    renameFolder(params: IVfsRenameFolderParams): Promise<boolean> {
      return send('vfs.RenameFolder', params)
    },
    searchFolderByFile(params: IVfsSearchFolderByFileParams): Promise<object> {
      return send('vfs.SearchFolderByFile', params)
    },
    searchFolderByFileId(params: IVfsSearchFolderByFileIdParams): Promise<object> {
      return send('vfs.SearchFolderByFileId', params)
    },
    setFilePhysicalName(params: IVfsSetFilePhysicalNameParams): Promise<boolean> {
      return send('vfs.SetFilePhysicalName', params)
    },
    urlByHash(params: IVfsUrlByHashParams): Promise<string> {
      return send('vfs.UrlByHash', params)
    },
    urlByHashList(params: IVfsUrlByHashListParams): Promise<Array<IUrlByHashListResponse>> {
      return send('vfs.UrlByHashList', params)
    }
  }
})