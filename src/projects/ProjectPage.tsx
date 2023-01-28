import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import ProjectDetail from './ProjectDetail';
import { AppState } from '../state';
import { ProjectState } from './state/projectTypes';
import { loadProject } from './state/projectActions';


function ProjectPage(props: any) {
  const params = useParams();
  const id = Number(params.id);

  const loading = useSelector(
    (appState: AppState) => appState.projectState.loading
  );
  const error = useSelector(
    (appState: AppState) => appState.projectState.error
  );
  const project = useSelector(
    (appState: AppState) => appState.projectState.currentProject
  );

  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

  useEffect(() => {
    dispatch(loadProject(id));
}, [dispatch, id]);

  return (
    <div>
      <>
        <h1>Project Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span> {error}
                </p>
              </section>
            </div>
          </div>
        )}

        {project && <ProjectDetail project={project} />}
      </>
    </div>
  );
}

export default ProjectPage;