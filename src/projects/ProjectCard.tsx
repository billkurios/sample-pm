import React from 'react';
import { Link } from 'react-router-dom';

import { Project } from './Project';


const MAX_DESC_LENGTH = 60;

function formatDescription(description: string): string {
    const descriptionLength = description.length;

    return descriptionLength > MAX_DESC_LENGTH ? description.substring(0, MAX_DESC_LENGTH) + '...' : description;
}

export interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
}

function ProjectCard({project, onEdit}: ProjectCardProps) {
    const handleEditClick = (projectBeingEdited: Project) => {
        onEdit(projectBeingEdited);
    };

    return (
        <div className='card'>
            <img src={project.imageUrl} alt={project.name} />
            <section className='section dark'>
                <Link to={'/projects/' + project.id}>
                    <h5 className='strong'>
                        <strong>{project.name}</strong>
                    </h5>
                    <p>{formatDescription(project.description)}</p>
                    <p>Budget : {project.budget.toLocaleString()}</p>
                </Link>
                <button
                    aria-label={`edit ${project.name}`}
                    className='bordered'
                    onClick={() => { handleEditClick(project); }}
                >
                    <span className='icon-edit' />
                    Edit
                </button>
            </section>
        </div>
    );
}

export default ProjectCard;
