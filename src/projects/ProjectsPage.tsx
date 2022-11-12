import * as React from 'react';

import { MOCK_PROJECTS } from './MockProjects';
import { Project } from './Project';
import ProjectList from './ProjectList';
function ProjectsPage() {
	const [projects, setProjects] = React.useState<Project[]>(MOCK_PROJECTS);

	const saveProject = (project: Project) => {
		let updatedProjects = projects.map((p) => (p.id === project.id ? project : p));
		setProjects(updatedProjects);
	};

	return (
		<>
			<h1>Projects</h1>
			<ProjectList onSave={saveProject} projects={projects} />
		</>
	);
}

export default ProjectsPage;
