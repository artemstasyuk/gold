export interface IVfsHashImage {
    hash: string | null,
    webPath: string | null
}

export class VfsHashImage implements IVfsHashImage {
    static entityName = 'vfshashimage';

    hash: string | null = null;
    webPath: string | null = null;
}
