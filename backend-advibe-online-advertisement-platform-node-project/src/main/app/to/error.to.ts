
// Error Transfer Object Class
export class ErrorTo {
    type: string = "about:blank";

    constructor(public status: number, // error code
                public title: string, // error
                public detail: string, // error details
                public instance: string, // store the req path
                public errors: any)  // errors attached

    {
    }

}