import {
    ProjectActionTypes,
    LOAD_PROJECTS_FAILURE,
    LOAD_PROJECTS_REQUEST,
    LOAD_PROJECTS_SUCCESS,
    DELETE_PROEJCT_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    ProjectState
} from './projectTypes';
import { Project } from '../Project';


export const initialProjectState: ProjectState = {
    projects: [],
    loading: false,
    error: undefined,
    page: 1
};

export function projectReducer(
    state = initialProjectState,
    action: ProjectActionTypes
) {
    switch(action.type) {
        case LOAD_PROJECTS_REQUEST:
            return { ...state, loading: true, error: '' };
        case LOAD_PROJECTS_SUCCESS:
            let projects: Project[];
            projects = [...state.projects, ...action.payload.projects];
            return {
                ...state,
                loading: false, 
                page: action.payload.page,
                projects,
                error: ''
            };
        case LOAD_PROJECTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            };
        case SAVE_PROJECT_REQUEST:
            return { ...state };
        case SAVE_PROJECT_SUCCESS:
            if (action.payload.isNew) {
                return {
                    ...state,
                    projects: [...state.projects, action.payload]
                };
            }
            return {
                ...state,
                projects: state.projects.map((project: Project) => {
                    return project.id === action.payload.id 
                        ? Object.assign({}, project, action.payload)
                        : project;
                })
            };
        case SAVE_PROJECT_FAILURE:
            return { ...state, error: action.payload.message };
        case DELETE_PROJECT_REQUEST:
            return { ...state };
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                projects: state.projects.filter((project: Project) => {
                    return project.id !== action.payload.id
                }),
            }
        case DELETE_PROEJCT_FAILURE:
            return { ...state, error: action.payload.message };
        default:
            return state;
    }
}