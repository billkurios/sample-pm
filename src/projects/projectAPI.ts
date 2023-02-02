import { Project } from './Project';

const baseUrl = 'http://localhost:4000';
export const url = `${baseUrl}/projects`;


const translateStatusToErrorMessage = (status: number) => {
    switch (status) {
        case 401:
            return "Please login again.";
        case 403:
            return "You do not have permission to view the project(s).";
        default:
            return "There was an error retrieving the project(s). Please try again.";
    }
};

const checkStatus = (response: any) => {
    let responseStatus = response.status;
    if (responseStatus >= 200 && responseStatus <= 226) {
        return response;
    }

    const httpErrorInfo = {
        status: responseStatus,
        statusText: response.statusText,
        url: response.url,
    };
    console.error(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
};

const parseJSON = (response: Response) => {
    return response.json();
};

// eslint-disable-next-line
const delay = (ms: number) => {
    return function (x: any): Promise<any> {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms))
    };
};

const convertToProjectModels = (data: any[]): Project[] => {
    let projects: Project[] = data.map(convertToProjectModel);
    return projects;
}

const convertToProjectModel = (item: any): Project => {
    return new Project(item);
}

const projectAPI = {
    get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            // .then(delay(5000))
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToProjectModels)
            .catch((error: TypeError) => {
                throw new Error('There was an error retrieving the projects. Please try again.');
            });
    },
    put(project: Project) {
        return fetch(`${url}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            console.log('log client error' + error);
            throw new Error(
                'There was an error updating the project. Please Try again..'
            );
        });
    },
    find(id: number) {
        return fetch(`${url}/${id}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToProjectModel);
    },
};

export { projectAPI };
