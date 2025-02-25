
interface OwnerInfo {
    name?: string;
    title?: string;
    organization?: string;
}

interface Contact {
    type: string;
    data: string;
}

export interface Media {
    type: string;
    name?: string;
    data: string;
}

interface LegacyJsonInput {
    asset?: string;
    description?: string;
    image?: string;
    website?: string;
    pgpsig?: string;
    name?: string;
    owner?: OwnerInfo;
    contacts?: Contact[];
    categories?: Contact[];
    social?: Contact[];
    images?: Media[];
    audio?: Media[];
    video?: Media[];
    files?: Media[];
    dns?: Media[];
    html?: string;
    [key: string]: unknown;
}

export interface Cip25JsonOutput extends Omit<LegacyJsonInput, 'owner' | 'contacts' | 'categories' | 'social' | 'images' | 'audio' | 'video' | 'files' | 'dns'> {
    owner: OwnerInfo;
    contacts: Contact[];
    categories: Contact[];
    social: Contact[];
    images: Media[];
    audio: Media[];
    video: Media[];
    files: Media[];
    dns: Media[];
}