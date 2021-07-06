export interface IStructure {
    locks: {
        uid: {
            name: string;
            notes: string;
            location: Geolocation;
            quality: number;
            safety: number;
            wouldYouLockHere: boolean;
        }
    }
}