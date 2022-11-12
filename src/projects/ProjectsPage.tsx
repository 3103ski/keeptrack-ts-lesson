import * as React from 'react';
import { projectAPI } from './projectAPI';
import { Project } from './Project';
import ProjectList from './ProjectList';

function ProjectsPage() {
	const [projects, setProjects] = React.useState<Project[]>([]);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [error, setError] = React.useState<string | undefined>(undefined);

	const [loading, setLoading] = React.useState(false);

	const saveProject = (project: Project) => {
		projectAPI
			.put(project)
			.then((updatedProject) => {
				let updatedProjects = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
				setProjects(updatedProjects);
			})
			.catch((e) => {
				if (e instanceof Error) {
					setError(e.message);
				}
			});
	};

	const handleMoreClick = () => {
		setCurrentPage((currentPage) => currentPage + 1);
	};

	React.useEffect(() => {
		async function loadProjects() {
			setLoading(true);
			try {
				const data = await projectAPI.get(currentPage);
				if (currentPage === 1) {
					setProjects(data);
				} else {
					setProjects((projects) => [...projects, ...data]);
				}
				setError('');
			} catch (e) {
				if (e instanceof Error) setError(e.message);
			} finally {
				setLoading(false);
			}
		}
		loadProjects();
	}, [currentPage]);

	return (
		<>
			<h1>Projects</h1>
			<ProjectList onSave={saveProject} projects={projects} />
			{loading && (
				<div className='center-page'>
					<span className='spinner primary'></span>
					<p>Loading...</p>
				</div>
			)}
			{!loading && !error && (
				<div className='row'>
					<div className='col-sm-12'>
						<div className='button-group fluid'>
							<button className='button default' onClick={handleMoreClick}>
								More...
							</button>
						</div>
					</div>
				</div>
			)}
			{error && (
				<div className='row'>
					<div className='card large error'>
						<section>
							<p>
								<span className='icon-alert inverse '></span>
								{error}
							</p>
						</section>
					</div>
				</div>
			)}
		</>
	);
}

export default ProjectsPage;
