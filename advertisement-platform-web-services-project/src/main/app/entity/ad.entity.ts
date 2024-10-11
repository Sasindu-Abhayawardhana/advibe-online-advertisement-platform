export class AdEntity {

    constructor(public id: number,
                public title: string,
                public description: string,
                public postedDate: string,
                public userEmail: string) {
    }
}
// Entity classes help to transfer data between service layer and repository layer
// These entity classes are identical to the database relations