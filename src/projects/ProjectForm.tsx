import * as React from 'react';

import { Project } from './Project';

interface ProjectFormProps {
	project: Project;
	onSave: (project: Project) => void;
	onCancel: () => void;
}

function ProjectForm({ onCancel, onSave, project: initialProject }: ProjectFormProps) {
	const [project, setProject] = React.useState(initialProject);
	const [errors, setErrors] = React.useState({
		name: '',
		description: '',
		budget: '',
	});

	function validate(project: Project) {
		let errors: any = { name: '', description: '', budget: '' };

		if (project.name.length === 0) {
			errors.name = 'Name must be included';
		}

		if (project.name.length > 0 && project.name.length < 3) {
			errors.name = 'Name must be at least 3 characters long';
		}

		if (project.description.length === 0) {
			errors.description = 'Description must be included';
		}

		if (project.budget === 0) {
			errors.budget = 'You must include a budget greater than zero';
		}

		return errors;
	}

	function isValid() {
		return errors.name.length === 0 && errors.description.length === 0 && errors.budget.length === 0;
	}

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (!isValid()) return;
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

		setErrors(() => validate(updatedProject));
	};

	return (
		<form className='input-group vertical'>
			<label htmlFor='name'>Project Name</label>
			<input type='text' name='name' placeholder='enter name' onChange={handleChange} value={project.name} />
			{errors.name.length > 0 && (
				<div className='card error'>
					<p>{errors.name}</p>
				</div>
			)}

			<label htmlFor='description'>Project Description</label>
			<textarea
				name='description'
				placeholder='enter description'
				onChange={handleChange}
				value={project.description}
			/>
			{errors.description.length > 0 && (
				<div className='card error'>
					<p>{errors.description}</p>
				</div>
			)}

			<label htmlFor='budget'>Project Budget</label>
			<input
				type='number'
				name='budget'
				placeholder='enter budget'
				value={project.budget}
				onChange={handleChange}
			/>
			{errors.budget.length > 0 && (
				<div className='card error'>
					<p>{errors.budget}</p>
				</div>
			)}

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
