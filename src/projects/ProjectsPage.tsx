import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import ProjectList from './ProjectList';
import { useProjects } from './projectHooks';


function ProjectsPage() {
    const {
        data,
        isLoading,
        error,
        isError,
        isFetching,
        page,
        setPage,
        isPreviousData
    } = useProjects();

    // useEffect(() => {
    //     dispatch(loadProjects(1));
    // }, [dispatch]);

    // const handleMoreClick = () => {
    //     dispatch(loadProjects(currentPage + 1));
    // }

    return (
        <>
            <h1>Projects</h1>

            {data ?  (
                <>
                    {isFetching && <span className='toast'>Refreshing ...</span>}
                    <ProjectList projects={data} />
                    <div className='row'>
                        <div className='col-sm-4'>Current page: {page + 1}</div>
                        <div className='col-sm-4'>
                            <div className='button-group right'>
                                <button
                                    className='button'
                                    onClick={() => setPage((oldPage) => oldPage - 1)}
                                    disabled={page === 0}
                                >
                                    Previous
                                </button>
                                <button
                                    className='button'
                                    onClick={() => {
                                        if(!isPreviousData) {
                                            setPage((oldPage) => oldPage + 1);
                                        }
                                    }}
                                    disabled={data.length != 10}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : isLoading ? (
                <div className='center-page'>
                    <span className='spinner primary' />
                    <p>Loading ...</p>
                </div>
            ) : isError && error instanceof Error ? (
                <div className='row'>
                    <div className='card large error'>
                        <section>
                            <p>
                                <span className='icon-alert inverse' />
                                {error.message}
                            </p>
                        </section>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default ProjectsPage;
