import React, { SyntheticEvent, BaseSyntheticEvent, useState } from 'react';

import { Project } from './Project';


export interface ProjectFormProps {
    project: Project;
    onCancel: () => void;
    onSave: (project: Project) => void;
}


function ProjectForm({
    project: initialProject,
    onCancel,
    onSave
}: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        onSave(project);
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
    };

    return (
        <form className='input-group vertical' onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input
                type="text"
                name="name"
                placeholder='enter name'
                value={project.name}
                onChange={handleChange}
            />
            
            <label htmlFor="description">Project description</label>
            <textarea
                name="description"
                placeholder='enter description'
                value={project.description}
                onChange={handleChange}
            />

            <label htmlFor="budget">Project Budget</label>
            <input
                name="budget"
                type="number"
                placeholder='enter budget'
                value={project.budget}
                onChange={handleChange}
            />

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