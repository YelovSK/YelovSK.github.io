export interface SpecGroup {
    title: string;
    items: SpecItem[];
}

export interface SpecItem {
    name: string;
    description: string;
    image?: string;
    isObsolete?: boolean;
}

export interface ProcessedSpecGroup extends SpecGroup {
    activeItems: SpecItem[];
    obsoleteItems: SpecItem[];
}