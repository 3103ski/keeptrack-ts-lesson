import * as React from 'react';

import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
	onSave: (project: Project) => void;
	projects: Project[];
}

function ProjectList({ projects, onSave }: ProjectListProps) {
	const [projectBeingEdited, setProjectBeingEdited] = React.useState({});

	function handleEdit(project: Project) {
		setProjectBeingEdited(project);
	}

	function handleSave(project: Project) {
		onSave(project);
	}

	function handleCancel() {
		setProjectBeingEdited({});
	}

	return (
		<div className='row'>
			{projects.map((project) => (
				<div key={project.id} className='cols-sm'>
					{projectBeingEdited === project ? (
						<ProjectForm onCancel={handleCancel} onSave={handleSave} project={project} />
					) : (
						<ProjectCard project={project} onEdit={handleEdit} />
					)}
				</div>
			))}
		</div>
	);
}

export default ProjectList;
