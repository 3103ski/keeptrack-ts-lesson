// React
import * as React from 'react';
import { useParams } from 'react-router-dom';

// Types / Interfaces
import { Project } from './Project';

// Components
import ProjectDetails from './ProjectDetails';

// Server
import { projectAPI } from './projectAPI';

export default function ProjectPage(props: any) {
	// Data
	const [project, setProject] = React.useState<Project | null>(null);
	const params = useParams();
	const id = Number(params.id);

	// API Status
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	// Make API call
	React.useEffect(() => {
		setLoading(true);

		projectAPI
			.find(id)
			.then((data) => {
				setProject(data);
				setLoading(false);
			})
			.catch((e) => {
				setError(e);
				setLoading(false);
			});
	}, [id]);

	return (
		<div>
			<h1>Project Details</h1>

			{loading && (
				<div className='center-page'>
					<span className='spinner primary'></span>
					<p>Loading...</p>
				</div>
			)}

			{error && (
				<div className='row'>
					<div className='card large error'>
						<section>
							<p>
								<span className='icon-alert inverse'></span>
								{error}
							</p>
						</section>
					</div>
				</div>
			)}

			{project && <ProjectDetails project={project} />}
		</div>
	);
}
