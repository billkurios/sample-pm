import React from 'react';

import { Project } from './Project';


const MAX_DESC_LENGTH = 60;

function formatDescription(description: string): string {
    const descriptionLength = description.length;

    return descriptionLength > MAX_DESC_LENGTH ? description.substring(0, MAX_DESC_LENGTH) + '...' : description;
}

export interface ProjectCardProps {
    project: Project;
}

function ProjectCard({project}: ProjectCardProps) {
    return (
        <div className='card'>
            <img src={project.imageUrl} alt={project.name} />
            <section className='section dark'>
                <h5 className='strong'>
                    <strong>{project.name}</strong>
                </h5>
                <p>{formatDescription(project.description)}</p>
                <p>Budget : {project.budget.toLocaleString()}</p>
                <button className='bordered'>
                    <span className='icon-edit' />
                    Edit
                </button>
            </section>
        </div>
    );
}

export default ProjectCard;
