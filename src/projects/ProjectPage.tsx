import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { projectAPI } from './projectAPI';
import ProjectDetail from './ProjectDetail';
import { Project } from './Project';
import { AppState } from '../state';
import { ProjectState } from './state/projectTypes';


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
    (appState: AppState) => {
      let filteredProjects = appState.projectState.projects.filter(
        (projectItem) => projectItem.id === id
      );
      return filteredProjects.length ? filteredProjects[0] : null;
    }
  );
  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

//   useEffect(() => {
//     dispatch(loadProjects(1));
// }, [dispatch]);

//   useEffect(() => {
//     setLoading(true);
//     projectAPI
//       .find(id)
//       .then((data) => {
//         setProject(data);
//         setLoading(false);
//       })
//       .catch((e) => {
//         setError(e);
//         setLoading(false);
//       });
//   }, [id]);

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