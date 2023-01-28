import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { projectAPI } from "../projectAPI";
import { Project } from "../Project";
import {
    LOAD_PROJECTS_REQUEST,
    LOAD_PROJECTS_FAILURE,
    LOAD_PROJECTS_SUCCESS,
    SAVE_PROJECT_FAILURE,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    ProjectState,
    LOAD_PROJECT_REQUEST,
    LOAD_PROJECT_SUCCESS,
    LOAD_PROJECT_FAILURE
} from './projectTypes';


// action creators
export function loadProjects(
    page: number
): ThunkAction<void, ProjectState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({ type: LOAD_PROJECTS_REQUEST });
        return projectAPI
            .get(page)
            .then((data) => {
                dispatch({
                    type: LOAD_PROJECTS_SUCCESS,
                    payload: { projects: data, page },
                });
            })
            .catch((error) => {
                dispatch({
                    type: LOAD_PROJECTS_FAILURE,
                    payload: error
                });
            });
    };
}

export function loadProject(
    id: number
): ThunkAction<void, ProjectState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({ type: LOAD_PROJECT_REQUEST });
        return projectAPI
            .find(id)
            .then((data) => {
                dispatch({
                    type: LOAD_PROJECT_SUCCESS,
                    payload: { project: data },
                });
            })
            .catch((error) => {
                dispatch({
                    type: LOAD_PROJECT_FAILURE,
                    payload: error
                });
            });
    };
}

export function saveProject(
    project: Project
): ThunkAction<void, ProjectState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({ type: SAVE_PROJECT_REQUEST });
        return projectAPI
            .put(project)
            .then((data) => {
                dispatch({
                    type: SAVE_PROJECT_SUCCESS,
                    payload: data
                });
            })
            .catch((error) => {
                dispatch({ type: SAVE_PROJECT_FAILURE, payload: error });
            });
    };
};
