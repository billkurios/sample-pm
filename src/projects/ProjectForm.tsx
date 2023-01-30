import React, { SyntheticEvent, BaseSyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// import { saveProject } from './state/projectActions';
import { ProjectState } from './state/projectTypes';
import { Project } from './Project';
import { useSaveProject } from './projectHooks';


export interface ProjectFormProps {
    project: Project;
    onCancel: () => void;
}


function ProjectForm({
    project: initialProject,
    onCancel
}: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: '',
    });

    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();
    const { mutate: saveProject, isLoading } = useSaveProject();

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        // dispatch(saveProject(project));
        saveProject(project);
    };

    const handleChange = (event: BaseSyntheticEvent) => {
        const { type, name, value, checked } = event.target;
        let updatedValue = type === "checkbox" ? checked : value;
        if( type === "number") {
            updatedValue = Number(updatedValue);
        }
        let updatedProject: Project;
        setProject((p) => {
            updatedProject = new Project({ ...p, [name]: updatedValue});
            return updatedProject;
        });
        setErrors(() => validate(updatedProject));
    };

    const validate = (project: Project) => {
        let errors: any = {
            name: '',
            description: '',
            budget: ''
        };
        if(project.name.length === 0) {
            errors.name = 'Name is required';
        }
        if(project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters.';
        }
        if (project.description.length === 0) {
            errors.description = 'Description is required.'
        }
        if (project.budget === 0) {
            errors.budget = 'Budget must be more than $0.';
        }
        return errors;
    };

    const isValid = () => {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    };
 
    return (
        <form className='input-group vertical' onSubmit={handleSubmit}>
            {isLoading && <span className="toast">Saving...</span>}
            <label htmlFor="name">Project Name</label>
            <input
                type="text"
                name="name"
                placeholder='enter name'
                value={project.name}
                onChange={handleChange}
            />
            { (errors.name.length > 0) && (
                <div className='card error'>
                    <p>{errors.name}</p>
                </div>
            )}
            
            <label htmlFor="description">Project description</label>
            <textarea
                name="description"
                placeholder='enter description'
                value={project.description}
                onChange={handleChange}
            />
            { (errors.description.length > 0) && (
                <div className='card error'>
                    <p>{errors.description}</p>
                </div>
            )}

            <label htmlFor="budget">Project Budget</label>
            <input
                name="budget"
                type="number"
                placeholder='enter budget'
                value={project.budget}
                onChange={handleChange}
            />
            { (errors.budget.length > 0) && (
                <div className='card error'>
                    <p>{errors.budget}</p>
                </div>
            )}

            <label htmlFor="isActive">Active?</label>
            <input
                type="checkbox"
                name="isActive"
                checked={project.isActive}
                onChange={handleChange}
            />

            <div className='input-group'>
                <button className='primary bordered medium'>
                    Save
                </button>
                <span />
                <button
                    className='bordered medium'
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default ProjectForm;