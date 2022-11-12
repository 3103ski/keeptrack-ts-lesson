import * as React from 'react';

import { Project } from './Project';

interface ProjectFormProps {
	project: Project;
	onSave: (project: Project) => void;
	onCancel: () => void;
}

function ProjectForm({ onCancel, onSave, project: initialProject }: ProjectFormProps) {
	const [project, setProject] = React.useState(initialProject);

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		onSave(project);
	};

	const handleChange = (event: any) => {
		const { name, value, checked, type } = event.target;

		let updatedValue = type === 'checkbox' ? checked : value;

		if (type === 'number') updatedValue = Number(updatedValue);

		const change = {
			[name]: updatedValue,
		};

		let updatedProject: Project;

		setProject((p) => {
			updatedProject = new Project({ ...p, ...change });
			return updatedProject;
		});
	};

	return (
		<form className='input-group vertical'>
			<label htmlFor='name'>Project Name</label>
			<input type='text' name='name' placeholder='enter name' onChange={handleChange} value={project.name} />

			<label htmlFor='description'>Project Description</label>
			<textarea
				name='description'
				placeholder='enter description'
				onChange={handleChange}
				value={project.description}
			/>

			<label htmlFor='budget'>Project Budget</label>
			<input
				type='number'
				name='budget'
				placeholder='enter budget'
				value={project.budget}
				onChange={handleChange}
			/>

			<label htmlFor='isActive'>Active?</label>
			<input type='checkbox' name='isActive' onChange={handleChange} checked={project.isActive} />

			<div className='input-group'>
				<button className='primary bordered medium' onClick={handleSubmit}>
					Save
				</button>
				<span />
				<button type='button' className='bordered medium' onClick={onCancel}>
					cancel
				</button>
			</div>
		</form>
	);
}

export default ProjectForm;
