import { Project } from './Project';
const baseURL = 'http://localhost:4000';
const url = `${baseURL}/projects`;

function translateStatusToErrorMessage(status: number) {
	switch (status) {
		case 401:
			return 'Please log in again';
		case 403:
			return 'You do not have permission to see the project(s)';
		default:
			return 'There was an error retrieving project(s). Please try again.';
	}
}

function checkStatus(response: any) {
	if (response.ok) {
		return response;
	} else {
		let httpErrorInfo = {
			status: response.error,
			statusText: response.statusText,
			url: response.url,
		};

		console.log(`log http error :: ${JSON.stringify(httpErrorInfo)}`);

		let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
		throw new Error(errorMessage);
	}
}

function parseJSON(response: Response) {
	return response.json();
}

function delay(ms: number) {
	return function (x: any): Promise<any> {
		return new Promise((resolve) => setTimeout(() => resolve(x), ms));
	};
}

function convertToProjectModels(data: any[]): Project[] {
	return data.map(convertToProjectModel);
}

function convertToProjectModel(item: any): Project {
	return new Project(item);
}

const projectAPI = {
	get(page = 1, limit = 20) {
		return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
			.then(delay(600))
			.then(checkStatus)
			.then(parseJSON)
			.then(convertToProjectModels)
			.catch((error: TypeError) => {
				console.log('log client error ' + error);
				throw new Error('There was an error retrieving the projects. Please try again.');
			});
	},
	put(project: Project) {
		return fetch(`${url}/${project.id}`, {
			method: 'PUT',
			body: JSON.stringify(project),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(checkStatus)
			.then(parseJSON)
			.catch((error: TypeError) => {
				console.log(`log client error :: ${error}`);
				throw new Error('There was an error updating the project. Please try again.');
			});
	},
};

export { projectAPI };
