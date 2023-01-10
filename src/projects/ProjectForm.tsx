import React from 'react';

import { Project } from './Project';


export interface ProjectFormProps {
    project: Project;
}


function ProjectForm(props: ProjectFormProps) {
    return (
        <form className='input-group vertical'>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder='enter name' />
            
            <label htmlFor="description">Project description</label>
            <textarea name="description" placeholder='enter description' />

            <label htmlFor="budget">Project Budget</label>
            <input name="budget" type="number" placeholder='enter budget' />

            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" />

            <div className='input-group'>
                <button className='primary bordered medium'>
                    Save
                </button>
                <span />
                <button className='bordered medium' type="button">
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default ProjectForm;